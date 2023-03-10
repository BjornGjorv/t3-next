import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import LogoRobotSVG from "~/icons/LogoRobotSVG";
import DropDownMenu from "./DropDownMenu";
import { useAtom } from "jotai";
import { globalStateAtom } from "~/state/globalState";

const NavBar = () => {
  const { data: sessionData } = useSession();
  const [globalState] = useAtom(globalStateAtom);
  const logoArray = [
    "Brew",
    "Bro",
    "Brawl",
    "Bruh",
    "Bring",
    "Bringer",
    "Bong",
    "Bing",
    "Bangs",
    "Bank",
    "Bingo",
    "Master",
  ];

  return (
    <nav className="navbar bg-base-100 p-7">
      <section className="flex-1 font-bold">
        <Link
          href="/"
          className="text-focus flex flex-row items-center justify-center text-4xl"
        >
          <div className="mr-2 ">
            <LogoRobotSVG />
          </div>
          <p>
            byte
            {globalState ? logoArray[globalState % logoArray.length] : "Brew"}
          </p>
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
