import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Progress from './progress'

const ProgressSample = ()=>{
  return(
    <Progress
      percent = {50}
    />
  )
}

storiesOf('Progress component',module)
    .add('Progress', ProgressSample )