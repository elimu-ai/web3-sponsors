import Image from "next/image";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="relative flex place-items-center text-8xl">
        Sponsors 🫶🏽
      </div>

      <div className="text-4xl mt-8">
        Sponsor the education of one individual child
      </div>

      <div id="steps" className="mt-16 p-8 border-4 border-purple-950 rounded-lg">
        <h2 className="text-2xl">Step 1 - Sponsor sends 0.02 ETH</h2>
        <Image src="/step1.avif" alt="Step 1" className="rounded-lg" width={160} height={160} />
        <br />

        <h2 className="text-2xl">Step 2 - Distributor purchases device,<br />
        installs software, transports device</h2>
        <Image src="/step2.jpg" alt="Step 2" className="rounded-lg" width={240} height={240} />
        <br />
        
        <h2 className="text-2xl">Step 3 - Child receives learning device</h2>
        <Image src="/step3.jpg" alt="Step 3" className="rounded-lg" width={320} height={320} />
      </div>

      <div className="mt-16 grid space-x-4 space-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4">
          Sponsorship 1
        </div>

        <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4">
          Sponsorship 2
        </div>

        <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4">
          Sponsorship 3
        </div>

        <div className="p-4 text-2xl bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4">
          Sponsorship 4
        </div>
      </div>
    </main>
  );
}
