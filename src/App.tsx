import { useState } from 'react'
import './App.css'
import { Tabs, Tab } from '@mui/material'
import { PageTabs } from './types'
import CustomTabPanel from './components/CustomTabPanel';
import CanvasGame from './components/CanvasGame';
import CanvasBasicAnimation from './components/CanvasBasicAnimation';

const pageTabsMappings = {
  [PageTabs.CANVAS_BASIC_ANIMATION]: CanvasBasicAnimation,
  [PageTabs.CANVAS_GAME]: CanvasGame,
  [PageTabs.CANVAS_ANTV_REPLICATE]: undefined,
}

function App() {
  const [selectedTab, setSelectedTab] = useState<PageTabs>(PageTabs.CANVAS_BASIC_ANIMATION);

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={(_, tab) => setSelectedTab(tab)}
        className='mb-2'
      >
        <Tab value={PageTabs.CANVAS_BASIC_ANIMATION} label="Basic Animation" />
        <Tab value={PageTabs.CANVAS_GAME} label="Game" />
        <Tab value={PageTabs.CANVAS_ANTV_REPLICATE} label="AntV Replicate" />
      </Tabs>

      {
        Object.keys(pageTabsMappings).map(key => {
          return (
            <CustomTabPanel
              key={key}
              value={key as PageTabs}
              index={selectedTab}
              component={pageTabsMappings[key as PageTabs]}
            />
          );
        })
      }
    </div>
  )
}

export default App
