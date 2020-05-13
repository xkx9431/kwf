import React from 'react';
import { render,RenderResult, fireEvent, cleanup } from '@testing-library/react';
import  Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex:0,
  className:'test',
  onSelect:jest.fn()
}

const testVerProps:MenuProps = {
  mode:'vertical',
  defaultIndex:0
}
const generateMenu = ( props ) =>{
  return(
    <Menu {...props}>
      <MenuItem index = {0}>
        active
      </MenuItem>
      <MenuItem disabled index = {1}>
        disabled
      </MenuItem>
      <MenuItem index = {2}>
        xyz
      </MenuItem>

    </Menu>

  )
}

let warpper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement,disabledElement:HTMLElement;

describe('test Menu and MenuItem component',()=>{
  beforeEach(()=>{
    warpper = render(generateMenu(testProps))
    menuElement = warpper.getByTestId('test-menu')
    activeElement = warpper.getByText('active')
    disabledElement = warpper.getByText('disabled')

  })
  it('should render the correct Menu and MenuItem based on default props',()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')

  });
  it('click items should change active and call the right callback',()=>{
    const thirdElement = warpper.getByText('xyz')
    expect(thirdElement).not.toHaveClass('is-active')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
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
})