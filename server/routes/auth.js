import { Router } from 'express';
import { db } from '../data/store.js';
import { signToken, verifyToken, authenticate } from '../middleware/auth.js';

const router = Router();

// Demo credentials catalog
const USERS_CATALOG = {
  'nafis.ahmed@edumax.io': {
    id: 'std_01',
    name: 'Nafis Ahmed',
    email: 'nafis.ahmed@edumax.io',
    role: 'student',
    targetBand: 8.0,
    currentBand: 7.5,
    branch: 'Gulshan Branch',
    batch: 'IELTS Masterclass B-12'
  },
  's.jenkins@edumax.io': {
    id: 'tch_01',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@edumax.io',
    role: 'teacher',
    branch: 'Gulshan HQ',
    assignedBatches: 4,
    pendingEvaluations: 8
  },
  'kazi.farhan@edumax.io': {
    id: 'mng_01',
    name: 'Kazi Farhan',
    email: 'kazi.farhan@edumax.io',
    role: 'manager',
    branch: 'All Branches (5)',
    totalStudents: 1420
  },
  'alex.rivera@platform.edumax.io': {
    id: 'adm_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@platform.edumax.io',
    role: 'admin',
    tenantsCount: 34
  }
};

// Login Route (Email & Password / Role Lookup)
router.post('/login', (req, res) => {
  const { email, role } = req.body;

  let user = null;
  if (email && USERS_CATALOG[email.toLowerCase()]) {
    user = USERS_CATALOG[email.toLowerCase()];
  } else if (role) {
    const found = Object.values(USERS_CATALOG).find(u => u.role.toLowerCase() === role.toLowerCase());
    if (found) user = found;
  }

  if (!user) {
    user = USERS_CATALOG['nafis.ahmed@edumax.io']; // Default fallback to student
  }

  const token = signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  res.json({
    success: true,
    data: {
      token,
      user
    }
  });
});

// Social Login Route (Google & LinkedIn)
router.post('/social-login', (req, res) => {
  const { provider, role = 'student', profile = {} } = req.body;

  if (!provider || !['google', 'linkedin'].includes(provider.toLowerCase())) {
    return res.status(400).json({ success: false, error: 'Valid social provider required (google or linkedin).' });
  }

  // Relevant users for social sign-in:
  // - Google: Candidates & Students (Nafis Ahmed) or Teachers
  // - LinkedIn: Verified Educators, IELTS Examiners & Professional Staff (Dr. Sarah Jenkins)
  let email = profile.email;
  if (!email) {
    if (provider.toLowerCase() === 'linkedin') {
      email = 's.jenkins@edumax.io';
    } else {
      email = role === 'teacher' ? 's.jenkins@edumax.io' : 'nafis.ahmed@edumax.io';
    }
  }

  let user = USERS_CATALOG[email.toLowerCase()];

  if (!user) {
    user = {
      id: `usr_${Date.now()}`,
      name: profile.name || (provider.toLowerCase() === 'linkedin' ? 'Dr. Sarah Jenkins' : 'Nafis Ahmed'),
      email: email,
      role: role.toLowerCase(),
      authProvider: provider.toLowerCase(),
      branch: 'Gulshan HQ',
      targetBand: role === 'student' ? 8.0 : undefined,
      currentBand: role === 'student' ? 7.5 : undefined
    };
  } else {
    user = { ...user, authProvider: provider.toLowerCase() };
  }

  const token = signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  res.json({
    success: true,
    data: {
      token,
      user,
      provider: provider.toLowerCase()
    }
  });
});

// Current User Profile Verification
router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
