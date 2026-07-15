import React, { useState } from 'react'
import Github from '../../../../public/assets/media/github'
import Google from '../../../../public/assets/media/google'
import Linkedin from '../../../../public/assets/media/linkedin'
import CheckBox from '#/components/Checkbox'
import Input from '#/components/Input'
import {GlassBlob1, GlassBlob2 } from '../../../../public/assets'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import { showObjectToast } from '#/helper/toast-helper'

interface RegisterForm {
  fist_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
  agreement: boolean
}

const RegisterBasic = () => {
  const {t} = useTranslation()
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      fist_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      agreement: false,
    } as RegisterForm,
    onSubmit: async ({ value }) => {
      showObjectToast('Register From Submitted', value)
    },
  })
  return (
    <div className="flex items-center justify-center h-screen relative">
      <img
        src={GlassBlob1}
        className="hidden md:block absolute top-14 md:right-80 lg:right-120 -z-10 size-130"
      />

      <img
        src={GlassBlob2}
        className="hidden md:block absolute bottom-10 md:left-60 lg:left-130 -z-10 size-130"
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

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="flex flex-col gap-y-4"
        >
          <div className="flex gap-x-3">
            <Field
              name="fist_name"
              children={(field) => (
                <Input
                  label="First name"
                  placeholder="Hamed"
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  type="text"
                />
              )}
            />

            <Field
              name="last_name"
              children={(field) => (
                <Input
                  label="Last name"
                  placeholder="Fazeli"
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  type="text"
                />
              )}
            />
          </div>

          <Field
            name="email"
            validators={{
              onSubmit: ({ value }) =>
                !value
                  ? 'Email is required'
                  : !/^\S+@\S+\.\S+$/.test(value)
                    ? 'Enter a valid email'
                    : undefined,
            }}
            children={(field) => (
              <div className="flex flex-col gap-y-1.5">
                <Input
                  label={t('Email')}
                  placeholder="example@gmail.com"
                  id={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }
                />
              </div>
            )}
          />

          <Field
            name="password"
            validators={{
              onSubmit: ({ value }) =>
                !value ? 'Password is required' : undefined,
            }}
            children={(field) => (
              <Input
                label="Password"
                placeholder="••••••••"
                id={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                type="password"
              />
            )}
          />

          <Field
            name="confirm_password"
            validators={{
              onSubmit: ({ value }) =>
                !value ? 'Password is required' : undefined,
            }}
            children={(field) => (
              <Input
                label="Confirm password"
                placeholder="••••••••"
                id={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                type="password"
              />
            )}
          />

          <Field
            name="agreement"
            children={(field) => (
              <label className="flex items-start gap-x-2 text-sm text-muted">
                <CheckBox
                  checked={field.state.value}
                  onChange={() => field.handleChange(!field.state.value)}
                />
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
            )}
          />

          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={false}
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link
            to="/login-cover"
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
