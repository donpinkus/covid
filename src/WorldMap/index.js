import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import MapChart from "./MapChart";

const WorldMap = ({ onCountryClick }) => {
  const [content, setContent] = useState("");

  return (
    <div>
      <MapChart setTooltipContent={setContent} onCountryClick={onCountryClick} />
      {
        content && 
        <ReactTooltip>
          <div>{content.name}</div>
          <div>+{Math.round(content.growthRate * 100)}% new cases since yesterday</div>
        </ReactTooltip>
      }
    </div>
  );
}

export default WorldMap;