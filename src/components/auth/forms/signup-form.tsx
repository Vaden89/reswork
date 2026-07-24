import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { Button } from '#/components/common/button'
import { FormField } from '#/components/common/form'
import { Link, useNavigate } from '@tanstack/react-router'

import type { SubmitEvent } from 'react'
import { useToast } from '#/context/toast.context'

export function SignupForm() {
  const navigate = useNavigate()
  const { error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const name = String(formData.get('username') ?? '')

    if (!email || !password || !name) {
      error('Enter your email, password, and name to continue.')
      return
    }

    setIsSubmitting(true)

    try {
      const { error: signInError } = await authClient.signUp.email({
        email,
        password,
        name,
      })

      if (signInError) {
        error(
          signInError.message ??
            'Unable to create account with those credentials.',
        )
        return
      }

      await navigate({ to: '/resumes' })
    } catch (caughtError) {
      error(
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
      className="px-4 lg:w-2/3 space-y-4 text-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl font-medium leading-[80%]">Hey, There!</h1>
      <p className="text-secondary">
        Welcome to reswork. Where you get to easily and freely manage and build
        out your resumes.
      </p>
      <FormField
        label="Username"
        name="username"
        placeholder="Enter your username"
      />
      <FormField label="Email" name="email" placeholder="Enter your email" />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
      />

      <Button
        type="submit"
        text={isSubmitting ? 'Logging in...' : 'Register'}
        className="w-full py-2"
        disabled={isSubmitting}
      />

      <div className="text-sm">
        <span className="text-secondary">Already have an account? </span>
        <Link
          to="/login"
          className="underline underline-offset-2 font-semibold"
        >
          Login
        </Link>
      </div>
    </form>
  )
}
