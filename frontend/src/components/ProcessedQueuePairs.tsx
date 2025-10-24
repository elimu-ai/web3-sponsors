import { Address, createPublicClient, formatEther, http } from "viem"
import { abi as abi_queue_handler } from "../../../backend/ignition/deployments/chain-11155111/artifacts/QueueHandlerModule#QueueHandler.json"
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json"
import { sepolia } from "viem/chains"
import { useEffect, useState } from "react"
import LoadingIndicator from "./LoadingIndicator"
import Link from "next/link"
import SponsorshipSummary from "./SponsorshipSummary"
import DistributionSummary from "./DistributionSummary"

export default function ProcessedQueuePairs() {
    console.debug("ProcessedQueuePairs")

    return <LoadQueuePairProcessedEvents />
}

function LoadQueuePairProcessedEvents() {
    console.debug("LoadQueuePairProcessedEvents")

    const deploymentAddress: Address = deployed_addresses["QueueHandlerModule#QueueHandler"] as `0x${string}`;
    console.debug("deploymentAddress:", deploymentAddress);

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    })

    const [events, setEvents] = useState(Array(0))
    useEffect(() => {
        async function fetchContractEvents() {
            const logs = await publicClient.getContractEvents({
                abi: abi_queue_handler,
                address: deploymentAddress,
                fromBlock: await publicClient.getBlockNumber() - BigInt(10_000),
                toBlock: await publicClient.getBlockNumber(),
                eventName: "QueuePairProcessed"
            })
            console.debug("logs:", logs)
            setEvents(logs)
        }
        fetchContractEvents()
    }, [])
    console.debug("events.length:", events.length)
    console.debug("events:", events)

    if (events.length == 0) {
        return <LoadingIndicator />
    }

    return (
        events.map((el, i) =>
            <div key={i} className="mt-4 p-4 text-2xl bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div className="text-zinc-400">
                    Block: #{Number(events[i].blockNumber)} ({new Date(Number(events[i].blockTimestamp) * 1_000).toISOString().substring(0,10)} {new Date(Number(events[i].blockTimestamp) * 1_000).toISOString().substring(11,16)})
                </div>
                <div className="mt-4 flex gap-x-4">
                    <div className="skew-y-3 p-4 text-2xl bg-purple-200 dark:bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                        <div className="mb-4 text-center text-4xl">
                            💜
                        </div>
                        <div className="mt-2">
                            {new Date(Number(events[i].args[1].timestamp) * 1_000).toISOString().substring(0,10)} {new Date(Number(events[i].args[1].timestamp) * 1_000).toISOString().substring(11,16)}
                        </div>
                        Amount: {formatEther(events[i].args[1].estimatedCost)} ETH
                        <div className="mt-2">
                            Sponsor: <code>{events[i].args[1].sponsor.substring(0, 6)}...{events[i].args[1].sponsor.substring(38, 42)}</code>
                        </div>
                    </div>
                    <div className="skew-y-3 p-4 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                        <div className="mb-4 text-center text-4xl">
                            🛵💨
                        </div>
                        <div className="mt-2">
                            {new Date(Number(events[i].args[0].timestamp) * 1_000).toISOString().substring(0,10)} {new Date(Number(events[i].args[0].timestamp) * 1_000).toISOString().substring(11,16)}
                        </div>
                        <div className="mt-2">
                            Language: {events[i].args[0].languageCode}
                        </div>
                        <div className="mt-2">
                            Android ID: {events[i].args[0].androidId}
                        </div>
                        <div className="mt-2">
                            Distributor: <code>{events[i].args[0].distributor.substring(0, 6)}...{events[i].args[0].distributor.substring(38, 42)}</code>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
