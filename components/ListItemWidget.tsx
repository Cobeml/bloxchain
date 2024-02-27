import { useState } from "react";

export type ShopListingFormValues = {
    item: string;
    isNFT: boolean;
    nftId: number;
    tokenAmount: number;
    chargeToken: string;
    price: number;
};
type ListItemWidgetProps = {
    list: (values: ShopListingFormValues) => any;
    tokenAddresses: string[];
    nftAddresses: string[];
};
export function ListItemWidget({ list, tokenAddresses, nftAddresses }: ListItemWidgetProps) {
    const [formData, setFormData] = useState<ShopListingFormValues>({
        item: '',
        isNFT: false,
        nftId: 0,
        tokenAmount: 1,
        chargeToken: '',
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // @ts-ignore
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        list(formData);
        // Add your submit logic here (e.g., API call)
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item Address</label>
                <select
                    id="item"
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="">Select Token</option>
                    {(formData.isNFT ? nftAddresses : tokenAddresses).map((address, index) => (
                        <option key={index} value={address}>
                            {address}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="isNFT" className="flex items-center">
                    <input
                        type="checkbox"
                        id="isNFT"
                        name="isNFT"
                        checked={formData.isNFT}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Is NFT?
                </label>
            </div>

            {formData.isNFT && (
                <div>
                    <label htmlFor="nftId" className="block text-sm font-medium text-gray-700">NFT ID</label>
                    <input
                        type="number"
                        id="nftId"
                        name="nftId"
                        value={formData.nftId}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required={formData.isNFT}
                    />
                </div>
            )}

            <div>
                <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-700">Token Amount</label>
                <input
                    type="number"
                    id="tokenAmount"
                    name="tokenAmount"
                    value={formData.tokenAmount}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="chargeToken" className="block text-sm font-medium text-gray-700">Charge Token</label>
                <input
                    type="text"
                    id="chargeToken"
                    name="chargeToken"
                    value={formData.chargeToken}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    List Item
                </button>
            </div>
        </form>
    );
};
