import LoadingIndicator from "@/components/LoadingIndicator";
import { useReadContract } from "wagmi";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import { Address, formatEther, parseEther } from "viem";
import ErrorIndicator from "@/components/ErrorIndicator";

export default function EstimatedCost() {
  console.debug("EstimatedCost")

  const deploymentAddress: Address = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"] as `0x${string}`;
  console.debug("deploymentAddress:", deploymentAddress);
  const { isLoading, isError, error, data } = useReadContract({
      abi,
      address: deploymentAddress,
      functionName: "estimatedCost"
  });
  console.debug("isLoading:", isLoading);
  console.debug("isError:", isError);
  console.debug("error:", error);
  console.debug("data:", data);

  if (isLoading) {
      return <LoadingIndicator height={8} />
  }

  if (isError) {
      return <ErrorIndicator description={error.name} />
  }

  const estimatedCost: bigint = BigInt(String(data))
  console.debug("estimatedCost:", estimatedCost);

  return (
    <>
      {formatEther(estimatedCost)}
    </>
  )
}
