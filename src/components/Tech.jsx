import React from 'react'
import { motion } from 'framer-motion'
import {BallCanvas} from './canvas'
import {technologies} from '../constants'
import SectionWrapper from '../hoc/sectionWrapper'

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} ></BallCanvas>
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech, "");