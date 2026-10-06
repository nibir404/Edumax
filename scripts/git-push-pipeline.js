#!/usr/bin/env node

/**
 * Edumax Automated CI/CD Push Pipeline
 * 
 * Verifies code quality, security perimeters, concurrency locks, 1M scale metrics,
 * production bundles, and pushes cleanly to GitHub with atomic status verification.
 * 
 * Usage:
 *   npm run ship
 *   npm run ship -- "feat: custom commit message"
 */

import { execSync } from 'node:child_process';
import process from 'node:process';

function runStep(label, command, options = {}) {
  const hrStart = process.hrtime();
  process.stdout.write(`\n⏳ [Step] ${label}...\n`);
  try {
    const output = execSync(command, {
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf-8',
      env: { ...process.env, CI: 'true' }
    });
    const [seconds, nanoseconds] = process.hrtime(hrStart);
    const durationMs = ((seconds * 1000) + (nanoseconds / 1e6)).toFixed(1);
    console.log(`✅ [PASS] ${label} (${durationMs}ms)`);
    return output;
  } catch (error) {
    console.error(`\n❌ [FAILED] ${label} failed! Aborting push pipeline.`);
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    process.exit(1);
  }
}

async function main() {
  console.log('===============================================================');
  console.log('🚀 EDUMAX SAAS AUTOMATED CI/CD GIT PUSH PIPELINE');
  console.log('===============================================================');

  // Parse custom commit message if passed as argument
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const customMessage = args.join(' ').trim();

  // 1. Check Git Status
  const statusRaw = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();

  console.log(`📌 Target Branch: ${branch}`);
  console.log(`📂 Uncommitted Changes Detected: ${statusRaw ? statusRaw.split('\n').length : 0} files`);

  // 2. Static Analysis & Linting Gate
  runStep('Code Quality & Oxlint Static Analysis', 'npm run lint');

  // 3. Security Perimeter Verification
  runStep('RBAC Multi-Tenant Authorization Perimeter', 'npm run test:rbac');

  // 4. Concurrency Mutex & Race Condition Prevention
  runStep('Concurrency Mutex & Distributed Lock Benchmark', 'npm run test:concurrency');

  // 5. 1M Scale Engine & Latency Distribution
  runStep('1,000,000 Scale Engine & HTTP Throughput Verification', 'npm run test:scale');

  // 6. Production Frontend Compilation
  runStep('Vite Production Asset Compilation & Chunk Validation', 'npm run build');

  // 7. End-to-End Persona Verification (Playwright)
  runStep('Playwright 12-Journey End-to-End Verification Suite', 'npm run test:e2e');

  // 8. Stage & Commit
  if (statusRaw.length > 0) {
    runStep('Staging Modified & Untracked Files', 'git add -A');

    const defaultMsg = `feat(scale): 1M scale engine, zero-warning lints, and CI/CD GitHub automation`;
    const commitMsg = customMessage || defaultMsg;

    runStep(`Creating Atomic Commit: "${commitMsg}"`, `git commit -m "${commitMsg}"`);
  } else {
    console.log('\nℹ️ Working directory already clean. Checking if local branch is ahead of remote...');
  }

  // 9. Push to GitHub
  runStep(`Pushing Verified Codebase to GitHub (origin ${branch})`, `git push origin ${branch}`);

  // 10. Summary & Output
  const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  console.log('\n===============================================================');
  console.log('🎉 PIPELINE COMPLETE: CODE VERIFIED & PUSHED TO GITHUB');
  console.log(`🔗 Commit: ${commitHash} on ${branch}`);
  console.log(`🌐 Repository: https://github.com/nibir404/Edumax`);
  console.log(`⚙️ GitHub Actions Workflow: https://github.com/nibir404/Edumax/actions`);
  console.log('===============================================================\n');
}

main().catch(err => {
  console.error('Pipeline crashed:', err);
  process.exit(1);
});
