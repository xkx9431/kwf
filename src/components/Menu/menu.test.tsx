import React from 'react';
import { render,RenderResult, fireEvent, cleanup,  wait } from '@testing-library/react';
import  Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex:'0',
  className:'test',
  onSelect:jest.fn()
}
const createStyleFile = ()=> {
  const cssFile:string = `
  .xkx-submenu{
    display:none;
  }
  .xkx-submenu.menu-opened{
    display:block;
  }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

const testVerProps:MenuProps = {
  mode:'vertical',
  defaultIndex:'0'
}
const generateMenu = ( props ) =>{
  return(
    <Menu {...props}>
      <MenuItem >
        active
      </MenuItem>
      <MenuItem disabled >
        disabled
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
        xyz
      </MenuItem>
    </Menu>

  )
}

let warpper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement,disabledElement:HTMLElement;

describe('test Menu and MenuItem component',()=>{
  beforeEach(()=>{
    warpper = render(generateMenu(testProps))
    warpper.container.appendChild(createStyleFile())
    menuElement = warpper.getByTestId('test-menu')
    activeElement = warpper.getByText('active')
    disabledElement = warpper.getByText('disabled')

  })
  it('should render the correct Menu and MenuItem based on default props',()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement.getElementsByTagName('li').length).toEqual(6)
    expect(menuElement.querySelectorAll(':scope >li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')

  });
  it('click items should change active and call the right callback',()=>{
    const thirdElement = warpper.getByText('xyz')
    expect(thirdElement).not.toHaveClass('is-active')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('3')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  });
  it('should render the verticla Menu and mode set to "vertical"',()=>{
    cleanup()
    const wrapperElement = render(generateMenu(testVerProps))
    const menuElement = wrapperElement.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  });
  it('should show dropdown items when hover on submenu',async ()=>{
    expect(warpper.queryByText('dropdown1')).not.toBeVisible()
    const dropdownElement = warpper.getByText('dropdown')
    fireEvent.mouseEnter( dropdownElement )
    await wait(()=>{
      expect(warpper.queryByText('dropdown1')).toBeVisible()
    })
    fireEvent.click(warpper.getByText('dropdown1'))
    expect(testProps.onSelect).toBeCalledWith('2-0')
    fireEvent.mouseLeave( dropdownElement )
    await wait(()=>{
      expect(warpper.queryByText('dropdown1')).toBeVisible()
    })
  });
})