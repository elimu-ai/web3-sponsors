import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/DistributionQueueModule#DistributionQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import LoadingIndicator from "./LoadingIndicator";
import { Address, formatEther } from "viem";
import ErrorIndicator from "./ErrorIndicator";

export default function DistributionSummary({ queueNumber }: any) {
    console.debug("DistributionSummary");

    console.debug("queueNumber:", queueNumber);

    const deploymentAddress: Address = deployed_addresses["DistributionQueueModule#DistributionQueue"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);
    const { isLoading, isError, error, data } = useReadContract({
        abi,
        address: deploymentAddress,
        functionName: "queue",
        args: [queueNumber]
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
    const languageCode = distribution[0];
    const androidId = distribution[1];
    const timestamp = Number(distribution[2]);
    const distributor = distribution[3];
    return (
        <>
            Queue number: #{queueNumber}
            <div className="mt-2">
                {new Date(timestamp * 1_000).toISOString().substring(0,10)} {new Date(timestamp * 1_000).toISOString().substring(11,16)}
            </div>
            <div className="mt-2">
                Language: {languageCode}
            </div>
            <div className="mt-2">
                Android ID: {androidId}
            </div>
            <div className="mt-2">
                Distributor: <code>{distributor}</code>
            </div>
        </>
    )
}
