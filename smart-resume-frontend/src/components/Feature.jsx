import React, { forwardRef } from 'react'
import FeatureCard from './FeatureCard'

const Feature = forwardRef((props, ref) => {

  const featuresData = [
  {
    title: "Accurate Resume Analysis",
    desc: "AI powered resume evaluation"
  },
  {
    title: "ATS Compatibility Score",
    desc: "Check resume ATS readiness"
  },
  {
    title: "Missing Section Detection",
    desc: "Find missing resume sections"
  },
  {
    title: "Smart Suggestions",
    desc: "Personalized resume improvement tips"
  },
  {
    title: "Instant Results",
    desc: "Get analysis in seconds"
  }
];


  return (
    <div ref = {ref} className='        
        flex gap-8
        w-max
        lg:flex-row
        flex-col
        lg:w-[40vw]
        w-full'>
      
        {featuresData.map((elem, idx)=>{
          return <FeatureCard data ={elem} id={idx}/>
        })}
    </div>
  )
}
)

export default Feature