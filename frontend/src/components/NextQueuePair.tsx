import { useReadContract, useSimulateContract, useWriteContract } from "wagmi";
import { abi as abi_sponsorship_queue } from "../../../backend/ignition/deployments/chain-11155111/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import { abi as abi_distribution_queue } from "../../../backend/ignition/deployments/chain-11155111/artifacts/DistributionQueueModule#DistributionQueue.json";
import { abi as abi_queue_handler } from "../../../backend/ignition/deployments/chain-11155111/artifacts/QueueHandlerModule#QueueHandler.json"
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address } from "viem";
import ErrorIndicator from "./ErrorIndicator";
import SponsorshipSummary from "./SponsorshipSummary";
import DistributionSummary from "./DistributionSummary";
import Link from "next/link";

export default function NextQueuePair() {
    console.debug("NextQueuePair");

    return <LoadSponsorshipQueueNumberFront />
}

export function LoadSponsorshipQueueNumberFront() {
    console.debug('LoadSponsorshipQueueNumberFront')

    const deploymentAddress: Address = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);
    const { isLoading, isError, error, data } = useReadContract({
        abi: abi_sponsorship_queue,
        address: deploymentAddress,
        functionName: "queueNumberFront"
    });
    console.debug("isLoading:", isLoading);
    console.debug("isError:", isError);
    console.debug("error:", error);
    console.debug("data:", data);

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorIndicator description={error.name} />
    }

    const queueNumberFront = Number(data)
    console.debug('queueNumberFront:', queueNumberFront)

    return <LoadDistributionQueueNumberFront sponsorshipQueueNumberFront={queueNumberFront} />
}

export function LoadDistributionQueueNumberFront({ sponsorshipQueueNumberFront }: { sponsorshipQueueNumberFront: number }) {
    console.debug('LoadDistributionQueueNumberFront')

    console.debug('sponsorshipQueueNumberFront:', sponsorshipQueueNumberFront)

    const deploymentAddress: Address = deployed_addresses["DistributionQueueModule#DistributionQueue"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);
    const { isLoading, isError, error, data } = useReadContract({
        abi: abi_distribution_queue,
        address: deploymentAddress,
        functionName: "queueNumberFront"
    });
    console.debug("isLoading:", isLoading);
    console.debug("isError:", isError);
    console.debug("error:", error);
    console.debug("data:", data);

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorIndicator description={error.name} />
    }

    const distributionQueueNumberFront = Number(data)
    console.debug('distributionQueueNumberFront:', distributionQueueNumberFront)

    return (
        <>
            <div className="flex gap-x-4">
                <Link href={`/sponsorships/${sponsorshipQueueNumberFront}`}>
                    <div className="skew-y-3 p-4 text-2xl bg-purple-200 dark:bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                        <SponsorshipSummary queueNumber={sponsorshipQueueNumberFront} />
                    </div>
                </Link>
                <Link href={`/distributions/${distributionQueueNumberFront}`}>
                    <div className="skew-y-3 p-4 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                        <DistributionSummary queueNumber={distributionQueueNumberFront} />
                    </div>
                </Link>
            </div>
            <div className="mt-8 text-center">
                <SimulateContractButton />
            </div>
        </>
    )
}

export function SimulateContractButton() {
  console.debug("SimulateContractButton");

  const deploymentAddress: Address = deployed_addresses["QueueHandlerModule#QueueHandler"] as `0x${string}`;
  console.debug("deploymentAddress:", deploymentAddress);

  const { isPending, isError, error, isSuccess } = useSimulateContract({
    abi: abi_queue_handler,
    address: deploymentAddress,
    functionName: "processQueuePair"
  })
  console.debug("isPending:", isPending);
  console.debug("isError:", isError);
  console.debug("error:", error);
  console.debug("isSuccess:", isSuccess);

  if (isPending) {
    return (
      <>
        <button disabled={true} className="p-8 text-2xl bg-gray-200 dark:bg-gray-800 rounded-lg border-gray-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
          <LoadingIndicator /> &nbsp; Simulating...
        </button>
      </>
    )
  }

  if (isError) {
    return <ErrorIndicator description={error.name} />
  }

  return <WriteContractButton />
}

export function WriteContractButton() {
  console.debug("WriteContractButton");

  const deploymentAddress: Address = deployed_addresses["QueueHandlerModule#QueueHandler"] as `0x${string}`;
  console.debug("deploymentAddress:", deploymentAddress);

  const { writeContract } = useWriteContract();
  return (
    <button 
      className="mt-4 p-8 text-2xl bg-gray-200 dark:bg-gray-800 rounded-lg border-gray-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1 active:border-r-2 active:border-b-2"
      onClick={() =>
        writeContract({
          abi: abi_queue_handler,
          address: deploymentAddress,
          functionName: "processQueuePair"
        })
      }
    >
        Process Queue Pair 🔗
    </button>
  )
}
