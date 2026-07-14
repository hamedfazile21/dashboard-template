import CheckBox from '#/components/Checkbox'
import Input from '#/components/Input'
import React, { useState } from 'react'
import Github from '../../../../public/assets/media/github'
import Google from '../../../../public/assets/media/google'
import Linkedin from '../../../../public/assets/media/linkedin'
import { useTranslation } from 'react-i18next'
import { GlassBlob1, GlassBlob2 } from '../../../../public/assets'
import { Link } from '@tanstack/react-router'

const LoginBasic = () => {
  const { t } = useTranslation()
  const [check, setCheck] = useState<boolean>(false)
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <img
        src={GlassBlob1}
        className="absolute top-14 left-137.5 -z-10 size-130"
      />

      <img
        src={GlassBlob2}
        className="absolute bottom-12 left-212.5 -z-10 size-130"
      />
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
            <Input
              label={t('Email')}
              placeholder="example@gmail.com"
              id="email"
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
            <div className="relative w-full">
              <Input placeholder="••••••••" id="email" type="password" />
            </div>
          </div>

          <label className="flex items-center gap-x-2 text-sm text-muted">
            <CheckBox checked={check} onChange={() => setCheck(!check)} />
            Remember me
          </label>

          <button type="submit" className="btn btn-primary mt-2">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{' '}
          <Link
            to="/register-basic"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
        <div className="mt-6 relative">
          <div className="flex items-center gap-x-3">
            <div className="h-px flex-1 bg-borderColor" />
            <p className="text-xs text-muted">OR</p>
            <div className="h-px flex-1 bg-borderColor" />
          </div>
          <div className="flex items-center justify-center gap-x-4 mt-1">
            <button>
              <Github />
            </button>
            <button>
              <Google />
            </button>
            <button>
              <Linkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginBasic
