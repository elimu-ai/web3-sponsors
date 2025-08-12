import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";
import ErrorIndicator from "./ErrorIndicator";

export default function SponsorshipSummary({ queueIndex }: any) {
    console.debug("SponsorshipSummary");

    console.debug("queueIndex:", queueIndex);

    const deploymentAddress: Address = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"] as `0x${string}`;
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
    
    const sponsorship: any = data;
    const estimatedCost = BigInt(sponsorship[0]);
    const languageCode = String(sponsorship[1]);
    const timestamp = Number(sponsorship[2]);
    const sponsor = sponsorship[3];
    return (
        <>
            Queue number: #{queueIndex + 1}
            <div className="mt-2">
                {new Date(timestamp * 1_000).toISOString().substring(0,10)} {new Date(timestamp * 1_000).toISOString().substring(11,16)}
            </div>
            Amount: {formatEther(estimatedCost)} ETH
            <div className="mt-2">
                Language: <code>{languageCode}</code>
            </div>
            <div className="mt-2">
                Sponsor: <code>{sponsor}</code>
            </div>
        </>
    )
}
