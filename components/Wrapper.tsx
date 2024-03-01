import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import logo from 'bloxchain-logo-no-bg.svg';
import SwitchNetworkWidget from "./SwitchNetworkWidget";

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
  "Localhost",
  "Arbitrum One Sepolia",
  "Solana",
];
export default function Wrapper({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col font-calm">
      <div className="min-h-screen"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(125, 0, 180, 0.5), rgba(253, 0, 220, 0.5)), url('/bloxchain-logo-no-bg-no-name.png')`, // Set the background image
          backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
          backgroundPosition: 'center', // Center the background image
          backgroundSize: 'contain', // Ensure the image fits within the container, adjust as needed
        }}
      >
        <div className="flex flex-row justify-between items-center">
          <nav className="bg-gray-900 text-white shadow-lg rounded-lg py-3 w-full h-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between">
                <div className="flex space-x-7">
                  <div>
                    <a href="#" className="flex p-1">
                      <img src="bloxchain-logo-no-bg.png" alt="Logo" className="h-16" />
                    </a>
                  </div>
                  <div className="hidden md:flex items-center space-x-6">
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/' ? 'text-pink-700' : 'text-gray-300'}`} href="/">Home</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/profile' ? 'text-pink-700' : 'text-gray-300'}`} href="/profile">Your Assets</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/play' ? 'text-pink-700' : 'text-gray-300'}`} href="/play">Play</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/build' ? 'text-pink-700' : 'text-gray-300'}`} href="/build">Build</a>
                    <a className={`py-4 px-2 hover:text-white transition duration-300 ${router.pathname === '/game-shop' ? 'text-pink-700' : 'text-gray-300'}`} href="/game-shop">Game Shop</a>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                  <SwitchNetworkWidget />
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