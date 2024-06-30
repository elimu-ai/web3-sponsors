import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-84532/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";
import SponsorshipSummary from "./SponsorshipSummary";
import Link from "next/link";
import ErrorIndicator from "./ErrorIndicator";

export default function Sponsorships() {
    console.debug("Sponsorships");

    const deploymentAddress: Address = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"] as `0x${string}`;
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
        return <ErrorIndicator />
    }

    const queueCount = Number(data);
    console.debug("queueCount:", queueCount);
    if (queueCount == 0) {
        return <div>None yet</div>;
    }

    return (
        <>
            {Array(queueCount).fill(1).map((el, i) =>
                <Link key={i} href={`/sponsorships/${i + 1}`}>
                    <div className="skew-y-3 p-4 text-2xl bg-purple-200 dark:bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                        <SponsorshipSummary queueIndex={i} />
                    </div>
                </Link>
            )}
        </>
    )
}
