import { useState } from "react";



export default function ListWidget({ submit, onClose }: { submit: (price: number, sellToken: string) => void, onClose: () => void; }) {
    const [price, setPrice] = useState('');
    const [sellToken, setSellToken] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle the submission logic here, e.g., calling the list function
        submit(Number(price), sellToken);
        onClose(); // Close modal after submit
    };


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">List Game Token</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-2">Price</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded p-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sellToken" className="block mb-2">Sell Token Address</label>
                        <input type="text" id="sellToken" value={sellToken} onChange={(e) => setSellToken(e.target.value)} className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded p-2">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white rounded p-2">List</button>
                    </div>
                </form>
            </div>
        </div>
    );
}