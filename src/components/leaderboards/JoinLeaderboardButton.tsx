// components/JoinLeaderboardButton.tsx
'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { JoinForm } from './JoinForm';
import { X } from 'lucide-react'

interface JoinLeaderboardButtonProps {
  isUserLoggedIn: boolean;
}

const JoinLeaderboardButton: React.FC<JoinLeaderboardButtonProps> = ({ isUserLoggedIn }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isUserLoggedIn) {
    return (
      <Link href="/sign-in">
        <div className="flex items-center justify-center h-8 rounded-md text-center bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 w-full mb-4 cursor-pointer">
          Sign In To Join
        </div>
      </Link>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button
          className={buttonVariants({
            variant: 'outline',
            className: 'w-full mb-6',
          })}
        >
          Join Leaderboard
        </button>
      </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogDescription>
          <AlertDialogCancel className="absolute top-4 right-4 h-">
            <X
              size={20}
              aria-label="Close"
              className="cursor-pointer h-4 w-4"
            />
          </AlertDialogCancel>
            <JoinForm onSuccess={handleClose} />
          </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JoinLeaderboardButton;
