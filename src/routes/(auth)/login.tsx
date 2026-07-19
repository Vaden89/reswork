import { LoginForm } from '#/components/auth/forms/login-form'
import { Button } from '#/components/common/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Sparkle } from 'lucide-react'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-dvh grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 h-full flex flex-col items-center justify-between">
        <div className="relative w-full pt-10">
          <Sparkle className="mx-auto" fill="black" />
          <Link to="/">
            <Button
              variants="ghost"
              text="Home"
              iconPosition="left"
              icon={<ArrowLeft size={16} />}
              className="absolute left-0 top-10"
            />
          </Link>
        </div>
        <LoginForm />
        <div></div>
      </div>
      <img
        src="/images/login.jpg"
        alt="Login Image"
        className="w-full h-full hidden lg:flex"
      />
    </div>
  )
}
