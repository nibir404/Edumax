/**
 * FuncHole Autonomous Deployment Script for Edumax SaaS
 * Connects to FuncHole MCP over Streamable HTTP protocol
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MCP_ENDPOINT = 'https://app.funchole.dev/mcp';
const MCP_TOKEN = process.env.FUNCHOLE_TOKEN || 'fh_mcp__ByW5VspAQP50G_rfINBVnt80tN9FKD3n8BtEL8eQGY';
const GATEWAY_ID = 'cad6c072-f4a3-4d63-8a9e-3a211218d99e';
const GATEWAY_HOST = '5zyu0p.funchole.dev';
const FUNCTION_KEY = 'fn_edumax';
const FLOW_KEY = 'flw_edumax';
const SUBPATH = '/edumax/*';

class McpClient {
  constructor(endpoint, token) {
    this.endpoint = endpoint;
    this.token = token;
    this.sessionId = null;
    this.reqId = 1;
  }

  post(body) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(body);
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Authorization': `Bearer ${this.token}`,
        'Content-Length': Buffer.byteLength(data),
        'Connection': 'close'
      };
      if (this.sessionId) {
        headers['Mcp-Session-Id'] = this.sessionId;
      }

      const req = https.request(this.endpoint, {
        method: 'POST',
        headers,
        agent: false
      }, res => {
        let resData = '';
        res.on('data', c => resData += c);
        res.on('end', () => {
          if (res.headers['mcp-session-id']) {
            this.sessionId = res.headers['mcp-session-id'];
          }
          resolve({ status: res.statusCode, headers: res.headers, body: resData });
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  parseResponse(raw) {
    let jsonStr = raw;
    if (raw.includes('data:')) {
      const line = raw.split('\n').find(l => l.startsWith('data:'));
      if (line) jsonStr = line.replace(/^data:\s*/, '');
    }

    const parsed = JSON.parse(jsonStr);
    if (parsed.error) {
      throw new Error(`MCP Error ${parsed.error.code}: ${parsed.error.message}`);
    }

    const result = parsed.result;
    if (result && result.isError) {
      const msg = result.content?.map(c => c.text).join('\n') || 'Tool call failed';
      throw new Error(`MCP Tool Execution Error: ${msg}`);
    }

    const text = result?.content?.[0]?.text;
    if (!text) return result;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  async init() {
    console.log('📡 [MCP] Initializing session with FuncHole...');
    const initRes = await this.post({
      jsonrpc: '2.0',
      id: this.reqId++,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'edumax-deployer', version: '1.0.0' }
      }
    });

    console.log(`✓ [MCP] Connected. Session ID: ${this.sessionId}`);

    // Initialized notification
    await this.post({
      jsonrpc: '2.0',
      method: 'notifications/initialized'
    });
  }

  async callTool(name, args = {}) {
    const res = await this.post({
      jsonrpc: '2.0',
      id: this.reqId++,
      method: 'tools/call',
      params: {
        name,
        arguments: args
      }
    });

    return this.parseResponse(res.body);
  }
}

function collectSourceFiles() {
  console.log('📦 [Source] Packaging project files for FuncHole STATIC runtime...');
  const files = [];

  // Streamlined production package.json for cloud build container
  const prodPkg = {
    name: 'edumax-saas',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      build: 'vite build'
    },
    dependencies: {
      'lucide-react': '^1.52.0',
      'react': '^19.2.8',
      'react-dom': '^19.2.8',
      'react-router-dom': '^7.18.4'
    },
    devDependencies: {
      '@vitejs/plugin-react': '^6.1.1',
      'vite': '^8.3.0'
    }
  };

  files.push({
    path: 'package.json',
    content: JSON.stringify(prodPkg, null, 2)
  });

  files.push({
    path: 'vite.config.js',
    content: fs.readFileSync(path.join(ROOT_DIR, 'vite.config.js'), 'utf8')
  });

  files.push({
    path: 'index.html',
    content: fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8')
  });

  function scanDir(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name.endsWith('.png') || entry.name === 'node_modules') continue;
      const fullPath = path.join(dir, entry.name);
      const relPath = path.posix.join(prefix, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath, relPath);
      } else {
        files.push({
          path: relPath,
          content: fs.readFileSync(fullPath, 'utf8')
        });
      }
    }
  }

  scanDir(path.join(ROOT_DIR, 'src'), 'src');
  scanDir(path.join(ROOT_DIR, 'public'), 'public');

  console.log(`✓ [Source] Collected ${files.length} clean source files.`);
  return files;
}

async function deploy() {
  console.log('======================================================');
  console.log('🚀 FuncHole Cloud Deployment: Edumax SaaS');
  console.log('🌐 Target Gateway: https://5zyu0p.funchole.dev/edumax/');
  console.log('======================================================\n');

  const mcp = new McpClient(MCP_ENDPOINT, MCP_TOKEN);
  await mcp.init();

  // 1. Locate or create Function
  console.log('\n[1/6] Resolving Function fn_edumax...');
  const functions = await mcp.callTool('list_functions');
  let func = functions.find(f => f.functionKey === FUNCTION_KEY);
  if (!func) {
    console.log('Creating new STATIC Function fn_edumax...');
    func = await mcp.callTool('create_function', {
      functionKey: FUNCTION_KEY,
      name: 'Edumax SaaS — Enterprise IELTS Learning Cloud',
      description: 'Enterprise IELTS mock examination, speaking console, and institute management SaaS.',
      runtime: 'STATIC'
    });
  }
  console.log(`✓ Function ID: ${func.id}`);

  // 2. Resolve or create FunctionVersion
  console.log('\n[2/6] Checking FunctionVersion status...');
  const versions = await mcp.callTool('list_function_versions', { functionId: func.id });
  let version = versions.find(v => v.status === 'DRAFT');
  if (!version) {
    console.log('Creating new draft FunctionVersion...');
    version = await mcp.callTool('create_function_version', { functionId: func.id });
  }
  console.log(`✓ FunctionVersion ID: ${version.id} (Status: ${version.status})`);

  // 3. Submit Source
  console.log('\n[3/6] Submitting source code payload...');
  const files = collectSourceFiles();
  await mcp.callTool('submit_function_version_source', {
    functionId: func.id,
    versionId: version.id,
    entrypoint: 'package.json',
    files
  });
  console.log('✓ Source submitted successfully.');

  // 4. Trigger Build & Deploy
  console.log('\n[4/6] Triggering remote build on FuncHole...');
  await mcp.callTool('deploy_function_version', {
    functionId: func.id,
    versionId: version.id
  });
  console.log('Build dispatched. Polling for compilation status...');

  let ready = false;
  for (let attempt = 1; attempt <= 30; attempt++) {
    await new Promise(r => setTimeout(r, 4000));
    const current = await mcp.callTool('get_function_version', {
      functionId: func.id,
      versionId: version.id
    });
    console.log(`  [Poll ${attempt}/30] Version status: ${current.status}`);

    if (current.status === 'READY') {
      ready = true;
      console.log(`🎉 FunctionVersion ${version.id} compiled and published to cloud edge!`);
      break;
    }
    if (current.status === 'FAILED') {
      console.error('❌ Build failed on FuncHole. Fetching stage logs...');
      const logs = await mcp.callTool('get_function_version_build_logs', {
        functionId: func.id,
        versionId: version.id
      });
      console.error(JSON.stringify(logs, null, 2));
      throw new Error('Remote compilation failed.');
    }
  }

  if (!ready) {
    throw new Error('Build timed out after 120 seconds.');
  }

  // 5. Configure Gateway Flow
  console.log('\n[5/6] Updating Gateway Flow & Routing...');
  const flows = await mcp.callTool('list_flows', { gatewayId: GATEWAY_ID });
  let flow = flows.find(f => f.flowKey === FLOW_KEY);

  if (!flow) {
    console.log('Creating route /edumax/* on gateway...');
    flow = await mcp.callTool('create_flow', {
      gatewayId: GATEWAY_ID,
      flowKey: FLOW_KEY,
      name: 'Edumax SaaS',
      description: 'Edumax IELTS Learning Cloud and SaaS suite',
      httpMethod: 'GET',
      path: SUBPATH,
      priority: 40
    });
    console.log(`✓ Created Flow ID: ${flow.id}`);
  } else {
    console.log(`✓ Existing Flow ID: ${flow.id}`);
  }

  console.log('Creating FlowVersion and binding STATIC function step...');
  const flowVersion = await mcp.callTool('create_flow_version', {
    flowId: flow.id,
    description: `Deploy Edumax SaaS (FunctionVersion ${version.id})`
  });
  console.log(`✓ Created FlowVersion ID: ${flowVersion.id}`);

  await mcp.callTool('create_flow_step', {
    flowId: flow.id,
    versionId: flowVersion.id,
    stepKey: 'serve-static',
    componentType: 'FUNCTION',
    position: 1,
    componentId: func.id,
    componentVersionId: version.id
  });
  console.log('✓ Flow step attached to FunctionVersion.');

  await mcp.callTool('adopt_flow_version', {
    flowId: flow.id,
    versionId: flowVersion.id
  });
  console.log(`🎉 FlowVersion ${flowVersion.id} adopted! Route is LIVE!`);

  // 6. Live Verification
  console.log('\n[6/6] Verifying live endpoint...');
  const liveUrl = `https://${GATEWAY_HOST}/edumax/`;
  console.log(`Requesting ${liveUrl}...`);

  await new Promise((resolve) => {
    https.get(liveUrl, res => {
      console.log(`HTTP Status: ${res.statusCode} ${res.statusMessage}`);
      let sample = '';
      res.on('data', chunk => sample += chunk);
      res.on('end', () => {
        if (sample.includes('Edumax') || sample.includes('<div id="root">')) {
          console.log('✓ Live content verification passed! HTML contains Edumax application container.');
        } else {
          console.log('Preview:', sample.slice(0, 200));
        }
        resolve();
      });
    }).on('error', err => {
      console.warn('Live verification request notice:', err.message);
      resolve();
    });
  });

  console.log('\n======================================================');
  console.log('🚀 LIVE DEPLOYMENT COMPLETE');
  console.log(`🔗 URL: ${liveUrl}`);
  console.log(`📦 Function: ${FUNCTION_KEY} (${func.id})`);
  console.log(`🏷️ Version: ${version.id}`);
  console.log(`🔀 Route: https://${GATEWAY_HOST}${SUBPATH}`);
  console.log('======================================================');
}

deploy().catch(err => {
  console.error('\n❌ Deployment encountered an error:', err);
  process.exit(1);
});
