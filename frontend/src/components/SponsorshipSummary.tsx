import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-84532/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";
import { Avatar, Name } from "@coinbase/onchainkit/identity";

export default function SponsorshipSummary({ queueIndex }: any) {
    console.debug("SponsorshipSummary");

    console.debug("queueIndex:", queueIndex);

    const deploymentAddress: Address = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);
    const { isLoading, data } = useReadContract({
        abi,
        address: deploymentAddress,
        functionName: "queue",
        args: [queueIndex]
    });
    console.debug("isLoading:", isLoading);
    console.debug("data:", data);

    if (isLoading) {
        return <LoadingIndicator />
    }
    
    const sponsorship: any = data;
    const estimatedCost = BigInt(sponsorship[0]);
    const timestamp = Number(sponsorship[1]);
    const sponsor = sponsorship[2];
    return (
        <>
            Queue number: #{queueIndex + 1}
            <div className="mt-2">
                {new Date(timestamp * 1_000).toISOString().substring(0,10)} {new Date(timestamp * 1_000).toISOString().substring(11,16)}
            </div>
            Amount: {formatEther(estimatedCost)} ETH
            <div className="mt-2">
                Sponsor: <code><Name address={sponsor} className="p-8 rounded-lg bg-purple-100 dark:bg-purple-900" /></code>
            </div>
        </>
    )
}
