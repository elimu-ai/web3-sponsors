import Image from "next/image";
import Link from "next/link";

export default function Header() {
    console.log("Header");
    return (
        <header className="p-8 text-4xl flex justify-center w-full border-purple-950 border-b-2">
            <Link href="/">
                <Image className='mx-auto' src="/logo.svg" alt="Logo" width={160} height={160} />
            </Link>
            <span className="mt-10 -ml-32 -rotate-45 drop-shadow-md">
                <div className="animate-bounce">
                    <Link href="/">&nbsp;⌐◨-◨</Link>
                </div>
            </span>
        </header>
    )
}
