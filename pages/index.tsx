import React from 'react';
import useTypewriter from 'react-typewriter-hook';

interface MagicOceanProps {
  text: string;
}

const MagicOcean: React.FC<MagicOceanProps> = ({ text }) => {
  const typing = useTypewriter(text);
  return <span>{typing}</span>;
};

const Home = () => {
  const [heading, setHeading] = React.useState("Welcome to Bloxchain");
  // Initialize an array of texts to be typed out in sequence
  const texts = [
    '\n',
    'Bringing the Roblox Experience Onchain', // First text
    '\n', // Intermediate state to simulate deletion
    'Play, Build, Earn, Own, Enjoy' // Final text
  ];
  const [index, setIndex] = React.useState(0); // Current index in the texts array
  const [magicName, setMagicName] = React.useState(texts[0]); // Initialize with the first text

  React.useEffect(() => {
    if (index < 3) {
      if (index === 0) {
        // Change to the next text after a delay
        const timer = setTimeout(() => {
          const nextIndex = (index + 1); // Loop back to the first text after the last one
          setIndex(nextIndex); // Update the index
          setMagicName(texts[nextIndex]); // Update the text to be typed out
        }, 3000); // Delay of 3 seconds
        return () => clearTimeout(timer);
      } else {
        // Change to the next text after a delay
        const timer = setTimeout(() => {
          const nextIndex = (index + 1); // Loop back to the first text after the last one
          setIndex(nextIndex); // Update the index
          setMagicName(texts[nextIndex]); // Update the text to be typed out
        }, 5000); // Delay of 5 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [magicName, index, texts]);

  return (
    <div className="flex flex-col items-start justify-center h-screen p-10">
      <h1 className="text-8xl font-bold text-indigo-400">
        <MagicOcean text={heading} />
      </h1>
      <h2 className="text-5xl mt-6 text-indigo-400" style={{ minHeight: '4rem' }}>
        <MagicOcean text={magicName} />
      </h2>
    </div>
  );
};

export default Home;


