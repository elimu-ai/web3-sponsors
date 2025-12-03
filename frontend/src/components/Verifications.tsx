import { useEffect, useState } from "react";
import { abi } from "../../../backend/ignition/deployments/chain-11155111/artifacts/DistributionVerifierModule#DistributionVerifier.json";
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import LoadingIndicator from "./LoadingIndicator";

export default function Verifications({ queueNumber, eventName }: { queueNumber: number, eventName: string }) {
    console.debug("Verifications");

    console.debug("queueNumber:", queueNumber)
    console.debug("eventName:", eventName)

    const deploymentAddress: Address = deployed_addresses["DistributionVerifierModule#DistributionVerifier"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http("https://0xrpc.io/sep")
    })

    const [events, setEvents] = useState(Array(0))
    useEffect(() => {
        async function fetchContractEvents() {
            const logs = await publicClient.getContractEvents({
                abi: abi,
                address: deploymentAddress,
                fromBlock: BigInt(9221467), // https://sepolia.etherscan.io/tx/0x73d97908a99a4cf0b3da3fe22348d076d7741cd530b7d18e49c9be567d95b52c
                eventName: eventName,
                args: {
                    queueNumber: queueNumber
                }
            })
            console.debug("logs:", logs)
            setEvents(logs)
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
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Block Number</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Queue Number</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">DAO Operator</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Verification</th>
                </tr>
            </thead>
            <tbody>
                {events.map((el, i) =>
                    <tr key={i}>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md">#{Number(el.blockNumber)}</td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md">#{Number(el.args.queueNumber)}</td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md"><code>{el.args.operator.substring(0, 6)}...{el.args.operator.substring(38, 42)}</code></td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md"><code>{el.eventName}</code></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}


