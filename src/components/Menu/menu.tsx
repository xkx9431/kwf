import React,  { useState, createContext }from 'react'
import  classNames  from "classnames";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex:number) => void;
export interface MenuProps{
  defaultIndex ?: number;
  className?:string;
  mode ?: MenuMode;
  style ?: React.CSSProperties;
  onSelect ?:SelectCallback;
}

interface ImenuContext {
  index:number;
  onSelect?: SelectCallback;
}


export const MenuContext = createContext<ImenuContext>({ index : 0} )
const Menu: React.FC<MenuProps> = (props) =>{
  const { className, mode, style, children, defaultIndex,onSelect } = props
  const classes = classNames('xkx-menu',className,{
    'menu-vertical': mode==='vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const [currentActive, setActive] = useState(defaultIndex)
  const handleSelect = (index:number) =>{
    setActive(index)
    if(onSelect){
      onSelect(index)
    }
  }
  const passedContext:ImenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect:handleSelect,
  }
  return (
    <ul className = {classes} style = {style} data-testid = 'test-menu'> 
      <MenuContext.Provider value = {passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex:0,
  mode:'horizontal'
}


export default Menu;