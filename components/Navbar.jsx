import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-5 border-b-2 mb-4">
      <div className="flex">
        <ul className="flex gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="addJob">Add Job</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
