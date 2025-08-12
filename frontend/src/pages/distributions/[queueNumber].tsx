import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import DistributionSummary from "@/components/DistributionSummary";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DistributionDetails() {
  console.debug("DistributionDetails");

  const router = useRouter();
  const queueNumber = Number(router.query.queueNumber);
  console.debug("queueNumber:", queueNumber);
  const queueIndex = queueNumber - 1;
  console.debug("queueIndex:", queueIndex);

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
        <h1 className="relative flex place-items-center text-4xl">
          Distribution Details
        </h1>

        <div className="mt-8 p-4 text-2xl bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <DistributionSummary queueIndex={queueIndex} />
        </div>
      </main>
      <MainFooter />
    </>
  );
}
