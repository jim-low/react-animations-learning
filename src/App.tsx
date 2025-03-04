import { useState } from 'react'
import './App.css'
import { Tabs, Tab } from '@mui/material'
import { PageTabs } from './types'
import CustomTabPanel from './components/CustomTabPanel';
import CanvasBasics from './components/CanvasBasics';

const pageTabsMappings = {
  [PageTabs.CANVAS_BASICS]: CanvasBasics,
  [PageTabs.CANVAS_CHARTS_AND_GRAPH]: undefined,
  [PageTabs.CANVAS_ANTV_REPLICATE]: undefined,
}

function App() {
  const [selectedTab, setSelectedTab] = useState<PageTabs>(PageTabs.CANVAS_BASICS);

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={(_, tab) => setSelectedTab(tab)}
        className='mb-2'
      >
        <Tab value={PageTabs.CANVAS_BASICS} label="Canvas Basics" />
        <Tab value={PageTabs.CANVAS_CHARTS_AND_GRAPH} label="Canvas Charts and Graph" />
        <Tab value={PageTabs.CANVAS_ANTV_REPLICATE} label="Canvas AntV Replicate" />
      </Tabs>

      {
        Object.keys(pageTabsMappings).map(key => {
          return (
            <CustomTabPanel
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
