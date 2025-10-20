import Distributions from "@/components/Distributions";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import SponsorshipSummary from "@/components/SponsorshipSummary";
import Sponsorships from "@/components/Sponsorships";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  console.debug("Home");
  return (
    <>
      <Head>
          <title>Sponsors 🫶🏽</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap" rel="stylesheet" />
      </Head>
      <MainHeader />
      <main
        className={`flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64`}
        >
        <h1 className="relative flex place-items-center text-8xl">
          Sponsors 🫶🏽
        </h1>

        <div className="text-4xl mt-8">
          Sponsor the education of one individual child
        </div>

        <Link href="/sponsorships/add" className="mt-8 shadow-lg shadow-purple-500/100">
          <button className="p-8 text-2xl bg-purple-200 dark:bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
            Become a Sponsor <span className="animate-pulse">💜</span>
          </button>
        </Link>

        <Link href="/distributions/add" className="mt-8 shadow-lg shadow-indigo-500/100">
          <button className="p-8 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
            Become a Distributor <span>🛵💨</span>
          </button>
        </Link>

        <div id="steps" className="mt-16 p-8 flex flex-col space-y-8 border-4 border-purple-50 dark:border-purple-950 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl">Step 1 - Sponsor sends 0.0001 ETH</h2>
            <Image src="/step1.avif" alt="Step 1" className="rounded-lg mt-4" width={160} height={0} />
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl">Step 2 - Distributor purchases device,<br />
            installs learning software, transports device</h2>
            <Image src="/step2.jpg" alt="Step 2" className="rounded-lg mt-4" width={240} height={0} />
          </div>
          
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl">Step 3 - Child receives learning device</h2>
            <Image src="/step3.jpg" alt="Step 3" className="rounded-lg mt-4" width={320} height={0} />
          </div>
        </div>

        <h2 className="mt-16 text-4xl">
          Sponsorship Queue:
        </h2>

        <div className="mt-16 grid space-x-4 space-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Sponsorships />
        </div>

        <h2 className="mt-16 text-4xl">
          Distribution Queue:
        </h2>

        <div className="mt-16 grid space-x-4 space-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Distributions />
        </div>
      </main>
      <MainFooter />
    </>
  );
}
