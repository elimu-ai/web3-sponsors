import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/DistributionQueueModule#DistributionQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import ErrorIndicator from "./ErrorIndicator";

export default function DistributionSummary({ queueIndex }: any) {
    console.debug("DistributionSummary");

    console.debug("queueIndex:", queueIndex);

    const deploymentAddress: Address = deployed_addresses["DistributionQueueModule#DistributionQueue"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);
    const { isLoading, isError, error, data } = useReadContract({
        abi,
        address: deploymentAddress,
        functionName: "queue",
        args: [queueIndex]
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
    
    const distribution: any = data;
    const timestamp = Number(distribution[0]);
    const distributor = distribution[1];
    const status = distribution[2];
    return (
        <>
            Queue number: #{queueIndex + 1}
            <div className="mt-2">
                {new Date(timestamp * 1_000).toISOString().substring(0,10)} {new Date(timestamp * 1_000).toISOString().substring(11,16)}
            </div>
            <div className="mt-2">
                Distributor: <code><Name address={distributor} className="p-8 rounded-lg bg-indigo-100 dark:bg-indigo-900" /></code>
            </div>
            <div className="mt-2">
                {(status == 0) && (
                    <span className="px-3 py-1 text-sm text-stone-400 border-stone-400 bg-stone-800 border-2 rounded-2xl">
                        Delivered📦
                    </span>
                )}
                {(status == 1) && (
                    <span className="px-3 py-1 text-sm text-emerald-400 border-emerald-400 bg-emerald-800 border-2 rounded-2xl">
                        Approved✅
                    </span>
                )}
                {(status == 2) && (
                    <span className="px-3 py-1 text-sm text-orange-400 border-orange-400 bg-orange-800 border-2 rounded-2xl">
                        Rejected<span className="animate-pulse">🔶</span>
                    </span>
                )}
                {(status == 3) && (
                    <span className="px-3 py-1 text-sm text-purple-400 border-purple-400 bg-purple-800 border-2 rounded-2xl">
                        Paid💷
                    </span>
                )}
            </div>
        </>
    )
}
