import Link from "next/link";
import package_json from "../../package.json"

export default function MainFooter() {
    console.debug("MainFooter");

    const packageVersion = package_json["version"]
    console.debug("packageVersion:", packageVersion)

    return (
        <footer className="mt-16 p-8 flex justify-center w-full border-purple-100 dark:border-purple-950 border-t-2">
            Made with <span className="animate-pulse">💜</span> by&nbsp;<a href="https://elimu.ai" className="text-purple-600">elimu.ai</a>
            <Link className="ml-8" href="https://github.com/elimu-ai/web3-sponsors/releases" target="_blank"><code className="px-2 py-1 text-sm text-gray-400 bg-zinc-800 rounded-lg">v{packageVersion}</code></Link>
        </footer>
    )
}
