import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem> 
    <MenuItem>
      cool link 2
    </MenuItem> 
  </Menu>
)

export const  verticalMenuWithSubItem = ()=>(
  <Menu defaultIndex = '0' mode='vertical' defaultOpenSubMenuProps={['1']} >
  <MenuItem >
    cool link 1
  </MenuItem>
  <MenuItem >
    cool link 2
  </MenuItem>
  <SubMenu title = 'dropdown'>
    <MenuItem>
      dropdown1
    </MenuItem>
    <MenuItem>
      dropdown2
    </MenuItem>
  </SubMenu>
  <MenuItem >
    cool link 3
  </MenuItem>
</Menu>
)
export const  menuWithSubItem = ()=>(
  <Menu defaultIndex = '0'  defaultOpenSubMenuProps={['1']} >
  <MenuItem >
    cool link 1
  </MenuItem>
  <MenuItem >
    cool link 2
  </MenuItem>
  <SubMenu title = 'dropdown'>
    <MenuItem>
      dropdown1
    </MenuItem>
    <MenuItem>
      dropdown2
    </MenuItem>
  </SubMenu>
  <MenuItem >
    cool link 3
  </MenuItem>
</Menu>
)

storiesOf('Menu Component', module)
.add('Menu', defaultMenu )
.add('menuWithSubItem', menuWithSubItem )
.add('verticalMenu', verticalMenuWithSubItem )