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
    'Play, Build, Own'
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
    <div className="flex flex-col items-start justify-center h-screen p-10" style={{ height: '90vh' }}>
      <h1 className="text-8xl font-bold text-white">
        <MagicOcean text={heading} />
      </h1>
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-6xl mt-6 text-white text-center font-bold" style={{ minHeight: '4rem' }}>
          <MagicOcean text={magicName} />
        </h2>
      </div>
    </div>
  );
};

export default Home;
