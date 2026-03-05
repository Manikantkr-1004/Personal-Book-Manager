import Link from 'next/link';
import 'animate.css';

export default function Home() {

    return (
        <section className='w-full min-h-screen px-3 md:px-5 lg:px-10'>
            <div className="fixed-max-width h-full relative m-auto text-center py-24 md:py-28 2xl:py-32 flex flex-col items-center gap-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-bg font-bold md:font-extrabold pb-1.5 text-(--blue-color) animate__animated animate__zoomInDown">
                    Personal Book Manager for Your Reading Journey
                </h1>

                <p className="text-(--red-color)/80 text-lg md:text-xl font-normal md:font-bold max-w-2xl animate__animated animate__slideInDown">
                    Your personal book manager designed to enhance your reading journey. You can effortlessly organize your book collection, track your reading progress, and update your reading status.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link href="/user/profile" className="bg-(--red-color) text-white px-6 py-3 rounded-lg font-semibold hover:bg-(--blue-color) animate__animated animate__fadeInRight">
                        View Profile
                    </Link>
                </div>

                <p className="absolute animate-pulse bottom-[20%] left-0 xl:left-1/7 text-4xl sm:text-8xl rotate-12">📔</p>
                <p className="absolute animate-pulse bottom-[60%] sm:bottom-1/4 right-0 xl:right-1/7 text-5xl sm:text-8xl -rotate-12">✨</p>
            </div>
        </section>
    )
}