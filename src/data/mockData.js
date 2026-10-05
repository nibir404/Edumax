// Edumax Comprehensive Central Mock Database

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  MANAGER: 'manager',
  PLATFORM_ADMIN: 'admin'
};

export const CURRENT_USERS = {
  student: {
    id: 'std_01',
    name: 'Nafis Ahmed',
    email: 'nafis.ahmed@edumax.io',
    avatar: 'NA',
    role: 'student',
    roleTitle: 'Student',
    targetBand: 8.0,
    currentBand: 7.5,
    batch: 'IELTS Masterclass B-12',
    branch: 'Gulshan Branch',
    examDate: '2026-11-20',
    daysLeft: 46
  },
  teacher: {
    id: 'tch_01',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@edumax.io',
    avatar: 'SJ',
    role: 'teacher',
    roleTitle: 'Senior IELTS Examiner',
    branch: 'Gulshan HQ',
    assignedBatches: 4,
    pendingEvaluations: 8,
    todayInterviews: 5
  },
  manager: {
    id: 'mng_01',
    name: 'Kazi Farhan',
    email: 'kazi.farhan@edumax.io',
    avatar: 'KF',
    role: 'manager',
    roleTitle: 'Institute Director / Owner',
    branch: 'All Branches (5)',
    totalStudents: 1420,
    monthlyRevenue: '$64,500'
  },
  admin: {
    id: 'adm_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@platform.edumax.io',
    avatar: 'AR',
    role: 'admin',
    roleTitle: 'Platform Super Admin',
    tenantsCount: 34,
    globalUsers: '48,200',
    systemStatus: 'Optimal (99.98%)'
  }
};

// Student Results & Mocks
export const STUDENT_RESULTS = [
  {
    id: 'MOCK-109',
    title: 'Edumax Official Mock Exam #09',
    type: 'Academic',
    date: '2026-09-28',
    status: 'Evaluated',
    overallBand: 7.5,
    listening: 8.5,
    reading: 8.0,
    writing: 6.5,
    speaking: 7.5,
    examiner: 'Dr. Sarah Jenkins',
    percentile: '92nd Percentile'
  },
  {
    id: 'MOCK-108',
    title: 'Edumax Cambridge Simulation #08',
    type: 'Academic',
    date: '2026-09-14',
    status: 'Evaluated',
    overallBand: 7.0,
    listening: 7.5,
    reading: 7.5,
    writing: 6.5,
    speaking: 7.0,
    examiner: 'Michael Chang',
    percentile: '84th Percentile'
  },
  {
    id: 'MOCK-107',
    title: 'Edumax Full Diagnostic Mock #07',
    type: 'Academic',
    date: '2026-08-30',
    status: 'Evaluated',
    overallBand: 7.0,
    listening: 8.0,
    reading: 7.0,
    writing: 6.0,
    speaking: 7.0,
    examiner: 'Dr. Sarah Jenkins',
    percentile: '81st Percentile'
  },
  {
    id: 'MOCK-110',
    title: 'Edumax British Council Replica #10',
    type: 'Academic',
    date: '2026-10-04',
    status: 'Pending Evaluation',
    overallBand: null,
    listening: 8.5,
    reading: 8.0,
    writing: 'Grading...',
    speaking: 'Slot: Tomorrow 2:30 PM',
    examiner: 'Scheduled',
    percentile: 'Calculating'
  }
];

// Test Library
export const TEST_LIBRARY = [
  {
    id: 'TEST-AC-01',
    title: 'Cambridge IELTS 19 - Full Mock 1',
    type: 'Academic',
    category: 'Full Mock',
    duration: '2h 45m',
    questions: 40,
    difficulty: 'Hard',
    attempts: 420,
    tags: ['Official Format', 'Audio Included', 'AI Writing Evaluation']
  },
  {
    id: 'TEST-AC-02',
    title: 'Edumax High-Band Booster - Academic Reading',
    type: 'Academic',
    category: 'Reading',
    duration: '60 mins',
    questions: 40,
    difficulty: 'Advanced',
    attempts: 890,
    tags: ['Passage 3 Heavy', 'True/False/Not Given Focus']
  },
  {
    id: 'TEST-AC-03',
    title: 'British Standard Listening Accelerator',
    type: 'Academic / General',
    category: 'Listening',
    duration: '40 mins',
    questions: 40,
    difficulty: 'Medium',
    attempts: 1250,
    tags: ['Native Accents', 'Map Labelling']
  },
  {
    id: 'TEST-AC-04',
    title: 'IELTS Task 2 Essay Masterclass Test',
    type: 'Academic',
    category: 'Writing',
    duration: '60 mins',
    questions: 2,
    difficulty: 'Hard',
    attempts: 640,
    tags: ['Instant AI Feedback', 'Model Band 9 Answers']
  },
  {
    id: 'TEST-AC-05',
    title: '1-on-1 Live Speaking Mock Session',
    type: 'Academic / General',
    category: 'Speaking',
    duration: '15 mins',
    questions: 3,
    difficulty: 'Medium',
    attempts: 310,
    tags: ['Live Examiner', 'Video/Audio Recording', 'Pronunciation Analysis']
  }
];

// Detailed Result Data (Mock #109)
export const DETAILED_RESULT = {
  id: 'MOCK-109',
  overallBand: 7.5,
  date: 'Sep 28, 2026',
  candidate: 'Nafis Ahmed',
  targetBand: 8.0,
  listening: {
    band: 8.5,
    score: '37 / 40',
    accuracy: '92.5%',
    sections: [
      { name: 'Section 1: Rental Application', score: '10/10', accuracy: '100%', type: 'Form Completion' },
      { name: 'Section 2: Park Guide & Map', score: '9/10', accuracy: '90%', type: 'Map Labelling' },
      { name: 'Section 3: University Tutor Discussion', score: '9/10', accuracy: '90%', type: 'Multiple Choice' },
      { name: 'Section 4: Marine Biology Lecture', score: '9/10', accuracy: '90%', type: 'Note Completion' }
    ]
  },
  reading: {
    band: 8.0,
    score: '35 / 40',
    accuracy: '87.5%',
    passages: [
      { title: 'Passage 1: History of Tea Trade', score: '13/13', type: 'True/False/Not Given' },
      { title: 'Passage 2: The Neuroscience of Memory', score: '11/13', type: 'Headings Matching' },
      { title: 'Passage 3: Renewable Deep-Sea Geothermal Energy', score: '11/14', type: 'Summary & MCQ' }
    ]
  },
  writing: {
    band: 6.5,
    task1Band: 7.0,
    task2Band: 6.5,
    criteria: [
      { name: 'Task Response / Achievement', score: 7.0, feedback: 'Strong thesis and overview. All parts of the prompt addressed with concrete examples.' },
      { name: 'Coherence & Cohesion', score: 6.5, feedback: 'Good paragraphing; however, over-reliance on standard linkers (e.g., Furthermore, Moreover).' },
      { name: 'Lexical Resource', score: 6.5, feedback: 'Appropriate academic terminology, but minor collocations like "make an impact to" instead of "on".' },
      { name: 'Grammatical Range & Accuracy', score: 6.0, feedback: 'A few punctuation slips and subject-verb disagreements in complex conditional structures.' }
    ],
    studentEssay: `In contemporary society, an increasing number of individuals argue that technological advancements in artificial intelligence will lead to substantial job displacement. While this view has validity, I believe that AI will ultimately create new economic opportunities that surpass those destroyed.\n\nTo begin with, automation has historically transformed the employment landscape rather than terminating it completely. When industrial machinery was introduced in the 19th century, numerous manual tasks were eliminated; nonetheless, entirely new sectors including mechanical engineering and industrial logistics emerged. Similarly, the proliferation of AI algorithms requires skilled oversight, data curation, and ethical supervision.\n\nOn the other hand, it is undeniable that certain routine positions will be severely affected. Roles such as basic data entry, telemarketing, and rudimentary coding can now be executed by neural networks with greater efficiency. Consequently, governments must proactively establish retraining programs to equip displaced workers with high-order analytical and creative competencies.\n\nIn conclusion, although the transition period will bring friction to the labor market, the net result will foster innovation and higher-value career trajectories.`,
    aiImprovedEssay: `In contemporary society, an escalating consensus contends that artificial intelligence will precipitate catastrophic labor displacement. While the apprehension surrounding automation is well-founded, I contend that AI will catalyze unprecedented economic opportunities that eclipse the obsolescence of routine vocations.\n\nHistorically, technological disruption has redefined the nature of labor rather than eradicating human enterprise. The advent of mechanization during the Industrial Revolution supplanted manual craftsmanship, yet simultaneously spawned entire disciplines, including mechanical engineering, modern logistics, and assembly coordination. In a parallel fashion, modern neural networks necessitate sophisticated human stewardship—namely prompt engineering, machine ethics adjudication, and domain-specific dataset curation.\n\nConversely, vulnerable segments of the workforce cannot be overlooked. Repetitive clerical functions, telemarketing, and entry-level programming are progressively monopolized by generative models. Therefore, state-sponsored reskilling initiatives are imperative to endow displaced personnel with conceptual, strategic, and interpersonal faculties that remain impervious to algorithmic automation.\n\nTo conclude, despite the inevitable friction inherent to technological shifts, AI will ultimately cultivate high-yield industries and elevate human productivity to unprecedented heights.`
  },
  speaking: {
    band: 7.5,
    criteria: [
      { name: 'Fluency & Coherence', score: 7.5, feedback: 'Speaks at length effortlessly with minimal hesitation. Logical sequencing of thoughts.' },
      { name: 'Lexical Resource', score: 8.0, feedback: 'Rich variety of idiomatic phrases and precise contextual vocabulary.' },
      { name: 'Grammatical Range & Accuracy', score: 7.0, feedback: 'Frequent error-free complex sentences with accurate tense blending.' },
      { name: 'Pronunciation', score: 7.5, feedback: 'Clear phonology, expressive intonation, natural rhythm, very easy to understand.' }
    ],
    transcript: [
      { speaker: 'Examiner', time: '00:04', text: 'Good morning. Could you please tell me your full name?' },
      { speaker: 'Candidate', time: '00:08', text: 'Good morning. My name is Nafis Ahmed, but you can call me Nafis.' },
      { speaker: 'Examiner', time: '00:15', text: 'Thank you. Do you work or are you a student?' },
      { speaker: 'Candidate', time: '00:19', text: 'Currently, I am working as a junior software engineer at a fintech startup in Dhaka, while also preparing for my postgraduate studies in data science in the United Kingdom.' },
      { speaker: 'Examiner', time: '00:32', text: 'Now let’s move to Part 2. Here is your cue card: Describe an ambitious project you successfully completed.' },
      { speaker: 'Candidate', time: '01:45', text: 'I would like to talk about an open-source educational dashboard that my university team designed during our senior capstone year. It was genuinely challenging because we had to coordinate real-time student analytics across diverse cloud endpoints...' }
    ]
  }
};

// Answer Review Question List (Questions 1 to 10 sample from Reading/Listening)
export const ANSWER_REVIEW_ITEMS = [
  {
    qNum: 1,
    skill: 'Listening Section 1',
    prompt: 'Name of the accommodation facility requested by applicant:',
    studentAnswer: 'Riverdale Lodge',
    correctAnswer: 'Riverdale Lodge',
    isCorrect: true,
    audioTimestamp: '01:24',
    explanation: 'The clerk confirms: "You will be residing at the Riverdale Lodge on the northern ridge."'
  },
  {
    qNum: 2,
    skill: 'Listening Section 1',
    prompt: 'Maximum number of occupants permitted per cottage:',
    studentAnswer: 'Four',
    correctAnswer: '4',
    isCorrect: true,
    audioTimestamp: '02:10',
    explanation: 'Both "4" and "four" are recognized keys according to the official answer rubric.'
  },
  {
    qNum: 3,
    skill: 'Listening Section 1',
    prompt: 'Deposit amount required to guarantee the reservation:',
    studentAnswer: '150 dollars',
    correctAnswer: '150',
    isCorrect: false,
    audioTimestamp: '03:45',
    explanation: 'Rule stated "Write NO MORE THAN ONE WORD AND/OR A NUMBER". Writing "150 dollars" exceeded the constraint because the currency sign was already printed in the booklet.'
  },
  {
    qNum: 4,
    skill: 'Reading Passage 1',
    prompt: 'Tea leaves were initially used exclusively as a medicinal herb in ancient China.',
    studentAnswer: 'TRUE',
    correctAnswer: 'TRUE',
    isCorrect: true,
    audioTimestamp: 'N/A',
    explanation: 'Passage paragraph B lines 4-6 explicitly states: "Early records indicate tea was administered strictly for therapeutic virtues before evolving into a recreational infusion."'
  },
  {
    qNum: 5,
    skill: 'Reading Passage 1',
    prompt: 'European merchants monopolized the overland silk road tea trade during the 14th century.',
    studentAnswer: 'NOT GIVEN',
    correctAnswer: 'FALSE',
    isCorrect: false,
    audioTimestamp: 'N/A',
    explanation: 'Paragraph D clarifies that Persian and Sogdian trading guilds held exclusive commercial charters, while European maritime traders had no overland access.'
  }
];

// Speaking Booking Slots
export const SPEAKING_SLOTS = [
  { id: 'slot-1', date: '2026-10-08', time: '10:00 AM - 10:20 AM', examiner: 'Dr. Sarah Jenkins', branch: 'Gulshan HQ', status: 'Available' },
  { id: 'slot-2', date: '2026-10-08', time: '11:30 AM - 11:50 AM', examiner: 'David Miller', branch: 'Online Zoom Room 2', status: 'Available' },
  { id: 'slot-3', date: '2026-10-09', time: '02:15 PM - 02:35 PM', examiner: 'Dr. Sarah Jenkins', branch: 'Gulshan HQ', status: 'Available' },
  { id: 'slot-4', date: '2026-10-10', time: '04:00 PM - 04:20 PM', examiner: 'Rachel Green', branch: 'Dhanmondi Center', status: 'Available' }
];

// Teacher Assigned Batches
export const TEACHER_BATCHES = [
  {
    id: 'BATCH-A12',
    name: 'IELTS Masterclass B-12 (Gulshan Evening)',
    studentsCount: 28,
    schedule: 'Mon, Wed, Fri (6:30 PM - 8:30 PM)',
    avgBand: 7.2,
    progress: 75,
    nextSession: 'Tonight, 6:30 PM',
    room: 'Lab 302'
  },
  {
    id: 'BATCH-W04',
    name: 'Executive Weekend Intensive (Dhanmondi)',
    studentsCount: 22,
    schedule: 'Fri & Sat (10:00 AM - 2:00 PM)',
    avgBand: 6.8,
    progress: 40,
    nextSession: 'Friday, 10:00 AM',
    room: 'Executive Suite B'
  },
  {
    id: 'BATCH-ON09',
    name: 'Online High-Band Accelerator 09',
    studentsCount: 35,
    schedule: 'Tue, Thu (8:00 PM - 10:00 PM)',
    avgBand: 7.5,
    progress: 90,
    nextSession: 'Tomorrow, 8:00 PM',
    room: 'Zoom Room 1'
  }
];

// Institute Branches (Manager View)
export const INSTITUTE_BRANCHES = [
  { id: 'br-1', name: 'Gulshan Main Campus (HQ)', code: 'GLS', students: 540, staff: 18, rooms: 12, revenue: '$28,400', manager: 'Tanvir Hossain' },
  { id: 'br-2', name: 'Dhanmondi Academic Center', code: 'DHM', students: 380, staff: 12, rooms: 8, revenue: '$17,200', manager: 'Sabrina Rahman' },
  { id: 'br-3', name: 'Uttara North Sector Hub', code: 'UTR', students: 260, staff: 9, rooms: 6, revenue: '$11,500', manager: 'Kamrul Hasan' },
  { id: 'br-4', name: 'Chittagong Regional Campus', code: 'CTG', students: 160, staff: 6, rooms: 5, revenue: '$7,400', manager: 'Farhana Yasmin' },
  { id: 'br-5', name: 'Sylhet Global Centre', code: 'SYL', students: 80, staff: 3, rooms: 3, revenue: '$3,800', manager: 'Anisul Huq' }
];

// Institute Staff Members
export const STAFF_MEMBERS = [
  { id: 'stf-1', name: 'Dr. Sarah Jenkins', role: 'Senior IELTS Examiner', branch: 'Gulshan Main Campus', email: 's.jenkins@edumax.io', status: 'Active', activeBatches: 3, rating: 4.9 },
  { id: 'stf-2', name: 'Michael Chang', role: 'Speaking & Writing Specialist', branch: 'Dhanmondi Center', email: 'm.chang@edumax.io', status: 'Active', activeBatches: 2, rating: 4.8 },
  { id: 'stf-3', name: 'David Miller', role: 'Listening & Reading Coach', branch: 'Uttara Hub', email: 'd.miller@edumax.io', status: 'Active', activeBatches: 3, rating: 4.7 },
  { id: 'stf-4', name: 'Nadia Chowdhury', role: 'Academic Counselor', branch: 'Gulshan Main Campus', email: 'n.chowdhury@edumax.io', status: 'Active', activeBatches: 0, rating: 5.0 },
  { id: 'stf-5', name: 'Zahid Karim', role: 'Mock Exam Coordinator', branch: 'Chittagong Campus', email: 'z.karim@edumax.io', status: 'On Leave', activeBatches: 1, rating: 4.6 }
];

// Platform Admin: Tenants List
export const PLATFORM_TENANTS = [
  { id: 'ten-1', name: 'Edumax Consultancy (HQ)', domain: 'hq.edumax.io', students: 1420, tier: 'Enterprise Tier', status: 'Active', mrr: '$3,800', renewal: '2027-01-15' },
  { id: 'ten-2', name: 'British Standard Academy Dhaka', domain: 'bsa.ieltscloud.app', students: 850, tier: 'Institute Pro', status: 'Active', mrr: '$1,950', renewal: '2026-12-01' },
  { id: 'ten-3', name: 'FutureEdge International', domain: 'futureedge.edumax.io', students: 620, tier: 'Institute Pro', status: 'Active', mrr: '$1,400', renewal: '2027-03-20' },
  { id: 'ten-4', name: 'Apex Pathway IELTS UK', domain: 'apexpathway.co.uk', students: 430, tier: 'Standard Team', status: 'Active', mrr: '$950', renewal: '2026-11-10' },
  { id: 'ten-5', name: 'Global Scholars Sydney', domain: 'globalscholars.edu.au', students: 310, tier: 'Trial Period', status: 'Trialing', mrr: '$0', renewal: '2026-10-18' }
];

// Platform System Health Metrics
export const SYSTEM_HEALTH = {
  uptime: '99.98%',
  apiLatency: '32 ms',
  activeWorkers: 16,
  aiQueueLoad: '4.2% (Normal)',
  dbConnections: '142 / 500',
  monthlyInfraCost: '$840.20',
  audioTranscribeSuccess: '99.82%',
  lastBackup: '14 minutes ago'
};
