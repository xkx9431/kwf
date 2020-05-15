import React,  { useState, createContext }from 'react'
import  classNames  from "classnames";
import { MenuItemProps } from './menuItem'


type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex:string) => void;
export interface MenuProps{
  defaultIndex ?: string;
  className?:string;
  mode ?: MenuMode;
  style ?: React.CSSProperties;
  onSelect ?:SelectCallback;
  defaultOpenSubMenuProps?:string[]
}

interface ImenuContext {
  index:string;
  onSelect?: SelectCallback;
  mode?:MenuMode;
  defaultOpenSubMenuProps?:string[]

}


export const MenuContext = createContext<ImenuContext>({ index : '0'} )
const Menu: React.FC<MenuProps> = (props) =>{
  const { className, mode, style, children, defaultIndex,onSelect,defaultOpenSubMenuProps } = props
  const classes = classNames('xkx-menu',className,{
    'menu-vertical': mode==='vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const [currentActive, setActive] = useState(defaultIndex)
  const handleSelect = (index:string) =>{
    setActive(index)
    if(onSelect){
      onSelect(index)
    }
  }
  const passedContext:ImenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect:handleSelect,
    mode,
    defaultOpenSubMenuProps
  }
  const renderChildren = ()=>{
    return React.Children.map(children,(child,index) =>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu'){
        return React.cloneElement(childElement,{
          index:index.toString()
        })
      }else{
        console.error("warning: MENU SHOULD HAVE THE CHILD WITH MENU ITEM PROPS")
      }
    })
  }

  return (
    <ul className = {classes} style = {style} data-testid = 'test-menu'> 
      <MenuContext.Provider value = {passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex:'0',
  mode:'horizontal',
  defaultOpenSubMenuProps:[]

}


export default Menu;