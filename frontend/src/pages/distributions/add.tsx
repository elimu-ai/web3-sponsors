import LoadingIndicator from "@/components/LoadingIndicator";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import Head from "next/head";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import { abi } from "../../../../backend/ignition/deployments/chain-84532/artifacts/DistributionQueueModule#DistributionQueue.json";
import deployed_addresses from "../../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";
import { Address, parseEther } from "viem";
import ErrorIndicator from "@/components/ErrorIndicator";

export default function AddDistribution() {
  console.debug("AddDistribution");

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
          Become a Distributor <span>🛵💨</span>
        </h1>

        <div className="mt-8">
          Help create real-world impact by delivering<br />
          education to out-of-school children.
        </div>

        <div className="mt-8">
          {!address ? (
            <button disabled={true} className="p-8 text-2xl text-zinc-400 bg-zinc-300 rounded-lg">
              <div className="text-6xl rotate-12 mb-4">☝🏽</div>
              Connect wallet first
            </button>
          ) : (
            <SimulateContractButton />
          )}
        </div>
      </main>
      <MainFooter />
    </>
  );
}

export function SimulateContractButton() {
  console.debug("SimulateContractButton");

  const deploymentAddress: Address = deployed_addresses["DistributionQueueModule#DistributionQueue"] as `0x${string}`;
  console.debug("deploymentAddress:", deploymentAddress);

  const { isPending, isError, error, isSuccess } = useSimulateContract({
    abi,
    address: deploymentAddress,
    functionName: "addDistribution"
  })
  console.debug("isPending:", isPending);
  console.debug("isError:", isError);
  console.debug("error:", error);
  console.debug("isSuccess:", isSuccess);

  if (isPending) {
    return <button disabled={true} className="p-8 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
      <LoadingIndicator /> &nbsp; Simulating...
    </button>
  }

  if (isError) {
    return <ErrorIndicator description={error.name} />
  }

  return <WriteContractButton />
}

export function WriteContractButton() {
  console.debug("WriteContractButton");

  const deploymentAddress: Address = deployed_addresses["DistributionQueueModule#DistributionQueue"] as `0x${string}`;
  console.debug("deploymentAddress:", deploymentAddress);

  const { writeContract } = useWriteContract();
  return (
    <button 
      className="p-8 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1 active:border-r-2 active:border-b-2"
      onClick={() =>
        writeContract({
          abi,
          address: deploymentAddress,
          functionName: "addDistribution"
        })
      }
    >
      Add Distribution 📦
    </button>
  )
}
