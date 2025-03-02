import { useState } from 'react'
import './App.css'
import { Tabs, Tab } from '@mui/material'
import { PageTabs } from './types'
import CustomTabPanel from './components/CustomTabPanel';
import CanvasAnimation from './components/CanvasAnimation';
import GsapAnimation from './components/GsapAnimation';
import LottieFilesAnimation from './components/LottieFilesAnimation';

function App() {
  const [selectedTab, setSelectedTab] = useState<PageTabs>(PageTabs.CANVAS_ANIMATION);

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={(_, tab) => setSelectedTab(tab)}
        className='mb-2'
      >
        <Tab value={PageTabs.CANVAS_ANIMATION} label="Canvas" />
        <Tab value={PageTabs.GSAP_ANIMATION} label="GSAP" />
        <Tab value={PageTabs.LOTTIEFILES_ANIMATION} label="LottieFiles" />
      </Tabs>

      <CustomTabPanel
        value={PageTabs.CANVAS_ANIMATION}
        index={selectedTab}
        component={CanvasAnimation}
      />

      <CustomTabPanel
        value={PageTabs.GSAP_ANIMATION}
        index={selectedTab}
        component={GsapAnimation}
      />

      <CustomTabPanel
        value={PageTabs.LOTTIEFILES_ANIMATION}
        index={selectedTab}
        component={LottieFilesAnimation}
      />
    </div>
  )
}

export default App
