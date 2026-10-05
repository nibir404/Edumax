import crypto from 'crypto';
import { db } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'edumax_saas_production_secret_key_2026';

// High-speed HMAC token signer
export function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
  })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
    
  return `${header}.${body}.${signature}`;
}

// Token verifier
export function verifyToken(token) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, body, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
      
    if (signature !== expectedSig) return null;
    
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

// Authentication Middleware
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      error: 'Authentication credentials required. Please provide a valid Bearer token.'
    });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      code: 'INVALID_TOKEN',
      error: 'Session token has expired or is invalid. Please log in again.'
    });
  }

  req.user = payload;
  next();
}

// Strict Role-Based Access Control (RBAC) Guard
export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthenticated session.' });
    }

    const userRole = (req.user.role || '').toLowerCase();
    const isAllowed = allowedRoles.some(r => r.toLowerCase() === userRole);

    if (!isAllowed) {
      // Security audit log
      console.warn(`[SECURITY AUDIT] Unauthorized access attempt by ${req.user.email} (Role: ${req.user.role}) on endpoint: ${req.method} ${req.originalUrl}`);
      return res.status(403).json({
        success: false,
        code: 'FORBIDDEN',
        error: `Access Denied: Your account role (${req.user.role}) lacks sufficient clearance to access this resource. Requires one of: [${allowedRoles.join(', ')}].`
      });
    }

    next();
  };
}
