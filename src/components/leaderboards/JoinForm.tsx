"use client"
import React, { useState } from "react"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/AceInput"
import { cn } from "@/lib/utils"
import { useAuth } from '@/lib/authClient'
import { useRouter } from 'next/navigation'

interface JoinFormProps {
  onSuccess: () => void
}

export function JoinForm({ onSuccess }: JoinFormProps) {
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    confirmEmail: user?.email || '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))

    if (e.target.id === 'confirmEmail' || e.target.id === 'email') {
      if (e.target.value !== formData.email && e.target.id === 'confirmEmail') {
        setError('Emails do not match')
      } else if (formData.confirmEmail && e.target.id === 'email' && e.target.value !== formData.confirmEmail) {
        setError('Emails do not match')
      } else {
        setError(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    if (formData.email !== formData.confirmEmail) {
      setError('Emails do not match')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/join-leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'An error occurred')
        setIsSubmitting(false)
        return
      }


      onSuccess()
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-2 md:p-6 bg-white mb-[-20px]">
      <h2 className="font-bold text-xl text-neutral-800">
        Welcome to Stacks
      </h2>
      <p className="text-neutral-600 text-sm mt-2">
        We're excited to have you on board. Fill out the information below and press submit to join the leaderboard.
      </p>

      <form id="joinForm" className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Bryan"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Johnson"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="bryanJohnson@gmail.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="confirmEmail">Confirm Your Email Address</Label>
          <Input
            id="confirmEmail"
            placeholder="bryanJohnson@gmail.com"
            type="email"
            value={formData.confirmEmail}
            onChange={handleInputChange}
            required
          />
        </LabelInputContainer>

        {/* Display validation errors */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 w-full text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  )
}
