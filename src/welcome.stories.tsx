import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 kevin's web framwork</h1>
        <p>kwf 组件库,各种 awesome web componnet </p>
        <h3>安装试试</h3>
        <code>
          npm install kwf --save
        </code>
      </>
    )
  }, { info : { disable: true }})