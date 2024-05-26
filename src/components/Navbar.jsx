import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white p-4 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h3 className="text-3xl">NextMySQL</h3>
        </Link>
        <ul>
          <li className="text-sky-500 hover:text-sky-300">
            <Link href={"/new"}>New</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
