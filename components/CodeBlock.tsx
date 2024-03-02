// components/CodeBlock.tsx

interface CodeBlockProps {
    children: React.ReactNode;
  }
  
  const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
    return (
      <code className="font-mono bg-gray-100 p-2 rounded-md border border-gray-200 whitespace-pre-wrap break-words">
        {children}
      </code>
    );
  };
  
  export default CodeBlock;
  