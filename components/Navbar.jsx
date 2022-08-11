import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = useSelector((state) => state.authState);

  const signOut = () => {
    dispatch(signOutUser());
    router.push('/login');
  };

  return (
    <nav className="bg-zinc-200 mb-5">
      <div className="container flex  justify-between  font-medium  mx-auto ">
        <ul className="flex flex-row ">
          <Link href="/">
            <li className="cursor-pointer px-10 py-5 hover:text-gray-500 hover:bg-zinc-100">
              Dashboard
            </li>
          </Link>
          {userId && (
            <Link href="/addJob">
              <li className="cursor-pointer px-10 py-5 hover:text-gray-500 hover:bg-zinc-100">
                Add Job
              </li>
            </Link>
          )}
        </ul>
        {userId && (
          <button
            className="cursor-pointer p-5 hover:text-gray-500 hover:bg-zinc-100"
            onClick={signOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
