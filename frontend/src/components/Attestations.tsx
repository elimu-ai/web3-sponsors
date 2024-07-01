import { Address, Avatar, Badge, Identity, Name, getAttestations } from "@coinbase/onchainkit/identity";
import { useEffect, useState } from "react";

import { base, baseSepolia } from 'wagmi/chains'
import LoadingIndicator from "./LoadingIndicator";
import Link from "next/link";

export default function Attestations({ queueIndex }: any) {
    console.debug("Attestations");

    console.debug("queueIndex:", queueIndex);

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://base-sepolia.easscan.org/graphql", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query AttestationsQuery {
                        attestations(where: {schemaId: {equals: "0x47ae9f9a75fc6f94927dfcabe6c68ecaad18b8e55db85911b91846017103387e"}}) {
                            id,
                            attester,
                            recipient,
                            time,
                            decodedDataJson
                        }
                    }
                `
            })
        })
            .then(response => response.json())
            .then(result => {
                console.debug("then");
                console.debug("result.data:", result.data);
                setData(result.data);
            })
            .catch(error => {
                console.error("error:", error);
                // TODO: Handle errors
            });
    }, []);

    if (!data) {
        return <LoadingIndicator />
    }

    const attestationsData: any = data;
    console.debug("attestationsData:", attestationsData);

    if (!attestationsData.attestations) {
        // TODO: Handle errors
    }

    // const EAS_SCHEMA_ID = "0x47ae9f9a75fc6f94927dfcabe6c68ecaad18b8e55db85911b91846017103387e";
    // // const attestationOptions = {
    // //     schemas: [EAS_SCHEMA_ID]
    // // };
    // const attestations = getAttestations(address, baseSepolia);
    // console.log("attestations:", attestations);
    // return (
    //     <Identity
    //         address={address}
    //         schemaId="0x47ae9f9a75fc6f94927dfcabe6c68ecaad18b8e55db85911b91846017103387e"
    //         >
    //         <Avatar className="h-8 w-8 border-2 rounded-full" />
    //         <Name>
    //             <Badge />
    //         </Name>
    //         <Address />
    //     </Identity>
    // )

    return (       
        attestationsData.attestations.map((attestation: any, i: number) => {
            return (
                <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <Name address={attestation.attester} />
                    <div className="mt-2">
                        {new Date(attestation.time * 1_000).toISOString().substring(0,10)} {new Date(attestation.time * 1_000).toISOString().substring(11,16)}
                        <Link href={`https://base-sepolia.easscan.org/attestation/view/${attestation.id}`} target="_blank" className="ml-2">↗</Link>
                    </div>
                    <div className="mt-2">
                        {/* {attestation.decodedDataJson.verified} */}
                        <span className="px-3 py-1 text-sm text-emerald-400 border-emerald-400 bg-emerald-800 border-2 rounded-2xl">
                            Verified✅
                        </span>
                    </div>
                </div>
            )
        })
    )
}
