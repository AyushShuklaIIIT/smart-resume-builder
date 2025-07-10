import React from 'react'
import LeftPanel from './MainContComponents/LeftPanel'
import RightPanel from './MainContComponents/RightPanel'

const MainContent = () => {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
      </div>
    </main>
  )
}

export default MainContent
