import { LoginForm } from '#/components/auth/forms/login-form'
import { Button } from '#/components/common/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Sparkle } from 'lucide-react'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="w-full flex justify-center max-w-2xl">
        <LoginForm />
      </div>
    </div>
  )
}
