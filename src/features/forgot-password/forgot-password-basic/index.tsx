import { useState } from 'react'
import { ArrowLeft, Mail, MailCheck } from 'lucide-react'
import Input from '#/components/Input'
import { GlassBlob, GlassBlob2, GlassBlob3 } from '../../../../public/assets'
import { showObjectToast } from '#/helper/toast-helper'

function ForgotPasswordBasic() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Email is required')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email')
      return
    }
    setError('')
    setSubmitting(true)
    // await api.sendResetLink(email)
    setSubmitting(false)
    setSent(true)
    showObjectToast('Login From Submitted', { email })
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6">
      {/* Decorative blobs, same background treatment as the login-illustration page */}
      <img
        src={GlassBlob2}
        alt=""
        className="pointer-events-none absolute -top-20 -left-20 -z-10 size-128 opacity-70 dark:opacity-30"
      />
      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none absolute bottom-50 right-180 -z-10 size-128 opacity-60 dark:opacity-25"
      />
      <img
        src={GlassBlob3}
        alt=""
        className="pointer-events-none absolute -bottom-24 -right-16 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      <div className="card w-full max-w-sm p-10">
        <a
          href="/login"
          className="mb-6 inline-flex items-center gap-x-1.5 text-sm font-medium text-muted hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </a>

        {!sent ? (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Mail size={22} />
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                Forgot your password?
              </h1>
              <p className="mt-1 text-sm text-muted">
                Enter the email linked to your account and we'll send you a
                reset link.
              </p>
            </div>

            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                error={error}
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary mt-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MailCheck size={26} />
            </div>
            <h1 className="mt-4 text-xl font-semibold text-foreground">
              Check your inbox
            </h1>
            <p className="mt-2 max-w-xs text-sm text-muted">
              We sent a password reset link to{' '}
              <span className="font-medium text-foreground">{email}</span>.
              It'll expire in 15 minutes.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-xs font-medium text-primary hover:underline"
            >
              Didn't get it? Try a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordBasic
