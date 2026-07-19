import { Button } from '#/components/common/button'
import { FormField } from '#/components/common/form'
import { authClient } from '#/lib/auth-client'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'

export function LoginForm() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    if (!email || !password) {
      setError('Enter your email and password to continue.')
      return
    }

    setIsSubmitting(true)

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      })

      if (signInError) {
        setError(
          signInError.message ?? 'Unable to log in with those credentials.',
        )
        return
      }

      await navigate({ to: '/resumes' })
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className=" px-4 lg:w-2/3 space-y-4 text-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl font-medium leading-[80%]">Welcome back!</h1>
      <p className="text-secondary">
        Your work experience, your resume, your professional history all in one
        place.
      </p>
      <FormField label="Email" name="email" placeholder="Enter your email" />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
      />

      {error && (
        <p className="w-full bg-red-50 py-2 border border-red-400 rounded-md text-sm text-red-500">
          {error}
        </p>
      )}

      <Button
        type="submit"
        text={isSubmitting ? 'Logging in...' : 'Login'}
        className="w-full py-2"
        disabled={isSubmitting}
      />

      <div className="text-sm">
        <span className="text-secondary">Don't have an account? </span>
        <Link
          to="/sign-up"
          className="underline underline-offset-2 font-semibold"
        >
          Sign up
        </Link>
      </div>
    </form>
  )
}
