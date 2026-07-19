import { Button } from '#/components/common/button'
import { accountBenefits } from '#/data/constants/benefits'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

export const BenefitsSection = () => {
  return (
    <section className="max-w-6xl px-4 sm:px-8 xl:px-0 w-full flex mb-12 py-12 gap-5 sm:gap-10 border-t border-t-border flex-col">
      <div className="w-full flex items-end justify-between">
        <span className="text-xl sm:font-normal font-medium">WHY SIGN UP</span>
        <span className="hidden sm:block text-xs tracking-[0.2em] text-secondary">
          01 — 03
        </span>
      </div>
      <div className="w-full flex flex-col sm:grid sm:grid-cols-3 gap-5">
        {accountBenefits.map((benefit) => (
          <div
            key={benefit.index}
            className="bg-white sm:p-8 p-6 border border-border flex flex-col transition-colors duration-300 hover:border-primary"
          >
            <div className="w-full flex items-start justify-between">
              <div className="p-3 border border-border bg-neutral w-fit">
                <benefit.icon size={20} />
              </div>
              <span className="text-xs tracking-[0.2em] text-secondary">
                {benefit.index}
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-5 sm:mt-10">
              <span className="text-xl font-medium">{benefit.title}</span>
              <p className="text-tertiary text-sm font-light">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bg-primary text-white p-6 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs tracking-[0.25em] text-accent">
            FREE TO START
          </span>
          <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Create your account in seconds.
          </span>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-3">
          <Link to="/sign-up">
            <Button
              text="SIGN UP FREE"
              icon={<ArrowUpRight size={16} />}
              className="bg-white text-primary py-2 px-5"
            />
          </Link>
          <span className="text-sm text-white/60">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-accent underline underline-offset-2"
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
