import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { UserAccountNav } from './UserAccountNav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-2 right-4 z-30">
      {session?.user ? (
        <div className="relative left-[-20px] top-[20px]">
          <UserAccountNav user={session.user} />
        </div>
      ) : (
        <div className="bg-white rounded-[28px] p-6 lg:block hidden">
          <Link href='/sign-in'>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
