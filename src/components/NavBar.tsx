import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import LogoPirateSVG from "~/icons/LogoPirateSVG";
import LogoRobotSVG from "~/icons/LogoRobotSVG";
import LogoSkierSVG from "~/icons/LogoSkierSVG";
import DropDownMenu from "./DropDownMenu";

const NavBar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar bg-base-100 p-7">
      <section className="flex-1 font-bold">
        {/* <div className="mr-3 h-16 w-16 pt-2"><LogoSVG /></div> */}
        {/* <div className="mr-2 h-16 w-16">
          <LogoPirateSVG />
        </div> */}
        <Link
          href="/"
          className="text-focus flex flex-row items-center justify-center text-4xl"
        >
          <div className="mr-2 ">
            <LogoRobotSVG />
          </div>
          <p>byteBrew</p>
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
