import { cookies } from 'next/headers';
import { formateIndiaTime } from "@/app/lib/formateTime";
import Image from "next/image";
import Link from "next/link";
import { FaDatabase, FaPen } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { notFound } from 'next/navigation'
import { cache } from 'react'; 

const getUser = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
    headers: {
      cookie: `auth-token=${token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const data = await response.json();
  return data?.data;
});

export async function generateMetadata (){
  const user = await getUser();
  return {
    title: user.name + ' | Profile'
  }
}

export default async function UserProfile() {
  const user = await getUser();
  if(!user){
    notFound();
  }

  return (
    <main className="w-full px-3 md:px-5 lg:px-10">
      <div className="w-full py-16 md:py-28 2xl:py-32">
        <div className="w-36 h-36 m-auto border-3 border-(--blue-color) bg-white rounded-full overflow-hidden">
          {user?.image && (
            <Image className="bg-(--light-color) w-full h-full object-cover" src={user.image} alt={user.name ?? 'user'} width={200} height={200} />
          )}
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
          <div className="p-2 border border-(--blue-color) min-w-40 w-full sm:w-auto bg-slate-50 rounded-md">
            <p className="text-(--blue-color) font-semibold flex items-center gap-2"><FaPen /> Full Name</p>
            <p className="text-sm">{user?.name}</p>
          </div>
          <div className="p-2 border border-(--blue-color) min-w-40 w-full sm:w-auto bg-slate-50 rounded-md">
            <p className="text-(--blue-color) font-semibold flex items-center gap-2"><MdEmail size={21} /> Your Email</p>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <div className="p-2 border border-(--blue-color) min-w-40 w-full sm:w-auto bg-slate-50 rounded-md">
            <p className="text-(--blue-color) font-semibold flex items-center gap-2"><FaDatabase /> Unique Id</p>
            <p className="text-sm">{user?._id}</p>
          </div>
          <div className="p-2 border border-(--blue-color) min-w-40 w-full sm:w-auto bg-slate-50 rounded-md">
            <p className="text-(--blue-color) font-semibold flex items-center gap-2"><IoIosTime size={21} /> Account Created</p>
            <p className="text-sm">{formateIndiaTime(user?.createdAt)}</p>
          </div>
        </div>
        <div className="w-full my-4 flex flex-wrap justify-center items-center gap-2">
          <Link className="py-2 px-5 w-full sm:w-auto rounded-md bg-(--blue-color) hover:bg-(--red-color) text-white font-semibold" href={'/user/dashboard'}>Go to Dashboard</Link>
        </div>
      </div>
    </main>
  );
}