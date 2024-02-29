import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [chain, setChain] = useState<string>();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setChain(newValue);
  };
  useEffect(() => {

  }, [chain]);
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col font-calm">
      <div className="min-h-screen animation-gradient-x bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700">
        <div className="flex flex-row justify-between items-center">
          <nav className="bg-gray-900 text-white shadow-lg rounded-lg py-3 w-full">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-7">
                  {/* <div>
                    <!-- Website Logo -->
                    <a href="#" className="flex items-center py-4 px-2">
                      <img src="logo.svg" alt="Logo" class="h-8 w-8 mr-2">
                      <span className="font-semibold text-lg">Brand Name</span>
                    </a>
                  </div> */}
                  <div className="hidden md:flex items-center space-x-6">
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/' ? 'text-pink-700' : 'text-gray-300'}`} href="/">Home</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/profile' ? 'text-pink-700' : 'text-gray-300'}`} href="/profile">Profile</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/play' ? 'text-pink-700' : 'text-gray-300'}`} href="/play">Play</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/build' ? 'text-pink-700' : 'text-gray-300'}`} href="/build">Build</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/game-shop' ? 'text-pink-700' : 'text-gray-300'}`} href="/game-shop">Game Shop</a>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                  <select
                    className="bg-white text-black border border-gray-300 rounded-md shadow-sm p-2"
                    value={chain}
                    onChange={handleChange}
                  >
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
            </div>
          </nav>
        </div>
        <main className="flex-grow w-full flex flex-col justify-center items-center">
          {children}
        </main>
      </div>
    </div>
  );
}