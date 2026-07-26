/** Derived from the-hard-port-os/knowledge/smb-maturity/ (THP-SMB-LEVELS-001, LEVEL-01/02/03). */

export const corePrinciple =
  'A single sale proves demand may exist. It does not prove an operating business exists.'

export const dimensions = [
  {
    id: 'A',
    name: 'Demand',
    question: 'Do people genuinely want what the business offers?',
  },
  {
    id: 'B',
    name: 'Customer understanding',
    question: 'Does the business understand who buys and why?',
  },
  {
    id: 'C',
    name: 'Retention and community',
    question:
      'Do people return, participate, recommend, or remain connected?',
  },
  {
    id: 'D',
    name: 'Financial stability',
    question: 'Can the business continue operating?',
  },
  {
    id: 'E',
    name: 'Operations',
    question: 'Can the business deliver its value consistently?',
  },
  {
    id: 'F',
    name: 'Founder dependency',
    question:
      'Can the business function without the founder controlling everything?',
  },
  {
    id: 'G',
    name: 'Evidence and decision-making',
    question: 'Does the business learn from its actions?',
  },
  {
    id: 'H',
    name: 'Identity and market position',
    question:
      'Does the business have a recognizable and meaningful position?',
  },
] as const

export const misleadingSignals = [
  { signal: 'Strong sales with chaotic delivery', doesNotProve: 'Stability' },
  { signal: 'Many followers without repeat customers', doesNotProve: 'Community' },
  { signal: 'A viral campaign', doesNotProve: 'Growth' },
  { signal: 'Hiring employees', doesNotProve: 'Operational maturity' },
  { signal: 'Revenue growth', doesNotProve: 'Scalability' },
  { signal: 'Brand recognition', doesNotProve: 'Viable business model' },
] as const

export const progression = [
  'Level 1 proves the business exists.',
  'Level 2 proves it has a viable operating foundation.',
  'Level 3 tests whether that foundation can support deliberate growth.',
  'Level 3 begins when a deliberate growth experiment becomes active; planning an experiment remains Level 2.',
] as const

export const levels = [
  {
    id: 'level-0',
    number: '0',
    levelId: 'level_00_pre_operating',
    name: 'Pre-operating',
    status: 'Working label; formal Level 0 gate not yet defined in THP OS.',
    definition:
      'Not yet Level 1. THP may define Level 0 later. These conditions are excluded from Level 1 and from THP\'s first onboarder work today.',
    entryGate: null,
    excluded: [
      'Pure ideas',
      'Pre-launch projects',
      'Hobby pages without transactions',
      'One-off freelance accidents',
      'Businesses that have stopped operating',
      'Audiences that have not developed an offer',
    ],
    centralQuestion: null,
    primaryRisk: null,
    thpNote:
      'THP does not classify qualification outcomes as maturity levels. First onboarder work starts at Level 1 after application and qualification.',
  },
  {
    id: 'level-1',
    number: '1',
    levelId: 'level_01_established_but_surviving',
    name: 'Established but Surviving',
    status: 'Defined; THP first onboarder band.',
    definition:
      'A Level 1 business has demonstrated that real customers will pay for and receive its offer, but it has not yet established the demand, retention, financial, operational, or learning systems needed for stability. The business exists. Its continued existence is not yet dependable.',
    entryGate: [
      'It has a defined offer.',
      'Multiple unrelated paying customers have purchased the offer.',
      'The offer has been delivered more than once.',
      'The business remains actively operating.',
      'The founder intends to continue building it.',
    ],
    excluded: null,
    centralQuestion: null,
    primaryRisk:
      'The founder repeatedly changes the visible parts of the business before understanding the system producing the results. This is where THP should first intervene.',
    thpNote:
      'THP\'s active operational boundary is the Level 1 to Level 2 transition: qualification, Business Reality Diagnostic, then optional intervention when a diagnosed constraint requires it.',
  },
  {
    id: 'level-2',
    number: '2',
    levelId: 'level_02_stable_preparing_for_growth',
    name: 'Stable and Preparing for Growth',
    status: 'Defined; destination after Level 1 stability work.',
    definition:
      'A Level 2 business has moved beyond immediate survival by establishing a sufficiently clear offer, identifiable core customers, repeatable delivery, financial visibility, and an early evidence system. It is not necessarily highly profitable, independent of its founder, or ready to scale. It is stable enough to protect what works, study what remains uncertain, and prepare deliberate growth experiments without placing the entire business at risk.',
    entryGate: [
      'Demand clarity with recurring evidence on a core offer.',
      'Customer clarity based on observed behavior and feedback.',
      'Retention or community evidence; identifiable repeat relationships.',
      'Financial visibility; survival no longer entirely week-to-week.',
      'Operational consistency; core delivery repeatable.',
      'Reduced founder reactivity; some knowledge externalized.',
      'Evidence system; experiments have stated purposes.',
      'Identity clarity; customers can begin recognizing what the business stands for.',
    ],
    excluded: null,
    centralQuestion:
      'Does the business understand what must remain stable before it attempts to grow?',
    primaryRisk:
      'Premature growth: interpreting early stability as proof of readiness for aggressive expansion before the foundation is protected and baselined.',
    thpNote:
      'Stability must be demonstrated across at least three complete business cycles and, for frequent-transaction businesses, across approximately ninety days. A temporary spike cannot be used as evidence of progression.',
  },
  {
    id: 'level-3',
    number: '3',
    levelId: 'level_03_attempting_growth',
    name: 'Attempting Growth, Growth Model Not Yet Stable',
    status: 'Defined; next boundary after stability. Not THP\'s active operational scope yet.',
    definition:
      'A Level 3 business has established the Level 2 operating foundation and is actively conducting deliberate experiments intended to increase demand, customers, participation, revenue, capacity, partnerships, or market reach. Its core business remains viable, but its growth mechanism is not yet proven to be repeatable, financially responsible, operationally supportable, or compatible with the business\'s identity and community.',
    entryGate: [
      'The Level 2 foundation remains active.',
      'A specific growth objective and growth constraint are defined.',
      'A deliberate experiment is active; resources are committed, not merely planned.',
      'The viable core is protected with stop conditions.',
      'Baseline evidence exists so results can be compared.',
    ],
    excluded: null,
    centralQuestion:
      'Can the business produce growth repeatedly without destabilizing the value, relationships, operations, and identity responsible for its existing stability?',
    primaryRisk:
      'Confusing activity with growth: more customers, revenue, posts, or workload without a proven, repeatable growth mechanism; destabilizing the viable core in pursuit of momentum.',
    thpNote:
      'At Level 1, instability concerns the viability of the core business. At Level 3, instability concerns the growth mechanism. A business may regress to Level 2 when an experiment ends and the foundation remains intact.',
  },
] as const

export const provisionalLevels = [
  {
    number: '4',
    name: 'Recognized and Growing',
    note: 'At least one repeatable growth mechanism producing meaningful recognition within the relevant market or community.',
  },
  {
    number: '5',
    name: 'Stable Growth',
    note: 'Growth mechanisms operate reliably without constant founder rescue or emergency intervention.',
  },
  {
    number: '6',
    name: 'Preparing to Scale',
    note: 'Systems, capacity, and economics prepared for scaling without assuming scale is desirable or imminent.',
  },
  {
    number: '7',
    name: 'Scaling',
    note: 'Reach, capacity, or market presence expands while preserving core value and operational integrity.',
  },
] as const
