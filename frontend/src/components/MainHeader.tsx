import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';

export default function MainHeader() {
    console.debug("MainHeader");
    return (
        <>
            <header className="py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 flex border-purple-50 dark:border-purple-950 border-b-2 mb-16">
                <div className="flex w-1/2 sm:w-2/5 md:1/3 lg:1/4 xl:1/5 text-4xl">
                    <Link href="/">
                        <Image className='mx-auto' src="/logo.svg" alt="Logo" width={160} height={160} />
                    </Link>
                    <span className="mt-10 -ml-32 -rotate-45 drop-shadow-md">
                        <div className="animate-bounce">
                            <Link href="/">&nbsp;⌐◨-◨</Link>
                        </div>
                    </span>
                </div>

                <div className="flex flex-row-reverse items-center w-full text-4xl">
                    <ConnectButton />
                </div>
            </header>
        </>
    )
}
