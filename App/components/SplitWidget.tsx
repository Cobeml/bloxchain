import { useState } from "react";


export default function SplitWidget({ submit, onClose }: { submit: (supply: number, name: string, symbol: string) => void; onClose: () => void; }) {
    const [supply, setSupply] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Here you would handle the submission, e.g., calling the split function
        submit(Number(supply), name, symbol);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Split Token</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="supply" className="block mb-2">Supply</label>
                        <input type="number" id="supply" value={supply} onChange={(e) => setSupply(e.target.value)} className="border rounded p-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded p-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="symbol" className="block mb-2">Symbol</label>
                        <input type="text" id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} className="border rounded p-2 w-full" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded p-2">Submit</button>
                    <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white rounded p-2">Cancel</button>
                </form>
            </div>
        </div>
    );
};