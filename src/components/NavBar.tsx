import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import LogoSVG from "~/icons/logoSVG";
import DropDownMenu from "./DropDownMenu";

const NavBar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar bg-base-100 p-7">
      <section className="flex-1 font-bold">
        <div className="mr-3 h-16 w-16 pt-2">
          <LogoSVG />
        </div>
        <Link href="/" className="text-focus text-4xl">
          byteBrew
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
