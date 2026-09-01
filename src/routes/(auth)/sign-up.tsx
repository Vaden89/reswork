import { SignupForm } from '#/components/auth/forms/signup-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="w-full flex justify-center max-w-2xl">
        <SignupForm />
      </div>
    </div>
  )
}
