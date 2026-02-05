import { 
  Rocket, Building2, Zap, Users, Brain, Target, TrendingUp, 
  Shield, Award, Lightbulb, Code, Sparkles, Star, Trophy,
  Globe, Layers, GitBranch, Bot, Cpu, Palette
} from 'lucide-react';

export const slides = [
  // Slide 0: Title
  {
    type: 'title',
    title: 'Innovation Driven Environment',
    subtitle: 'vs Small/Medium Enterprise',
    description: 'A framework for understanding how innovation-first organizations operate differently',
    presenter: 'WorldClass',
    event: 'University Excursion 2026',
    icon: Rocket,
  },

  // Slide 1: What is IDE?
  {
    type: 'definition',
    title: 'What is an IDE?',
    subtitle: 'Innovation Driven Environment',
    icon: Lightbulb,
    points: [
      { icon: Rocket, text: 'Organizations built around continuous innovation', color: 'purple' },
      { icon: Zap, text: 'Speed and experimentation over stability', color: 'cyan' },
      { icon: Target, text: 'Goal: Create new markets, not just compete', color: 'pink' },
      { icon: Brain, text: 'AI and automation at the core', color: 'blue' },
    ],
    quote: '"Move fast and build things that matter."'
  },

  // Slide 2: What is SME?
  {
    type: 'definition',
    title: 'What is an SME?',
    subtitle: 'Small/Medium Enterprise',
    icon: Building2,
    points: [
      { icon: Shield, text: 'Focus on stability and steady growth', color: 'blue' },
      { icon: TrendingUp, text: 'Optimize existing business models', color: 'green' },
      { icon: Users, text: 'Traditional hierarchical structures', color: 'orange' },
      { icon: Target, text: 'Goal: Sustainable profitability', color: 'purple' },
    ],
    quote: '"Slow and steady wins the race."'
  },

  // Slide 3: Side-by-side Comparison
  {
    type: 'comparison',
    title: 'IDE vs SME: Head to Head',
    items: [
      { label: 'Primary Goal', ide: 'Disrupt & Create Markets', sme: 'Capture Market Share' },
      { label: 'Growth Model', ide: 'Exponential (10x thinking)', sme: 'Linear (10% improvements)' },
      { label: 'Risk Tolerance', ide: 'High - Fail fast, learn faster', sme: 'Low - Calculated moves' },
      { label: 'Competition View', ide: 'Create own category', sme: 'Beat existing competitors' },
      { label: 'Funding Focus', ide: 'Runway for experiments', sme: 'ROI on investments' },
      { label: 'Failure Mindset', ide: 'Data points for learning', sme: 'Costs to minimize' },
    ]
  },

  // Slide 4: Team Structure
  {
    type: 'split',
    title: 'Team Structure',
    left: {
      title: 'IDE Approach',
      icon: Layers,
      color: 'purple',
      items: [
        'Small, autonomous squads',
        'Cross-functional by default',
        'Flat hierarchy',
        'Everyone ships code',
        'Roles are fluid',
      ]
    },
    right: {
      title: 'SME Approach',
      icon: Building2,
      color: 'blue',
      items: [
        'Departmental silos',
        'Specialized teams',
        'Clear chain of command',
        'Distinct job descriptions',
        'Fixed responsibilities',
      ]
    }
  },

  // Slide 5: Decision Making
  {
    type: 'visual',
    title: 'Decision-Making Speed',
    visual: 'decision-speed',
    description: 'In an IDE, decisions happen in hours, not weeks. Bureaucracy is the enemy of innovation.',
    stats: [
      { label: 'IDE Decision Time', value: 'Hours', icon: Zap },
      { label: 'SME Decision Time', value: 'Weeks', icon: Building2 },
      { label: 'Approval Layers in IDE', value: '1-2', icon: GitBranch },
      { label: 'Approval Layers in SME', value: '5-7', icon: Layers },
    ]
  },

  // Slide 6: Culture of Experimentation
  {
    type: 'culture',
    title: 'Culture of Experimentation',
    subtitle: 'The IDE Secret Sauce',
    experiments: [
      { name: 'Hypothesis-Driven', desc: 'Every feature starts with a hypothesis', status: 'core' },
      { name: 'MVP Mindset', desc: 'Ship fast, iterate faster', status: 'core' },
      { name: 'A/B Everything', desc: 'Data decides, not opinions', status: 'active' },
      { name: 'Celebrate Failures', desc: 'Failed experiments = valuable data', status: 'active' },
      { name: '20% Time', desc: 'Innovation time built into schedule', status: 'optional' },
    ]
  },

  // Slide 7: AI Integration
  {
    type: 'ai-integration',
    title: 'AI in Daily Workflows',
    subtitle: 'The WorldClass Way',
    icon: Bot,
    tools: [
      { name: 'Claude', role: 'Core reasoning & coding partner', usage: '24/7' },
      { name: 'AI Agents', role: 'Autonomous task execution', usage: 'Daily' },
      { name: 'Custom LLMs', role: 'Domain-specific intelligence', usage: 'Per project' },
      { name: 'AI Code Review', role: 'Quality & security checks', usage: 'Every PR' },
    ],
    quote: '"AI is not replacing us. AI is amplifying us."'
  },

  // Slide 8: WorldClass Portfolio
  {
    type: 'portfolio',
    title: 'WorldClass in Action',
    subtitle: 'Real IDE Examples',
    ventures: [
      { 
        name: 'Vent.Africa', 
        sector: 'Fintech',
        desc: 'Revolutionizing African finance',
        icon: Globe,
        color: 'purple'
      },
      { 
        name: 'AI Dev Platform', 
        sector: 'Developer Tools',
        desc: 'Tools that build tools',
        icon: Code,
        color: 'cyan'
      },
      { 
        name: 'Quinn', 
        sector: 'AI Assistant',
        desc: 'Personal AI that runs 24/7',
        icon: Bot,
        color: 'pink'
      },
      { 
        name: 'Multiple Ventures', 
        sector: 'Cross-sector',
        desc: 'Parallel innovation streams',
        icon: Layers,
        color: 'green'
      },
    ]
  },

  // Slide 9: Quiz Introduction
  {
    type: 'quiz-intro',
    title: "🎮 Pop Quiz Time!",
    subtitle: 'Is this an IDE or SME approach?',
    description: 'Test your understanding. Answer correctly to earn points!',
    points: '+50 points per correct answer',
  },

  // Slide 10: Quiz Question 1
  {
    type: 'quiz',
    question: 'A company launches 5 products in a year, expecting 3 to fail.',
    options: [
      { text: 'IDE Approach', isCorrect: true },
      { text: 'SME Approach', isCorrect: false },
    ],
    explanation: 'IDEs embrace failure as part of the innovation process. Multiple experiments increase chances of breakthrough success.',
    points: 50,
  },

  // Slide 11: Quiz Question 2
  {
    type: 'quiz',
    question: 'The CEO must approve all new feature requests before development begins.',
    options: [
      { text: 'IDE Approach', isCorrect: false },
      { text: 'SME Approach', isCorrect: true },
    ],
    explanation: 'SMEs typically have more approval layers. IDEs empower teams to make decisions autonomously.',
    points: 50,
  },

  // Slide 12: Quiz Question 3
  {
    type: 'quiz',
    question: 'Engineers spend 20% of their time on personal innovation projects.',
    options: [
      { text: 'IDE Approach', isCorrect: true },
      { text: 'SME Approach', isCorrect: false },
    ],
    explanation: 'IDEs build innovation time into the schedule. This led to products like Gmail and Google Maps!',
    points: 50,
  },

  // Slide 13: Quiz Question 4
  {
    type: 'quiz',
    question: 'The company uses AI agents to handle routine tasks while humans focus on strategy.',
    options: [
      { text: 'IDE Approach', isCorrect: true },
      { text: 'SME Approach', isCorrect: false },
    ],
    explanation: 'AI integration is a hallmark of modern IDEs. It amplifies human capability rather than replacing it.',
    points: 50,
  },

  // Slide 14: Group Exercise
  {
    type: 'exercise',
    title: '💡 Group Exercise',
    duration: '5 minutes',
    task: 'Design Your IDE',
    instructions: [
      'Form groups of 4-5 people',
      'Pick a problem you care about',
      'Design an IDE approach to solve it:',
      '  → What would you experiment with first?',
      '  → How would you structure the team?',
      '  → What role would AI play?',
      'Be ready to share in 5 minutes!',
    ],
    bonus: 'Groups that share get +100 points!',
  },

  // Slide 15: Live Demo with Quinn
  {
    type: 'live-chat',
    title: '🔴 Live Demo with Quinn',
    subtitle: 'AI Assistant in Real Time',
    description: 'Watch WorldClass interact with Quinn (AI) live!',
    instructions: [
      'Opening Telegram Web on the big screen',
      'Ask me anything about IDE vs SME',
      'Request a quick code demo',
      'See AI-assisted development in action',
    ],
    telegramUrl: 'https://web.telegram.org',
    note: 'This is the same AI that built this entire presentation overnight!',
  },

  // Slide 16: Key Takeaways
  {
    type: 'takeaways',
    title: 'Key Takeaways',
    points: [
      { icon: Rocket, text: 'IDE = Innovation first, stability second' },
      { icon: Zap, text: 'Speed and experimentation beat perfection' },
      { icon: Brain, text: 'AI amplifies, not replaces, human capability' },
      { icon: Users, text: 'Small teams, big autonomy, fast decisions' },
      { icon: Target, text: 'Failure is data, not defeat' },
    ],
    cta: 'The question isn\'t IF you\'ll work in an IDE, but WHEN.'
  },

  // Slide 17: Practical Take-Home
  {
    type: 'take-home',
    title: '🎁 Your Take-Home Kit',
    subtitle: 'Start Your Own IDE Journey',
    items: [
      {
        icon: '📋',
        title: 'IDE Starter Checklist',
        desc: 'Step-by-step guide to transform your workflow',
      },
      {
        icon: '🛠️',
        title: 'AI Tools Setup Guide',
        desc: 'Get Claude, GitHub Copilot, and more working today',
      },
      {
        icon: '📁',
        title: 'Project Template',
        desc: 'A starter repo with IDE best practices built-in',
      },
      {
        icon: '📖',
        title: 'Reading List',
        desc: 'Books and articles on innovation-driven thinking',
      },
    ],
    downloadUrl: '/take-home-kit.html',
  },

  // Slide 18: Resources & One-Pager
  {
    type: 'resources',
    title: 'Resources & Links',
    onePager: true,
    links: [
      { label: 'WorldClass', url: 'https://worldclass.dev' },
      { label: 'Vent.Africa', url: 'https://vent.africa' },
      { label: 'This Presentation', url: 'https://worldclass-dev.github.io/ide-vs-sme-presentation' },
    ],
    qrCode: true,
  },

  // Slide 18: Thank You
  {
    type: 'ending',
    title: 'Thank You!',
    subtitle: 'Questions?',
    message: 'The future belongs to those who build it.',
    social: '@worldclass_dev',
    email: 'hello@worldclass.dev',
  },
];
