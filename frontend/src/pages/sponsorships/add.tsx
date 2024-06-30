import LoadingIndicator from "@/components/LoadingIndicator";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import Head from "next/head";
import { useAccount } from "wagmi";

export default function AddSponsorship() {
  console.debug("AddSponsorship");

  const { address, isConnecting, isReconnecting } = useAccount();
  console.debug("address:", address);
  console.debug("isConnecting:", isConnecting);
  console.debug("isReconnecting:", isReconnecting);

  if (isConnecting || isReconnecting) {
    return <LoadingIndicator />
  }

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
          Become a Sponsor <span className="animate-pulse">💜</span>
        </h1>

        <div className="mt-8">
          Your sponsorship will cover the estimated cost for<br />
          delivering education to one out-of-school child.
        </div>

        <div className="mt-8">
          {!address ? (
            <button disabled={true} className="p-8 text-2xl text-zinc-400 bg-zinc-300 rounded-lg">
              <div className="text-6xl rotate-12 mb-4">☝🏽</div>
              Connect wallet first
            </button>
          ) : (
            <button className="p-8 text-2xl bg-purple-200 dark:bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
              Send 0.02 ETH
            </button>
          )}
        </div>
      </main>
      <MainFooter />
    </>
  );
}
