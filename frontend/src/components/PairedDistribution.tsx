import { Address, createPublicClient, http } from "viem";
import { abi as abi_queue_handler } from "../../../backend/ignition/deployments/chain-11155111/artifacts/QueueHandlerModule#QueueHandler.json"
import deployed_addresses from "../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json"
import LoadingIndicator from "@/components/LoadingIndicator";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PairedDistribution({ sponsorshipQueueNumber }: { sponsorshipQueueNumber: Number }) {
    console.debug("PairedDistribution")

    console.debug("sponsorshipQueueNumber:", sponsorshipQueueNumber)

    const deploymentAddress: Address = deployed_addresses["QueueHandlerModule#QueueHandler"] as `0x${string}`
    console.debug("deploymentAddress:", deploymentAddress)

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

    // Iterate processed queue pairs and look for matching queue number
    let distributionQueueNumber = undefined
    events.forEach(event => {
        console.debug("event.blockNumber:", event.blockNumber)
        if (event.args.sponsorshipQueueNumber == sponsorshipQueueNumber) {
            distributionQueueNumber = event.args.distributionQueueNumber
            return
        }
    })
    console.debug("distributionQueueNumber:", distributionQueueNumber)

    if (!distributionQueueNumber) {
        return (
            <span className="p-2 text-sm text-gray-300 border-gray-400 bg-gray-600 border-2 rounded-xl">
                Pairing not yet <Link href="/process" className="text-purple-300" id="processLink">processed</Link>
            </span>
        )
    } else {
      return (
          <Link href={`/distributions/${distributionQueueNumber}`} className="text-indigo-600">
              <div className="skew-y-3 p-4 text-2xl bg-indigo-200 dark:bg-indigo-950 rounded-lg border-indigo-400 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 hover:-translate-y-1">
                  <div className="mb-4 text-center text-4xl">
                      🛵💨
                  </div>
                  Distribution #{distributionQueueNumber}
              </div>
          </Link>
      )
    }
}
