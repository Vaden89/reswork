import { BenefitsSection } from '#/components/landing/sections/benefits-section'
import { CorePrinciplesSection } from '#/components/landing/sections/core-principles-section'
import { HeroSection } from '#/components/landing/sections/hero-section'
import { useAuth } from '#/context/auth.context'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { user } = useAuth()
  const isAuthenticated = user?.type === 'authenticated'

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <HeroSection />
      <CorePrinciplesSection />
      {!isAuthenticated && <BenefitsSection />}
    </main>
  )
}
