import React, { useState } from 'react';

interface ToggleDivsProps {
  buttonText1: string;
  buttonText2: string;
  buttonText3: string; // Add a prop for the third button text
  divContent1: React.ReactNode;
  divContent2: React.ReactNode;
  divContent3: React.ReactNode; // Add a prop for the third div content
}

const ToggleDivs: React.FC<ToggleDivsProps> = ({
  buttonText1,
  buttonText2,
  buttonText3, // Add the third button text
  divContent1,
  divContent2,
  divContent3, // Add the third div content
}) => {
  const [visibleDiv, setVisibleDiv] = useState<'div1' | 'div2' | 'div3'>('div1'); // Update state to handle three divs

  const Tab: React.FC<{ selected: boolean; onClick: () => void; text: string; }> = ({ selected, onClick, text }) => {
    return (
      <button
        onClick={onClick}
        className={`px-2 py-1 text-sm text-white transition-colors duration-150 ${selected ? 'bg-gray-800' : 'bg-gray-600'
          } rounded-t-lg`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="flex-grow w-1/6 bg-gray-800 text-white overflow-auto">
      <div className="bg-gray-700">
        <Tab selected={visibleDiv === 'div1'} onClick={() => setVisibleDiv('div1')} text={buttonText1} />
        <Tab selected={visibleDiv === 'div2'} onClick={() => setVisibleDiv('div2')} text={buttonText2} />
        <Tab selected={visibleDiv === 'div3'} onClick={() => setVisibleDiv('div3')} text={buttonText3} /> {/* Add the third tab */}
      </div>
      <div className="flex-1 overflow-auto">
        {visibleDiv === 'div1' && <div id="div1">{divContent1}</div>}
        {visibleDiv === 'div2' && <div id="div2">{divContent2}</div>}
        {visibleDiv === 'div3' && <div id="div3">{divContent3}</div>} {/* Add the third div */}
      </div>
    </div>
  );
};

export default ToggleDivs;
