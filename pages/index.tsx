import React from 'react';
import useTypewriter from 'react-typewriter-hook';

interface MagicOceanProps {
  text: string;
}

const MagicOcean: React.FC<MagicOceanProps> = React.memo(({ text }) => {
  // Use React.memo to prevent unnecessary re-renders
  const typing = useTypewriter(text);
  return <span>{typing}</span>;
});

const Home = () => {
  const [heading] = React.useState("Welcome to Bloxchain"); // No setter needed if it's static
  const texts = React.useMemo(() => [
    '\n',
    'Bringing the Roblox Experience Onchain',
    '\n',
    'Play, Build, Earn, Own, Enjoy'
  ], []); // useMemo to ensure the texts array doesn't get re-initialized on every render

  const [index, setIndex] = React.useState(0);
  const magicName = texts[index]; // Directly use texts[index] instead of a separate state

  React.useEffect(() => {
    // Only proceed if index is within the bounds of the texts array
    if (index < texts.length - 1) {
      // Set a timeout to progress the text display
      const timer = setTimeout(() => {
        setIndex((currentIndex) => (currentIndex + 1) % texts.length); // Loop back after the last text
      }, index === 0 ? 3000 : 5000); // Use 3000ms delay for the first text, 5000ms for others

      // Clear the timeout on effect cleanup
      return () => clearTimeout(timer);
    }
  }, [index, texts.length]); // Dependency array includes only index and texts.length

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
