import { signIn, signOut, useSession } from "next-auth/react";
import DropDownMenu from "./DropDownMenu";

const NavBar = () => {
    const { data: sessionData } = useSession();

    return (
        <nav className="navbar bg-primary text-primary-content">
            <section className="flex-1 pl-5 p-5 text-lg font-bold">
                {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : "Something went wrong :("}
            </section>
            <div className="flex-none gap-2">
                <div className="dropdown-end dropdown">
                {sessionData?.user ? (
                  <DropDownMenu/>
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
        
    )

}

export default NavBar;