import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import PairedDistribution from "@/components/PairedDistribution";
import SponsorshipSummary from "@/components/SponsorshipSummary";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SponsorshipDetails() {
  console.debug("SponsorshipDetails")

  const router = useRouter()
  const queueNumber = Number(router.query.queueNumber)
  console.debug("queueNumber:", queueNumber)

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
        <h1 className="text-4xl">
          Sponsorship Details
        </h1>

        <div className="mt-8 p-4 text-2xl bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <SponsorshipSummary queueNumber={queueNumber} />
        </div>

        <div className="mt-8 border-purple-100 dark:border-purple-950 border-t-2 pt-8">
          <h2 className="text-2xl text-center">
            Paired Distribution 🔗
          </h2>
          <div className="mt-4 text-center">
            <PairedDistribution sponsorshipQueueNumber={queueNumber} />
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}


