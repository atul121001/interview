import React, { useState } from "react";
import "./App.scss";
import { Description } from "./Description";
import { LocationVisualizer } from "./components/LocationVisualizer/index";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={isActive ? "active" : ""}
      aria-selected={isActive}
      role='tab'
    >
      {label}
    </button>
  );
};

export const App: React.FC = () => {
  const [isDescription, setIsDescription] = useState<boolean>(true);

  return (
    <div className='App'>
      <div className={"tabs"} role='tablist'>
        <Tab
          label='Description'
          isActive={isDescription}
          onClick={() => setIsDescription(true)}
        />
        <Tab
          label='Implementation'
          isActive={!isDescription}
          onClick={() => setIsDescription(false)}
        />
      </div>

      <div className={"content"} role='tabpanel'>
        {isDescription ? <Description /> : <LocationVisualizer />}
      </div>
    </div>
  );
};

export default App;
