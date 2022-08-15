import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userId, isError, errorMessage } = useSelector(
    (state) => state.authState
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (userId) router.push('/');
  }, [isError, errorMessage, userId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col mx-auto w-80 items-center gap-2.5 "
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl">Login</h2>
      <input
        className="p-2.5 w-full border rounded border-gray-400"
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="p-2.5 w-full border rounded border-gray-400"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="w-full rounded-full bg-violet-600 px-4 py-2 text-white font-semibold ">
        Login
      </button>
    </form>
  );
}
