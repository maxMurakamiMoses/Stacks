// components/JoinLeaderboardButton.tsx
'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

interface JoinLeaderboardButtonProps {
  isUserLoggedIn: boolean;
}

const JoinLeaderboardButton: React.FC<JoinLeaderboardButtonProps> = ({ isUserLoggedIn }) => {
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
    <AlertDialog>
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
        <AlertDialogHeader>
          <AlertDialogTitle>Join the Leaderboard</AlertDialogTitle>
          <AlertDialogDescription>
            {/* Placeholder content */}
            <p>This is where your custom form will go.</p>
            {/* You can replace the above line with your actual form components */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JoinLeaderboardButton;
