# Edumax SaaS: Principal Architect Polyglot Evaluation & Migration Plan

> **Author**: Principal Software Architect & Systems Lead  
> **Status**: Approved & Phased Architectural Roadmap  
> **Target Scale**: 1,000,000+ Concurrent Students & Candidates  

---

## 1. Executive Summary: The Architect's Verdict

> **Question**: *"Do we need to rewrite some services using other languages?"*  
> **Architect's Verdict**: **Selective Polyglot Extraction for CPU-bound Kernels; DO NOT rewrite the I/O-bound Core.**

### The Core Architectural Principle
A wholesale rewrite of the entire application into Go, Rust, or C++ is an anti-pattern (**Second System Syndrome**). Modern Node.js 20+ with multi-process clustering (`node:cluster`), async write-behind WAL (`server/data/dbEngine.js`), and LRU micro-caching (`server/middleware/cache.js`) already benchmarks at **4,124+ RPS per worker** with **P50 = 7ms** and **P99 = 22ms** on standard hardware.

Standard Web REST APIs, JWT authentication, RBAC authorization, and database CRUD are **I/O-bound**. They spend 95% of their wall-clock time waiting on network sockets or disk. Rewriting them in Go/Rust would introduce immense cognitive overhead and slow product iteration without providing noticeable real-world latency reductions.

However, **CPU-bound algorithmic workloads** that run in the same process as the Node.js event loop are hazardous: when multiple students trigger heavy computations simultaneously, they block the event loop for all concurrent connections. **These specific workloads must be extracted into compiled systems languages.**

---

## 2. Workload Classification Matrix

| Subsystem / Service | Workload Type | Current Implementation | Optimal Language | Recommended Architecture | Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **API Gateway & Routing** | I/O-bound | Node.js Express (Clustered) | **Keep Node.js** | Multi-process cluster behind NGINX | **Retain & Scale** |
| **Auth & Multi-Tenant RBAC** | I/O-bound + Crypto | Node.js HMAC / SHA-256 | **Keep Node.js** | Native OpenSSL bindings in Node.js | **Retain** |
| **CRUD (Batches, Users, Tests)** | I/O-bound | In-Memory Hash Maps + WAL | **Keep Node.js** | PostgreSQL + PgBouncer Pooler | **Retain** |
| **IELTS Writing AI Evaluator** | **CPU-bound (NLP)** | `NLPRubricKernel.js` | **Rust / WebAssembly** | Isomorphic WASM module (Server + Client) | **Phase 1 Rewrite** |
| **Speaking Audio DSP & Fluency** | **CPU-bound (DSP/VAD)** | Node.js Buffer loops | **Go / Rust** | UDS / gRPC Microservice Sidecar | **Phase 2 Rewrite** |
| **Live Speaking WebRTC Mesh** | **Network State Mesh** | HTTP Polling / Socket | **Go (Golang)** | Stateful Goroutine Connection Server | **Phase 3 Rewrite** |

---

## 3. High-Priority Candidate 1: IELTS Writing AI Evaluator (Rust + WASM)

### The Bottleneck
The IELTS Writing evaluation engine (`server/kernels/nlpRubricKernel.js`) performs:
1. Regex-based lexical tokenization across 250-400 words.
2. Academic vocabulary set membership lookups.
3. Discourse marker multi-token phrase scanning.
4. Syntactic clause detection (semicolons, conditional forms, subjunctive clauses).
5. Type-Token Ratio (TTR) calculations.

While taking ~1ms for a single essay, during peak mock exam sessions where **5,000 students submit essays simultaneously**, this accumulates to 5 seconds of cumulative event loop blockages.

### The Rust / WebAssembly Solution
```
┌────────────────────────────────────────────────────────┐
│                    Browser Client                      │
│   (Runs Rust/WASM offline in WebWorker for instant     │
│    real-time rubric feedback with ZERO server cost)    │
└────────────────────────────────────────────────────────┘
                           │
                           │ Network Fallback / Final Evaluation
                           ▼
┌────────────────────────────────────────────────────────┐
│                  Node.js API Gateway                   │
│   ┌────────────────────────────────────────────────┐   │
│   │ Hybrid Loader (WASM with Transparent JS Fallback)│   │
│   │                                                │   │
│   │  try: WebAssembly.instantiate(edumax_nlp.wasm) │   │
│   │  catch: fallback to NLPRubricKernel.js         │   │
│   └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

#### Why Rust + WebAssembly:
1. **5x–10x Faster Execution**: Compiled SIMD-optimized binary execution with zero V8 JIT warm-up time.
2. **Zero Garbage Collection Stalls**: Rust has zero runtime GC; memory allocations are deterministically freed.
3. **Isomorphic Distribution**: The exact same `.wasm` module compiles once and runs:
   - On the **server** inside Node.js.
   - On the **client** inside the candidate's browser (React app), providing typing feedback without consuming any server CPU.
4. **Resilience Invariant**: If WASM fails in any edge runtime, our pure-JS `NLPRubricKernel.js` acts as an automatic fallback.

---

## 4. High-Priority Candidate 2: Speaking Audio DSP & Fluency Scoring (Go / Rust)

### The Bottleneck
Evaluating spoken IELTS interviews requires:
- Voice Activity Detection (VAD) to compute speech-to-pause ratios.
- Pitch & Formant tracking to grade intonation and pronunciation rhythm.
- Audio normalization and chunking for Whisper transcription.

V8 buffers in Node.js are not optimized for heavy DSP (Digital Signal Processing) array arithmetic. Processing 10,000 concurrent 2-minute PCM audio streams would exhaust Node.js heap limits and trigger fatal out-of-memory crashes.

### The Go Microservice Solution (`edumax-voice-core`)
A standalone Go binary that exposes a high-speed Unix Domain Socket (UDS) or internal gRPC endpoint:
```
Node.js API Gateway ── Unix Domain Socket (/tmp/edumax-dsp.sock) ──▶ Go DSP Daemon
                                                                      ├── Goroutine VAD Analyzer
                                                                      ├── Phoneme Alignment Engine
                                                                      └── Fluency Matrix Grader
```

#### Why Go:
- **Goroutine Efficiency**: Handles 50,000 concurrent streams at ~2KB memory per goroutine (vs ~30KB per Node.js socket).
- **Single Static Binary**: Deploys as a lightweight 15MB binary with zero external dependencies.
- **Microsecond IPC**: Communication over Unix Domain Sockets eliminates TCP/IP network protocol overhead.

---

## 5. Phased Implementation Roadmap

```
PHASE 1 (Immediate)           PHASE 2 (Intermediate)          PHASE 3 (Scale Out)
Rust/WASM NLP Kernel          Go Audio DSP Microservice       Go WebRTC Signaling Mesh
────────────────────          ─────────────────────────       ─────────────────────────
• Compile rubric scoring      • Extract audio processing      • Extract live examiner
  to edumax-nlp.wasm            into edumax-voice-core          video/audio rooms
• Wire hybrid loader with     • Connect via Unix Domain       • Distributed Redis cluster
  zero-downtime JS fallback     Sockets (UDS) / gRPC            for state sync
• Green verification suite    • Zero-downtime failover        • OpenTelemetry tracing
```

### Safety & Compatibility Rules
1. **Never break existing contracts**: All API request/response JSON schemas must remain 100% identical.
2. **Maintain dual-mode fallback**: Compiled binaries must always have pure-JS fallback implementations in the repository so tests and lightweight environments run without requiring native compiler toolchains.
3. **Automate CI validation**: All compiled modules must be verified in the automated CI/CD pipeline before merging to `main`.
