export default function ErrorIndicator({ description }: any) {
    return (
        <div className="p-8 bg-orange-800 border-orange-400 border-4 rounded-lg">
            <p>Error: "{description}"</p>
            <p className="mt-4">See browser console for more details</p>
        </div>
    )
}
