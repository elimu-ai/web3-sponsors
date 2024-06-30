import SponsorshipSummary from "@/components/SponsorshipSummary";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SponsorshipDetails() {
  console.debug("SponsorshipDetails");

  const router = useRouter();
  const queueIndex = router.query.queueIndex;
  console.debug("queueIndex:", queueIndex);

  return (
    <>
      <Head>
          <title>Sponsors 🫶🏽</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap" rel="stylesheet" />
      </Head>
      <main
        className={`flex flex-col items-center p-24`}
        >
        <h1 className="relative flex place-items-center text-4xl">
          Sponsorship Details
        </h1>

        <div className="mt-8 p-4 text-2xl bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <SponsorshipSummary queueIndex={queueIndex} />
        </div>
      </main>
    </>
  );
}
