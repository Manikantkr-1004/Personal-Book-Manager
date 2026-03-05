'use client';
import { UserContext } from "@/app/context/UserContext";
import { login } from "@/app/lib/actions/auth";
import { isEmailValid } from "@/app/lib/validation/emailPattern";
import Loader from "@/app/ui/Loader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const initialData = {
  email: '',
  password: '',
}

export default function Login() {

  return (
    <Suspense fallback={<Loader />}>
      <LoginClient />
    </Suspense>
  )
}

function LoginClient() {

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(UserContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const navigate = searchParams.get("redirectTo");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid.test(formData.email)) {
      return toast.error('Invalid email');
    }
    try {
      setLoading(true);
      const response = await login(formData);
      toast.success(response.data.message);
      loginUser(response.data.data.user);
      router.refresh();
      router.replace(navigate || '/');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    } finally {
      setLoading(false)
    }
  }

  console.log(navigate,'----')

  return (
    <main className="w-full px-3 md:px-5 lg:px-10 py-24 md:py-28 2xl:py-32">
      <h2 className="text-2xl text-center font-bold mb-10 text-(--blue-color)">Login User</h2>

      <form onSubmit={handleSubmit} className="w-full animate__animated animate__fadeInUp md:w-80 shadow-none sm:shadow-lg p-3 rounded-lg m-auto flex flex-col gap-5">

        <label className="flex flex-col gap-1">
          Enter Email*
          <input value={formData.email} onChange={handleChange} autoComplete="email" className="w-full border p-1 rounded-md" type="email" name="email" id="email" required />
        </label>

        <label className="flex flex-col gap-1">
          Enter Password*
          <input value={formData.password} onChange={handleChange} autoComplete="current-password" className="w-full border p-1 rounded-md" type="password" minLength={8} name="password" id="password" required />
        </label>

        <button
          disabled={loading}
          className={`w-full ${loading ? 'cursor-not-allowed bg-(--blue-color)/50' : 'bg-(--blue-color) cursor-pointer'} text-white rounded-md font-bold py-2`} type="submit">
          {loading ? <FaSpinner className="animate-spin m-auto" /> : 'Login'}
        </button>

        <p className="text-xs text-center">Have not account? <Link className="text-(--red-color)" href={navigate ? `/auth/signup?redirectTo=${navigate}` : '/auth/register'}>Register now</Link></p>

      </form>
    </main>
  )
}