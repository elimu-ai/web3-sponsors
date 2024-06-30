export default function MainFooter() {
    console.debug("MainFooter");
    return (
        <footer className="mt-16 p-8 flex justify-center w-full border-purple-100 dark:border-purple-950 border-t-2">
            Made with <span className="animate-pulse">💜</span> by&nbsp;<a href="https://elimu.ai" className="text-purple-600">elimu.ai</a>, 
            powered by&nbsp;<a href="https://nouns.wtf" className="text-purple-600">Nouns ⌐◨-◨</a>
        </footer>
    )
}
