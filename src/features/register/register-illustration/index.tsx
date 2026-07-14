import React, { useState } from 'react'
import Github from '../../../../public/assets/media/github'
import Google from '../../../../public/assets/media/google'
import Linkedin from '../../../../public/assets/media/linkedin'
import LoginIllustrationSVGComponents from '../../../../public/assets/illustration/LoginIllustration'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../../public/assets'
import Input from '#/components/Input'
import CheckBox from '#/components/Checkbox'
import { Link } from '@tanstack/react-router'
import RegisterIllustrationComponent from '../../../../public/assets/illustration/RegisterIllustration'

const RegisterIllustration = () => {
  const [agreed, setAgreed] = useState<boolean>(false)

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden items-center justify-center lg:flex-row lg:items-stretch">
      {/* Decorative blobs */}
      <img
        src={GlassBlob1}
        alt=""
        className="pointer-events-none absolute -top-10 right-[10%] -z-10 size-112 opacity-80 dark:opacity-40"
      />
      <img
        src={GlassBlob2}
        alt=""
        className="pointer-events-none absolute -bottom-16 right-[20%] -z-10 size-112 opacity-70 dark:opacity-30"
      />
      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none absolute top-1/3 right-[35%] -z-10 size-96 opacity-60 dark:opacity-25"
      />

      {/* Illustration side */}
      <div className="hidden w-1/2 items-center justify-center bg-surface/60 p-10 dark:bg-black/20 lg:flex">
        <RegisterIllustrationComponent className="text-primary w-full max-w-md" />
      </div>

      {/* Form side */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 lg:w-1/2">
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
              <CheckBox
                checked={agreed}
                onChange={() => setAgreed((a) => !a)}
              />
              <span>
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
              to="/login-illustration"
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
              <button
                type="button"
                aria-label="Sign up with GitHub"
               
              >
                <Github />
              </button>
              <button
                type="button"
                aria-label="Sign up with Google"
               
              >
                <Google />
              </button>
              <button
                type="button"
                aria-label="Sign up with LinkedIn"
               
              >
                <Linkedin />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterIllustration
