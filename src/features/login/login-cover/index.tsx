import React, { useState } from 'react'
import {
  Avatar1,
  Avatar2,
  Avatar3,
  GlassBlob,
  GlassBlob1,
  GlassBlob2,
  LoginCoverPNG,
} from '../../../../public/assets'
import Input from '#/components/Input'
import CheckBox from '#/components/Checkbox'
import Github from '../../../../public/assets/media/github'
import Google from '../../../../public/assets/media/google'
import Linkedin from '../../../../public/assets/media/linkedin'
import { useTranslation } from 'react-i18next'

const LoginCover = () => {
  const { t } = useTranslation()
  const [check, setCheck] = useState<boolean>(false)

  return (
    <div className="w-full h-screen flex items-center justify-between relative">
      <img
        src={GlassBlob1}
        className="absolute top-14 left-30 -z-10 size-130"
      />
      {/* 
      <img
        src={GlassBlob2}
        className="absolute bottom-12 left-20 -z-10 size-130"
      /> */}
      <img
        src={GlassBlob}
        className="absolute bottom-12 left-50 -z-10 size-130"
      />

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
            <a
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </a>
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
      <div className="relative flex h-screen w-[45%] items-center justify-center overflow-hidden p-10">
        <img
          src={LoginCoverPNG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* subtle dark overlay so the glass card has enough contrast against varied cover images */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="card relative z-10 w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Manage everything, in one place
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Track projects, collaborate with your team, and stay on top of what
            matters — all from a single dashboard built for speed.
          </p>

          <div className="mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
            <div className="flex -space-x-2">
              <img
                src={Avatar1}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
              <img
                src={Avatar2}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
              <img
                src={Avatar3}
                alt=""
                className="size-8 rounded-full border-2 border-borderColor bg-surface"
              />
            </div>
            <p className="text-xs text-muted">
              Trusted by{' '}
              <span className="font-semibold text-foreground">4,000+</span>{' '}
              teams worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginCover
