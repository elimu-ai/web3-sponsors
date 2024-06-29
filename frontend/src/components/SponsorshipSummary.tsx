import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-84532/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";

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
    } else {
        const estimatedCost = Number(data[0]);
        const timestamp = Number(data[1]);
        const sponsor = data[2];
        return (
            <>
                Queue number: #{queueIndex}<br />
                Date: {new Date(timestamp * 1_000).toISOString().substring(0,16)}<br />
                Amount: {formatEther(estimatedCost)} ETH<br />
                Sponsor: <code>{sponsor.substring(0,5)}...{sponsor.substring(38,42)}</code>
            </>
        )
    }
}
