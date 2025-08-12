import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/DistributionQueueModule#DistributionQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";
import DistributionSummary from "./DistributionSummary";
import Link from "next/link";
import ErrorIndicator from "./ErrorIndicator";

export default function Distributions() {
    console.debug("Distributions");

    const deploymentAddress: Address = deployed_addresses["DistributionQueueModule#DistributionQueue"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);
    const { isLoading, isError, error, data } = useReadContract({
        abi,
        address: deploymentAddress,
        functionName: "getQueueCount"
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

    const queueCount = Number(data);
    console.debug("queueCount:", queueCount);
    if (queueCount == 0) {
        return <div>None yet</div>;
    }

    return (
        <>
            {Array(queueCount).fill(1).map((el, i) =>
                <Link key={i} href={`/distributions/${i + 1}`}>
                    <div className="skew-y-3 p-4 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                        <DistributionSummary queueIndex={i} />
                    </div>
                </Link>
            )}
        </>
    )
}
