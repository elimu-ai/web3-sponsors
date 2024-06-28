import Image from "next/image";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="text-4xl">
        ⌐◨-◨
      </div>

      <div className="relative flex place-items-center text-8xl">
        Sponsors 🫶🏽
      </div>

      <div className="mb-32 grid space-x-4 space-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="rounded-lg border p-4">
          Sponsorship 1
        </div>

        <div className="rounded-lg border p-4">
          Sponsorship 2
        </div>

        <div className="rounded-lg border p-4">
          Sponsorship 3
        </div>

        <div className="rounded-lg border p-4">
          Sponsorship 4
        </div>
      </div>
    </main>
  );
}
