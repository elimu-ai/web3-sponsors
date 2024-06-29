import Image from "next/image";
import Link from "next/link";

export default function Home() {
  console.debug("Home");
  return (
    <main
      className={`flex flex-col items-center justify-between p-24`}
    >
      <h1 className="relative flex place-items-center text-8xl">
        Sponsors 🫶🏽
      </h1>

      <div className="text-4xl mt-8">
        Sponsor the education of one individual child
      </div>

      <div id="steps" className="mt-16 p-8 flex flex-col space-y-8 border-4 border-purple-950 rounded-lg">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl">Step 1 - Sponsor sends 0.02 ETH</h2>
          <Image src="/step1.avif" alt="Step 1" className="rounded-lg mt-4" width={160} height={160} />
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl">Step 2 - Distributor purchases device,<br />
          installs learning software, transports device</h2>
          <Image src="/step2.jpg" alt="Step 2" className="rounded-lg mt-4" width={240} height={240} />
        </div>
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl">Step 3 - Child receives learning device</h2>
          <Image src="/step3.jpg" alt="Step 3" className="rounded-lg mt-4" width={320} height={320} />
        </div>
      </div>

      <h2 className="mt-16 text-4xl">
        Sponsorship Queue:
      </h2>

      <div className="mt-16 grid space-x-4 space-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link href="/sponsorships/0">
          <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
            Sponsorship [0]
          </div>
        </Link>

        <Link href="/sponsorships/1">
          <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
            Sponsorship [1]
          </div>
        </Link>

        <Link href="/sponsorships/2">
          <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
            Sponsorship [2]
          </div>
        </Link>

        <Link href="/sponsorships/3">
          <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
            Sponsorship [3]
          </div>
        </Link>
      </div>
    </main>
  );
}
