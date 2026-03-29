export const siteConfig = {
  name: 'FYNITI',
  tagline: 'IT Solutions & Digital Innovation',
  description:
    'FYNITI delivers innovative IT solutions, software development, and digital experiences that empower businesses to thrive in the digital age.',
  url: 'https://fyniti.co.uk',
  email: 'info@fyniti.co.uk',
  phone: '+44 755 1045042',
  location: 'United Kingdom',
  formspreeId: '', // Legacy — unused
  web3formsKey: '',  // Set via PUBLIC_WEB3FORMS_KEY env var
  contactEmail: 'contact@fyniti.co.uk',
} as const;

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
] as const;

export const heroTypewriterWords = [
  'Custom Software',
  'Web & Mobile Apps',
  'E-Commerce Solutions',
  'Cloud Architecture',
  'UI/UX Design',
  'Quality Assurance',
] as const;

export interface Service {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  featured: boolean;
}

export const services: Service[] = [
  {
    title: 'IT Solutions & Consulting',
    description:
      'Strategic IT consulting to help businesses optimise operations and technology investments. We design, implement, and manage cloud solutions, network security, and data infrastructure.',
    icon: '💡',
    tags: ['Cloud', 'Infrastructure', 'Strategy'],
    featured: true,
  },
  {
    title: 'Software Development',
    description:
      'Tailor-made software solutions addressing specific business challenges. We build scalable enterprise software ensuring seamless integration with existing systems.',
    icon: '⚙️',
    tags: ['Custom', 'Enterprise', 'Integration'],
    featured: false,
  },
  {
    title: 'Web & Mobile Apps',
    description:
      'Robust, scalable web applications and native mobile apps for iOS and Android, with a focus on user experience and performance.',
    icon: '📱',
    tags: ['React', 'iOS', 'Android'],
    featured: false,
  },
  {
    title: 'Web Design & UI/UX',
    description:
      'Visually compelling, responsive websites with comprehensive UI/UX design services. We craft intuitive interfaces that enhance user engagement across all devices.',
    icon: '🎨',
    tags: ['Responsive', 'UI/UX', 'CMS'],
    featured: false,
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'Feature-rich e-commerce platforms with shopping carts, payment gateways, and inventory management. Custom solutions that scale with your business.',
    icon: '🛒',
    tags: ['Spree', 'Payments', 'Scalable'],
    featured: false,
  },
  {
    title: 'Testing & QA',
    description:
      'Comprehensive testing services including unit, manual, regression, and automated test suites to ensure software reliability and quality.',
    icon: '🔍',
    tags: ['Automation', 'Regression', 'CI/CD'],
    featured: true,
  },
  {
    title: 'Social Media & Video',
    description:
      'Targeted ad campaigns across Facebook, Instagram, LinkedIn, and Twitter. High-quality video content to boost brand awareness and engagement.',
    icon: '📢',
    tags: ['Ads', 'Video', 'Analytics'],
    featured: false,
  },
  {
    title: 'BPO Services',
    description:
      'Multilingual customer support, back-office operations, and 24/7 technical support services enabling businesses to focus on core activities.',
    icon: '🤝',
    tags: ['Support', 'Back-Office', '24/7'],
    featured: false,
  },
  {
    title: 'SEO & Digital Marketing',
    description:
      'Comprehensive SEO, content marketing, and PPC advertising to drive targeted traffic and increase online visibility.',
    icon: '📈',
    tags: ['SEO', 'PPC', 'Content'],
    featured: false,
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Analysis',
    description:
      'We dive deep into your business goals, challenges, and technical requirements to craft a tailored strategy.',
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description:
      'Our team designs a comprehensive roadmap with clear milestones, timelines, and deliverables.',
  },
  {
    number: '03',
    title: 'Design & Development',
    description:
      'We bring your vision to life with iterative development, regular check-ins, and transparent progress updates.',
  },
  {
    number: '04',
    title: 'Testing & QA',
    description:
      'Rigorous quality assurance through unit, integration, and regression testing ensures flawless delivery.',
  },
  {
    number: '05',
    title: 'Launch & Support',
    description:
      'Seamless deployment followed by ongoing maintenance, monitoring, and continuous improvement.',
  },
];

export interface TechCategory {
  name: string;
  icon: string;
  items: string[];
}

export const technologies: TechCategory[] = [
  {
    name: 'Frontend',
    icon: '🖥️',
    items: ['React', 'Next.js', 'Vue', 'Angular', 'Astro', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    icon: '⚡',
    items: ['Node.js', 'Python', 'Ruby on Rails', 'Go', '.NET', 'Java'],
  },
  { name: 'Mobile', icon: '📱', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { name: 'Cloud', icon: '☁️', items: ['AWS', 'Azure', 'GCP', 'Vercel', 'Docker', 'Kubernetes'] },
  { name: 'Databases', icon: '🗄️', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'] },
  { name: 'DevOps', icon: '🔄', items: ['GitHub Actions', 'Jenkins', 'Terraform', 'Ansible'] },
  { name: 'CMS & E-Commerce', icon: '🛍️', items: ['Spree', 'Shopify', 'WordPress', 'Strapi'] },
  { name: 'Testing', icon: '✅', items: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'Vitest'] },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatar?: string;
  email: string;
  links: { label: string; url: string }[];
}

export const team: TeamMember[] = [
  {
    name: 'Zeeshan Asim',
    role: 'Co-Founder & CEO',
    bio: 'Driving digital transformation with innovative IT solutions.',
    initials: 'ZA',
    email: 'zashasim892@gmail.com',
    links: [
      { label: 'Email', url: 'mailto:zashasim892@gmail.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/zeeshanasim' },
    ],
  },
  {
    name: 'Hammad Habib Khan',
    role: 'Co-Founder & CTO',
    bio: 'Full-stack architect building scalable cloud systems.',
    initials: 'HK',
    avatar: '/team/hammad.jpg',
    email: 'hammadkhanxcm@gmail.com',
    links: [
      { label: 'Email', url: 'mailto:hammadkhanxcm@gmail.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/hammadkhanxcm' },
      { label: 'GitHub', url: 'https://github.com/hammadkhanxcm' },
      { label: 'Portfolio', url: 'https://hk.fyniti.co.uk' },
    ],
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Hammad has made a huge impact at Sendoso during his almost 3 years working here. Hammad played a big part in the recent June launch which was an important launch for our customers. Keep up the great work Hammad!',
    author: 'Kris Rudeegraap',
    role: 'Co-CEO',
    company: 'Sendoso',
  },
  {
    quote:
      'I have worked with Hammad both directly and indirectly for more than a year. He has helped me immensely in solving issues in software development and also serving as a resource to help the team be more successful. Hammad has always had a positive attitude and great communications in everything I have worked with him on.',
    author: 'Cody Farmer',
    role: 'VP, Product',
    company: 'Sendoso',
  },
  {
    quote:
      'Beyond his technical contributions, Hammad showed qualities that align with future leadership: he took ownership of critical projects, identified areas for improvement proactively, and collaborated effectively across teams. His ability to combine architectural thinking with hands-on execution made him a reliable and impactful member of the team.',
    author: 'Qaseem Shaikh',
    role: 'Former CTO',
    company: 'Sendoso',
  },
  {
    quote:
      'Hammad demonstrated his technical breadth, adaptability, and the ability to deliver features that directly impacted business operations and user experience. He worked on several initiatives that strengthened the Sendoso platform, including role-based permissions, API monitoring dashboards, and integrations with HubSpot, Salesloft, Marketo, and Engagio.',
    author: 'Nawab Iqbal',
    role: 'Former Engineering Manager',
    company: 'Sendoso',
  },
  {
    quote:
      'Hammad did amazing work on different projects including ChurnZero, HubSpot Chrome Extension and SalesIQ V2. He improved the reliability and performance of the chrome extension by replacing scrapping code with API calls. He is self motivated and self organized engineer in the INT team.',
    author: 'Usman Ali',
    role: 'Scrum Master | Agile Project Manager',
    company: 'Sendoso',
  },
  {
    quote:
      'Hammad is an excellent resource. He is one of our talented and energetic graduates. He worked well during his studies and also good professional in programming languages. I rate him high for his problem-solving ability.',
    author: 'Muhammad Rashid Mukhtar',
    role: 'Technical Lead, Solution Architect',
    company: 'COMSATS University',
  },
  {
    quote:
      'Thanks for helping me with the VAT Legal site. They did everything, from setting up WordPress and making it look like our brand to speeding it up, making it safer, and making it easier for search engines to find. We now have a sleek, modern website that looks great on any screen.',
    author: 'Majid Mohammed',
    role: 'VAT Consultant',
    company: 'VAT Legal',
  },
  {
    quote:
      'Hammad Habib Khan was a great person to work with. Proactive, energetic and totally organized. Brilliant Software Engineer. Loyal, insightful and independent. He had vision to see the benefits and the passion to turn that into measurable results.',
    author: 'Sajid Ali',
    role: 'Integration Manager & Principal Software Engineer',
    company: 'Engin Technologies',
  },
  {
    quote:
      'Hammad consistently demonstrated exceptional leadership and technical expertise. He played a key role in leading high-impact projects, modernizing legacy systems, and driving innovation across both backend and frontend stacks. His contributions significantly enhanced our product scalability and performance.',
    author: 'TechXmation',
    role: 'Company Endorsement',
    company: 'TechXmation',
  },
  {
    quote:
      'Mr. Hammad Habib Khan made outstanding contributions to the Machinery Manager project. He demonstrated expertise in database optimization, advanced query development, email functionality enhancements, content access and security, and UI/UX improvements.',
    author: 'MachineTools',
    role: 'Company Endorsement',
    company: 'MachineTools',
  },
];

export const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', bar: 90 },
  { value: 8, suffix: '', label: 'In Progress', bar: 50 },
  { value: 30, suffix: '+', label: 'Happy Clients', bar: 70 },
  { value: 5, suffix: '+', label: 'Years Experience', bar: 40 },
  { value: 0, suffix: '', label: 'UK Based', bar: 20, display: 'UK' },
] as const;

export const footerLinks = {
  services: [
    { label: 'IT Consulting', href: '#services' },
    { label: 'Software Development', href: '#services' },
    { label: 'Web & Mobile Apps', href: '#services' },
    { label: 'E-Commerce', href: '#services' },
    { label: 'Testing & QA', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Technologies', href: '#technologies' },
    { label: 'Team', href: '#team' },
  ],
} as const;
