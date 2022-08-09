import { useState } from 'react';
import { resetPassword } from '../lib/firebase';
import { toast } from 'react-toastify';

export default function Recovery() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
    toast.success('Password recovery link send to you email');
  };

  return (
    <form
      className="flex flex-col mx-auto w-80 items-center gap-2.5 "
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl">Password Recovery</h2>
      <input
        className="p-2.5 w-full border rounded border-gray-400"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="w-full rounded-full bg-violet-600 px-4 py-2 text-white font-semibold ">
        Recover
      </button>
    </form>
  );
}
