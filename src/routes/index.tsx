import { createFileRoute } from '@tanstack/react-router'
import type { TemplateData } from '#/components/templates/template-1'
import { Button } from '#/components/common/button'
import { ArrowRight, FileText, LayoutDashboard, Pencil } from 'lucide-react'
import { NavBar } from '#/components/common/nav-bar'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center">
      <header className="max-w-6xl w-full">
        <NavBar />
      </header>
      <section className="max-w-6xl px-8 xl:px-0 w-full flex justify-between items-center mt-12 gap-10">
        <div className="w-1/2 flex flex-col gap-5">
          <h1 className="text-5xl font-bold">
            Build your professional future.
          </h1>
          <p className="text-secondary text-2xl font-semibold">
            Precision and simplicity for modern professional. Construct a
            document that reflects your structural value
          </p>
          <Button className="py-2 px-5 capitalize">
            START BUILDING
            <ArrowRight size={16} />
          </Button>
        </div>
        <div className="w-1/2 h-[70vh] bg-red-300"></div>
      </section>
      <section className="max-w-6xl px-8 xl:px-0 w-full flex mt-12 py-12 gap-10 border-t border-t-border flex-col">
        <span className="text-xl">CORE PRINCIPLES</span>
        <div className="w-full grid grid-cols-6 gap-5">
          <div className="bg-white col-span-4 p-8 border border-border">
            <div className="p-3 border border-border bg-neutral w-fit">
              <LayoutDashboard size={20} />
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <span className="text-xl font-medium">Clean Templates</span>
              <p className="w-3/4 text-tertiary text-sm font-light">
                Mathematically balanced, ATS-optimized layouts designed to
                present your experience without visual noise or distraction.
              </p>
            </div>
          </div>
          <div className="bg-white col-span-2 p-8 border border-border">
            <div className="p-3 border border-border bg-neutral w-fit">
              <Pencil size={20} />
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <span className="text-xl font-medium">Intuitive Editor</span>
              <p className="text-tertiary text-sm font-light">
                A structured, block-based entry system that enforces formatting
                consistency.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 border border-border col-span-6 flex items-center gap-4">
            <div className="p-3 border border-border bg-neutral w-fit">
              <FileText size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-medium">Lossless PDF Export</span>
              <p className="text-tertiary text-[13px] font-light">
                Render your final document precisely as designed, optimized for
                ATS parsers and print.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>
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
