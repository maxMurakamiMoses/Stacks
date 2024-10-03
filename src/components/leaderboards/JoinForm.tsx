"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/AceInput";
import { cn } from "@/lib/utils";
import { useAuth } from '@/lib/authClient'

export function JoinForm() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with options:", selectedOptions);
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-2 md:p-6 bg-white">
      <h2 className="font-bold text-xl text-neutral-800">
        Welcome to Stacks
      </h2>
      <p className="text-neutral-600 text-sm mt-2">
        We're excited to have you on board. Fill out the information below and press submit to join the leaderboard.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Bryan" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Johnson" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="bryanJohson@gmail.com" type="email" defaultValue={user?.email || ''} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="confirmEmail">Confirm Your Email Address</Label>
          <Input id="confirmEmail" placeholder="bryanJohson@gmail.com" type="email" defaultValue={user?.email || ''} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label>Which Leaderboard do you wish to join? (Select all)</Label>
          <div className="flex flex-col space-y-3 pt-4">
            <Checkbox
              id="option1"
              label='Dudedin Pace Leaderboard'
              checked={selectedOptions.includes('Dudedin Pace Leaderboard')}
              onChange={() => handleCheckboxChange('Dudedin Pace Leaderboard')}
            />
            <Checkbox
              id="option2"
              label='Social Media Leaderboard'
              checked={selectedOptions.includes('Social Media Leaderboard')}
              onChange={() => handleCheckboxChange('Social Media Leaderboard')}
            />
            <Checkbox
              id="option3"
              label='Community Voted Leaderboard'
              checked={selectedOptions.includes('Community Voted Leaderboard')}
              onChange={() => handleCheckboxChange('Community Voted Leaderboard')}
            />
          </div>
        </LabelInputContainer>
      </form>
    </div>
  );
}

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-green-600 border-gray-300 rounded focus:ring-green-500"
      />
      <Label htmlFor={id} className="ml-2">
        {label}
      </Label>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
