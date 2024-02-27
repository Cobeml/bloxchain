import { useState } from "react";


function Sidebar({ sections, onSectionChange }: { sections: string[], onSectionChange: (section: string) => void }) {
    return (
      <div className="w-64 h-full overflow-auto bg-gray-800 text-white">
        <div className="p-5">
          <h2 className="text-xl font-bold">Documentation</h2>
          <ul className="mt-4">
            {sections.map((section) => (
              <li key={section} className="mt-2">
                <button
                  onClick={() => onSectionChange(section)}
                  className="text-left w-full"
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
function Content({ section, content }: { section: string, content: string }) {
    return (
        <div className="flex-1 p-10">
            <h1 className="text-2xl font-bold">{section}</h1>
            <p className="mt-4">
                {content}
            </p>
      </div>
    )
}
const sections: string[] = ["Object", "User"];
const content: any = {
    "Object": `This is example for object`,
    "User": `This is example for user`
}
export default function Docs() {
    const [currentSection, setCurrentSection] = useState<string>(sections[0]);
    const handleSectionChange = (section: string) => {
        setCurrentSection(section);
      };
    return (
        <div className="flex w-full h-screen bg-gray-700">
            <Sidebar sections={sections} onSectionChange={handleSectionChange} />
            <Content section={currentSection} content={(content as any)[currentSection]} />
        </div>
    )
}