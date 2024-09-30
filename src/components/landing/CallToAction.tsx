// components/CallToAction.tsx

'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState, FormEvent } from 'react';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

const CallToAction: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const { mutate: subscribe, isLoading } = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axios.post('/api/subscribe', { email });
      return data;
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: 'Email already subscribed.',
            description: 'Please use a different email address.',
            variant: 'destructive',
          });
        }
        if (error.response?.status === 400) {
          return toast({
            title: 'Invalid Email.',
            description: 'Please enter a valid email address.',
            variant: 'destructive',
          });
        }
      }
      toast({
        title: 'Subscription Failed.',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Subscribed Successfully!',
        description: 'You have been added to the mailing list.',
        variant: 'default',
      });
      setEmail(''); // Clear the input field
    },
  });

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();

    // Basic front-end email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return toast({
        title: 'Invalid Email.',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
    }

    subscribe(email);
  };

  return (
    <div className={robotoMono.className}>
      <div className="text-center px-4 md:px-[105px] bg-white rounded-lg py-20">
        <div className="h-px bg-gray-300"></div>
        <h2 className="text-2xl font-semibold mb-4 pt-20">Join the Mailing List</h2>
        <p className="text-gray-600 text-lg mb-6 max-w-[900px] mx-auto">
          Once a month, you'll get a short & clear health-related story, insight, or tip.<br/> No fluff.
        </p>
        <form className="flex justify-center mx-auto max-w-[600px]" onSubmit={handleSubscribe}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            required
          />
          <Button
            type="submit"
            variant="default"
            isLoading={isLoading}
            disabled={isLoading || email.length === 0}
            className="px-6 py-2 bg-green-500 text-white font-medium rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-[150px]"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </div>
  );
  
};

export default CallToAction;
