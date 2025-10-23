import { useEffect, useState } from "react";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/DistributionVerifierModule#DistributionVerifier.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import LoadingIndicator from "./LoadingIndicator";
import { ethers } from "ethers";

export default function Verifications({ queueNumber }: { queueNumber: number }) {
    console.debug("Verifications");

    console.debug("queueNumber:", queueNumber)

    const deploymentAddress: Address = deployed_addresses["DistributionVerifierModule#DistributionVerifier"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    })

    const [events, setEvents] = useState(Array(0))
    useEffect(() => {
        async function fetchContractEvents() {
            const contract = new ethers.Contract(
                deploymentAddress,
                abi,
                new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com")
            )
            console.debug("contract:", contract)

            const filter = contract.filters.DistributionRejected
            const contractEvents = await contract.queryFilter(
                "*",
                -50000
            )
            console.debug("contractEvents:", contractEvents)
            setEvents(contractEvents)
        }
        fetchContractEvents()
    }, [queueNumber])
    console.debug("events.length:", events.length)
    console.debug("events:", events)

    if (events.length == 0) {
        return <LoadingIndicator />
    }

    return (
        <table className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-800 border-spacing-2 border-separate rounded-lg">
            <thead>
                <tr>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Block #</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Queue #</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">DAO Operator</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Verification</th>
                </tr>
            </thead>
            <tbody>
                {events.map((el, i) =>
                    <tr>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md">#{events[i].blockNumber}</td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md">{Number(events[i].args[0])}</td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md"><code>{events[i].args[1].substring(0, 6)}...{events[i].args[1].substring(38, 42)}</code></td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md"><code>{events[i].fragment.name}</code></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}


