import { Address, createPublicClient, formatEther, http } from "viem"
import { abi as abi_queue_handler } from "../../../backend/ignition/deployments/chain-11155111/artifacts/QueueHandlerModule#QueueHandler.json"
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json"
import { sepolia } from "viem/chains"
import { useEffect, useState } from "react"
import LoadingIndicator from "./LoadingIndicator"
import Link from "next/link"

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
        transport: http("https://0xrpc.io/sep")
    })

    const [events, setEvents] = useState(Array(0))
    useEffect(() => {
        async function fetchContractEvents() {
            const logs = await publicClient.getContractEvents({
                abi: abi_queue_handler,
                address: deploymentAddress,
                fromBlock: BigInt(9_760_219), // https://sepolia.etherscan.io/tx/0x01ea5a02fc320619f391757c038666722837e908c5094bef55b8a16824fb96e5
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
                    Block: <Link className="text-purple-600" href={`https://sepolia.etherscan.io/tx/${el.transactionHash}`} target="_blank">#{Number(el.blockNumber)}</Link> ({new Date(Number(el.blockTimestamp) * 1_000).toISOString().substring(0,10)} {new Date(Number(el.blockTimestamp) * 1_000).toISOString().substring(11,16)})
                </div>
                <div className="mt-4 flex gap-x-4">
                    <Link href={`/sponsorships/${el.args.sponsorshipQueueNumber}`} className="text-purple-600">
                        <div className="skew-y-3 p-4 text-2xl bg-purple-200 dark:bg-purple-950 rounded-lg border-purple-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                            <div className="mb-4 text-center text-4xl">
                                💜
                            </div>
                            Sponsorship #{el.args.sponsorshipQueueNumber}
                        </div>
                    </Link>
                    <Link href={`/distributions/${el.args.distributionQueueNumber}`} className="text-indigo-600">
                        <div className="skew-y-3 p-4 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                            <div className="mb-4 text-center text-4xl">
                                🛵💨
                            </div>
                            Distribution #{el.args.distributionQueueNumber}
                        </div>
                    </Link>
                </div>
            </div>
        )
    )
}
