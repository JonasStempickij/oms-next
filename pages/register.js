import { useState } from 'react';
import { createUser } from '../lib/firebase';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const userCredential = await createUser(email, password);
      console.log(userCredential);
    }
  };

  return (
    <form
      className="flex flex-col mx-auto w-80 items-center gap-2.5 "
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl">Register</h2>
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
      <input
        className="p-2.5 w-full border rounded border-gray-400"
        type="password"
        name="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        required
        onChange={(e) => {
          setRepeatPassword(e.target.value);
        }}
      />
      <button className="w-full rounded-full bg-violet-600 px-4 py-2 text-white font-semibold ">
        Submit
      </button>

      <Link href="/login">Already have an account ? Click Here </Link>
    </form>
  );
}
