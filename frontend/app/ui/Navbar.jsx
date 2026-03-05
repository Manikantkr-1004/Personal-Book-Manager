'use client';
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { UserContext } from "../context/UserContext";
import { logout } from "../lib/actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const { user, logoutUser } = useContext(UserContext);

    const [openBox, setOpenBox] = useState(false);
    const [profileBox, setProfileBox] = useState(false);

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(loading) return;

        try {
            setLoading(true);
            const response = await logout();
            toast.success(response.data.message);
            logoutUser();
            setProfileBox(false);
            router.refresh();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <header className="w-full shadow flex justify-between items-center gap-5 py-2 px-2 md:px-5 fixed top-0 z-999 bg-transparent backdrop-blur-lg">
            <Link href={'/'}>
                <h1 className="text-xl sm:text-2xl font-extrabold text-(--blue-color)">BookManager</h1>
            </Link>
            <nav className="flex justify-between items-center gap-4 md:gap-5 text-(--dark-color) font-medium">
                {
                    !user.isLoggedIn && (
                        <>
                            <Link className="hidden md:block hover:text-(--red-color)" href={'/auth/login'}>Login</Link>
                            <Link className="hidden md:block hover:text-(--red-color)" href={'/auth/signup'}>Register</Link>
                            <button className="cursor-pointer hover:text-(--light-color) md:hidden relative" onClick={() => setOpenBox(!openBox)}>
                                <CiMenuKebab size={24} />
                                {openBox &&
                                    <div className="absolute top-8 right-2 w-30 p-2 bg-white text-(--dark-color) rounded-md flex flex-col justify-start items-start gap-2 border border-slate-300">
                                        <Link className="w-full text-left hover:text-(--light-color)" href={'/auth/login'}>Login</Link>
                                        <Link className="w-full text-left hover:text-(--light-color)" href={'/auth/signup'}>Register</Link>
                                    </div>}
                            </button>
                        </>
                    )
                }
                {
                    user.isLoggedIn && (
                        <>
                            <Link className="hidden md:block hover:text-(--red-color)" href={'/user/profile'}>Profile</Link>
                            <Link className="hidden md:block hover:text-(--red-color)" href={'/user/dashboard'}>Dashboard</Link>
                            <button title={user?.name ?? "User"} className="relative" onClick={() => setProfileBox(!profileBox)}>
                                <div className="w-8.5 h-8.5 cursor-pointer overflow-hidden rounded-full bg-white border-2 hover:border-(--light-color) border-(--dark-color)">
                                    {user?.image && <Image className="w-full h-full object-cover" src={user?.image} alt="user-icon" width={30} height={30} />}
                                </div>
                                {profileBox &&
                                    <div className="absolute top-10 right-2 w-30 p-2 bg-white text-(--dark-color) rounded-md flex flex-col justify-start items-start gap-2 border border-slate-300">
                                        <p className="text-sm w-full truncate">{user?.name}</p>
                                        <p className="text-xs w-full truncate">{user?.email}</p>
                                        <Link className="md:hidden w-full text-left hover:text-(--red-color)" href={'/user/profile'}>Profile</Link>
                                        <Link className="md:hidden w-full text-left hover:text-(--red-color)" href={'/user/dashboard'}>Dashboard</Link>
                                        <div onClick={handleLogout} disabled={loading}
                                        className="w-full rounded-md bg-red-500 text-white text-sm py-1.5 cursor-pointer">{loading ? '...':'Logout'}</div>
                                    </div>}
                            </button>
                        </>
                    )
                }

            </nav>
        </header>
    )
}