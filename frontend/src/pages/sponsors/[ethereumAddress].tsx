import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import Head from "next/head";
import { useRouter } from "next/router";
import { abi } from "../../../../backend/ignition/deployments/chain-11155111/artifacts/SponsorshipQueueModule#SponsorshipQueue.json";
import deployed_addresses from "../../../../backend/ignition/deployments/chain-11155111/deployed_addresses.json";
import { Address, createPublicClient, formatEther, http } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Link from "next/link";

export default function Sponsor() {
  console.debug("Sponsor");

  const router = useRouter();
  if (!router.isReady) {
      return <LoadingIndicator />
  }

  const ethereumAddress: string = String(router.query.ethereumAddress);
  console.debug("ethereumAddress:", ethereumAddress);

  return (
    <>
      <Head>
          <title>Sponsors 🫶🏽</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap" rel="stylesheet" />
      </Head>
      <MainHeader />
      <main
        className={`flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64`}
        >
        <h1 className="text-4xl">
          Sponsor <code>{ethereumAddress.substring(0, 6)}...{ethereumAddress.substring(38, 42)}</code>
        </h1>

        <div className="mt-8 border-purple-100 dark:border-purple-950 border-t-2 pt-8">
            <h2 className="text-2xl text-center">
                Sponsorships 👇🏽
            </h2>

            <div className="mt-8">
                <LoadSponsorshipAddedEvents ethereumAddress={ethereumAddress} />
            </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}

export function LoadSponsorshipAddedEvents({ ethereumAddress }: {ethereumAddress: string}) {
    console.log("LoadSponsorshipEvents")

    console.log("ethereumAddress:", ethereumAddress)


    const deploymentAddress: Address = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"] as `0x${string}`
    console.debug("deploymentAddress:", deploymentAddress)

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
                fromBlock: BigInt(9_760_174), // https://sepolia.etherscan.io/tx/0xf6a2674e6c35787a620e914e52348189e1ed0b47b04b67a0170f611024da01de
                eventName: "SponsorshipAdded",
                args: {
                    sponsor: ethereumAddress
                }
            })
            console.debug("logs:", logs)
            setEvents(logs)
        }
        fetchContractEvents()
    }, [ethereumAddress])
    console.debug("events.length:", events.length)
    console.debug("events:", events)

    if (events.length == 0) {
        return <LoadingIndicator />
    }

    return (
        <table className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-800 border-spacing-2 border-separate rounded-lg">
            <thead>
                <tr>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Timestamp</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Sponsor</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Event Name</th>
                    <th className="bg-zinc-700 text-zinc-300 p-4 rounded-md">Transaction</th>
                </tr>
            </thead>
            <tbody>
                {events.map((el, i) =>
                    <tr key={i}>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md">{new Date(el.blockTimestamp * 1_000).toISOString().substring(0,10)} {new Date(el.blockTimestamp * 1_000).toISOString().substring(11,16)}</td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md"><code>{el.args.sponsor.substring(0, 6)}...{el.args.sponsor.substring(38, 42)}</code></td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md"><code>{el.eventName}</code></td>
                        <td className="bg-zinc-800 text-zinc-400 p-2 rounded-md">
                            <Link className="text-purple-600" href={`https://sepolia.etherscan.io/tx/${el.transactionHash}`} target="_blank">
                                Tx ↗
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
