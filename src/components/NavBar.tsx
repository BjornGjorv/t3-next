import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import DropDownMenu from "./DropDownMenu";

const NavBar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar bg-primary text-primary-content">
      <section className="flex-1 p-5 pl-5 text-lg font-bold">
        <Link href="/">
          {sessionData?.user?.name
            ? `Notes for ${sessionData.user.name}`
            : "Something went wrong :("}
        </Link>
      </section>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <DropDownMenu />
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
