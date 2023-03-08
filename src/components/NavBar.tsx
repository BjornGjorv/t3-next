import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
    const { data: sessionData } = useSession();

    return (
        <nav className="navbar bg-primary text-primary-content">
            <section className="flex-1 pl-5 p-5 text-lg font-bold">
                {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : "Something went wrong :("}
            </section>
        </nav>
        
    )

}

export default NavBar;