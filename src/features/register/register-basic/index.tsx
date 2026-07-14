import React, { useState } from 'react'
import Github from '../../../../public/assets/media/github'
import Google from '../../../../public/assets/media/google'
import Linkedin from '../../../../public/assets/media/linkedin'
import CheckBox from '#/components/Checkbox'
import Input from '#/components/Input'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../../public/assets'
import { Link } from '@tanstack/react-router'

const RegisterBasic = () => {
  const [agreed, setAgreed] = useState<boolean>(false)
  return (
    <div className="flex items-center justify-center h-screen relative">
      <img
        src={GlassBlob1}
        className="absolute top-14 right-120 -z-10 size-130"
      />

      <img
        src={GlassBlob2}
        className="absolute bottom-10 left-130 -z-10 size-130"
      />
      <div className="card  p-10! w-132.5!  sm:p-10">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Start your free trial — no credit card required
          </p>
        </div>

        <form className="flex flex-col gap-y-4">
          <div className="flex gap-x-3">
            <Input
              label="First name"
              placeholder="Jane"
              id="firstName"
              type="text"
            />
            <Input
              label="Last name"
              placeholder="Doe"
              id="lastName"
              type="text"
            />
          </div>

          <Input
            label="Email"
            placeholder="example@gmail.com"
            id="email"
            type="email"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            id="password"
            type="password"
          />

          <Input
            label="Confirm password"
            placeholder="••••••••"
            id="confirmPassword"
            type="password"
          />

          <label className="flex items-start gap-x-2 text-sm text-muted">
            <CheckBox checked={agreed} onChange={() => setAgreed((a) => !a)} />
            <span className="cursor-pointer">
              I agree to the{' '}
              <a
                href="/terms"
                className="font-medium text-primary hover:underline"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                className="font-medium text-primary hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!agreed}
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link
            to="/login-basic"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>

        <div className="mt-6">
          <div className="flex items-center gap-x-3">
            <div className="h-px flex-1 bg-borderColor" />
            <p className="text-xs text-muted">OR</p>
            <div className="h-px flex-1 bg-borderColor" />
          </div>

          <div className="mt-4 flex items-center justify-center gap-x-3">
            <button type="button" aria-label="Sign up with GitHub">
              <Github />
            </button>
            <button type="button" aria-label="Sign up with Google">
              <Google />
            </button>
            <button type="button" aria-label="Sign up with LinkedIn">
              <Linkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterBasic
