

export default function Loader({ height, width }: { height: string, width: string; }) {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full ${height} ${width} border-b-2 border-gray-900`}></div>
        </div>
    );
}