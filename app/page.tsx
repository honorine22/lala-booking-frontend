import React from 'react'
import PropertyList from './components/PropertyList'
import FAQ from './components/FAQ'
// import HeroSection from './components/HeroSection'
import AlternativeHero from './components/AlternativeHero'

const Home = () => {
  return (
    <div className='flex flex-col gap-y-16'>
      {/* <HeroSection /> */}
      <AlternativeHero />
      <PropertyList />
      <FAQ />
      {/* <CallAction /> */}
    </div>
  )
}

export default Home