import { useEffect, useState } from "react";

const info = {
  "Arbitrum One Sepolia": {
    contractAddress: "",
  },
  "Localhost": {
    contractAddress: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
  },
  "Solana": {

  }
};
const options = [
  "Arbitrum One Sepolia",
  "Localhost",
  "Solana",
];
export default function Wrapper({ children }: { children: React.ReactNode; }) {
  const [chain, setChain] = useState<string>();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setChain(newValue);
  };
  useEffect(() => {

  }, [chain]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <nav>
          <ul className="flex justify-between items-center p-4 gap-4">
            <li className="hover:text-gray-300">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-gray-300">
              <a href="/profile">Profile</a>
            </li>
            <li className="hover:text-gray-300">
              <a href="/play">Play</a>
            </li>
            <li className="hover:text-gray-300">
              <a href="/build">Build</a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-row justify-center items-center gap-2">
          <select value={chain} onChange={handleChange}>
            {options.map((option: string, i: number) => {
              return (
                <option key={i} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <main className="flex-grow w-full flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}