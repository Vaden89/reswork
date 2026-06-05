import { createFileRoute } from '@tanstack/react-router'
import type { TemplateData } from '#/components/templates/template-1'
import { ProfileCard } from '#/components/user/profile-card'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="w-full flex flex-col">
      <header className="max-w-5xl flex items-center justify-between py-4 border-b px-8 border-b-border">
        <h1 className="text-2xl font-medium">Reswork</h1>
        <div className="flex items-center gap-4 font-normal text-secondary">
          <button>Templates</button>
          <button>My Resumes</button>
        </div>
        <ProfileCard />
      </header>
    </main>
  )
}

const MyCvInfo: TemplateData = {
  first_name: 'Isaac',
  last_name: 'Shosanya',
  state: 'Lagos',
  country: 'Nigeria',
  email: 'isaac@shosanya.com',
  phone: '+234 9027874827',
  website: 'https://shosanya.com',
  skills: [
    {
      skill_name: 'frontend',
      sub_skills: [
        'React.js',
        'Next.js',
        'TypeScript',
        'HTML5',
        'CSS3',
        'TailwindCSS',
        'Material UI',
        'Styled Components',
        'Redux',
        'Zustand',
        'React Query',
        'Vite',
        'ESLint',
        'Jest',
        'Core Web Vitals',
      ],
    },
    {
      skill_name: 'backend',
      sub_skills: [
        'Node.js',
        'Express.js',
        'NestJS',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'Prisma ORM',
        'Mongoose',
        'RESTful',
        'GraphQL',
        'WebSockets',
        'Microservices',
        'JWT',
        'OAuth 2.0',
        'Helmet.js',
        'Redis',
        'Docker',
      ],
    },
  ],
  workExperience: [
    {
      company: 'Anli Solutions',
      position: 'Software Engineer',
      start_date: 'July 2025',
      end_date: 'Present',
      location: 'Remote',
      responsibilities: [
        'Engineered high-performance application pages using Next.js, Tailwind CSS, and ShadCN, resulting in a seamless UI/UX that boosted user engagement and conversion rates.',
        'Architected a robust Super Admin Panel with NestJS and PostgreSQL, enabling centralized control over multi-tenant hotel operations, user permissions, and global system configurations.',
      ],
    },
    {
      company: 'Anli Solutions',
      position: 'Software Engineer',
      start_date: 'July 2025',
      end_date: 'Present',
      location: 'Remote',
      responsibilities: [
        'Engineered high-performance application pages using Next.js, Tailwind CSS, and ShadCN, resulting in a seamless UI/UX that boosted user engagement and conversion rates.',
        'Architected a robust Super Admin Panel with NestJS and PostgreSQL, enabling centralized control over multi-tenant hotel operations, user permissions, and global system configurations.',
      ],
    },
  ],
  projects: [
    {
      description:
        "Telex is a collaboration workspace where modern organizations pair human insight with intelligent agents to move faster, stay aligned, and execute at scale. Built for fluid communication like Slack but designed for action — Telex brings AI coworkers into the conversation. They don't just answer questions; they take action.",
      live_url: 'https://telex.ai',
      technologies: [
        'Next.js',
        'Tailwind CSS',
        'ShadCN',
        'NestJS',
        'PostgreSQL',
      ],
      name: 'Telex',
    },
  ],
  education: [
    {
      course: 'Computer Science',
      degree_type: 'Bsc.',
      start_date: 'April 2022',
      end_date: 'May 2025',
      location: 'Kaduna, Nigeria',
      school: 'Air force Institute of Technology',
      gpa: '4.2',
    },
  ],
}
