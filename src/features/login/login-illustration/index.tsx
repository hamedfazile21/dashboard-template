import React from 'react'
import { GlassBlob, LoginIllustrationSVG } from '../../../../public/assets'

const LoginIllustration = () => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Illustration side */}
      <div className="hidden w-full items-center justify-center bg-surface p-10 lg:flex lg:w-1/2">
        <img src={LoginIllustrationSVG} alt="" className="max-w-md w-full" />
      </div>

      <img src={GlassBlob} className="absolute top-20 right-41.25 -z-10" />

      {/* Form side */}
      <div className="flex w-full items-center justify-center lg:w-1/2 z-10">
        <div className="card w-132.5! p-10!">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-muted">
              Sign in to your account to continue
            </p>
          </div>

          <form className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input"
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="input"
              />
            </div>

            <label className="flex items-center gap-x-2 text-sm text-muted">
              <input type="checkbox" className="checkbox" />
              Remember me
            </label>

            <button type="submit" className="btn btn-primary mt-2">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginIllustration
