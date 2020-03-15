import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import MapChart from "./MapChart";

function WorldMap() {
  const [content, setContent] = useState("");
  
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
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