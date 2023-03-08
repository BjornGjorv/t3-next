import { signIn, signOut, useSession } from "next-auth/react";

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
                    <label
                    tabIndex={0}
                    className="btn-ghost btn-circle avatar btn"
                    onClick={() => {console.log("clicked selfportrait")}}
                    >
                    <div className="w-10 rounded-full">
                        <img
                        src={sessionData?.user?.image ?? ""}
                        alt={sessionData?.user?.name ?? ""}
                        />
                    </div>
                    </label>
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