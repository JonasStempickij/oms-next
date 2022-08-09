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
    <nav className="flex p-5 justify-between font-semibold max-w-screen-2xl mx-auto ">
      <ul className="flex flex-row gap-5">
        <li className="hover:text-gray-500">
          <Link href="/">Dashboard</Link>
        </li>
        {userId && (
          <li className="hover:text-gray-500">
            <Link href="addJob">Add Job</Link>
          </li>
        )}
      </ul>
      {userId && (
        <button className="hover:text-gray-500" onClick={signOut}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
