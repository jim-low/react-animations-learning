import { useState } from 'react'
import './App.css'
import { Tabs, Tab } from '@mui/material'
import { PageTabs } from './types'
import CustomTabPanel from './components/CustomTabPanel';
import CanvasAnimation from './components/CanvasAnimation';

const pageTabsMappings = {
  [PageTabs.CANVAS_INTERACTIVE]: CanvasAnimation,
  [PageTabs.CANVAS_ANALYTICS]: undefined,
  [PageTabs.GSAP_INTERACTIVE]: undefined,
  [PageTabs.GSAP_MOTIONS_POPUP]: undefined,
  [PageTabs.GSAP_MOTIONS_PAGES]: undefined,
  [PageTabs.LOTTIEFILES]: undefined,
}

function App() {
  const [selectedTab, setSelectedTab] = useState<PageTabs>(PageTabs.CANVAS_INTERACTIVE);

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={(_, tab) => setSelectedTab(tab)}
        className='mb-2'
      >
        <Tab value={PageTabs.CANVAS_INTERACTIVE} label="Canvas Interactive" />
        <Tab value={PageTabs.CANVAS_ANALYTICS} label="Canvas Analytics" />
        <Tab value={PageTabs.GSAP_INTERACTIVE} label="GSAP Interactive" />
        <Tab value={PageTabs.GSAP_MOTIONS_POPUP} label="GSAP Pop Up" />
        <Tab value={PageTabs.GSAP_MOTIONS_PAGES} label="GSAP Pages" />
        <Tab value={PageTabs.LOTTIEFILES} label="LottieFiles" />
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
