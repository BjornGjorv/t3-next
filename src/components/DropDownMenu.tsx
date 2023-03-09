import { Menu, Transition } from "@headlessui/react";
import { signIn, useSession, signOut } from "next-auth/react";

function DropDownMenu() {
    const {data: sessionData} = useSession();
    return (
        <Menu>
            <Menu.Button>{sessionData?.user ? (
                    <label
                    tabIndex={0}
                    className="btn-ghost btn-circle avatar btn"
                    onClick={() => {console.log("clicked selfportrait, you ego person")}}
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
            </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-violet-400 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => void signOut()}
                            >
                                Sign out
                            </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
        </Menu>
    )
}
export default DropDownMenu;