"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/AceInput"
import { cn } from "@/lib/utils"
import { useAuth } from '@/lib/authClient'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

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
    selectedLeaderboards: [] as string[], // New field
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target

    if (type === 'checkbox') {
      setFormData(prev => {
        const updatedLeaderboards = checked
          ? [...prev.selectedLeaderboards, value]
          : prev.selectedLeaderboards.filter(lb => lb !== value)
        return { ...prev, selectedLeaderboards: updatedLeaderboards }
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value,
      }))

      if (id === 'confirmEmail' || id === 'email') {
        if (id === 'confirmEmail' && value !== formData.email) {
          setError('Emails do not match')
        } else if (id === 'email' && formData.confirmEmail && value !== formData.confirmEmail) {
          setError('Emails do not match')
        } else {
          setError(null)
        }
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

    if (formData.selectedLeaderboards.length === 0) {
      setError('Please select at least one leaderboard to join')
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

      // Call the onSuccess callback
      onSuccess()

      // Show success toast
      toast({
        title: 'Success!',
        description: 'We are in the process of approving your request!',
      })
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={robotoMono.className}>
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-2 md:p-6 bg-white mb-[-20px]">
      <h2 className="font-bold text-xl text-neutral-800">
        Welcome to Leaderboard!
      </h2>
      <p className="text-neutral-600 text-sm mt-2">
        Fill out the information below and click submit to join the leaderboard. You can expect to be approved within a week.
      </p>

      <form id="joinForm" className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
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
            <Label htmlFor="lastName">Last Name</Label>
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

        {/* New Section: Select Leaderboards to Join */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-neutral-800 mb-2">Select leaderboards to join</h3>
          <div className="flex flex-col space-y-2">
            <Checkbox
              label="Social Media Leaderboard"
              value="Social Media Leaderboard"
              checked={formData.selectedLeaderboards.includes("Social Media Leaderboard")}
              onChange={handleInputChange}
            />
            <Checkbox
              label="Dudedin Pace Leaderboard"
              value="Dudedin Pace Leaderboard"
              checked={formData.selectedLeaderboards.includes("Dudedin Pace Leaderboard")}
              onChange={handleInputChange}
            />
            <Checkbox
              label="Community Voted Leaderboard"
              value="Community Voted Leaderboard"
              checked={formData.selectedLeaderboards.includes("Community Voted Leaderboard")}
              onChange={handleInputChange}
            />
          </div>
        </div>

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
    </div>
  )
}

interface LabelInputContainerProps {
  children: React.ReactNode
  className?: string
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  )
}

// Updated Checkbox Component with green accent
interface CheckboxProps {
  label: string
  value: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 accent-green-600" // Updated class here
      />
      <span className="ml-2 text-neutral-700">{label}</span>
    </label>
  )
}
