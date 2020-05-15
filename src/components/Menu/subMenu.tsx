import React, { useContext, useState } from 'react';
import  classNames  from "classnames";
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition  from '../Transition/transition'

export interface SubMenuProps{
  index?: string;
  title:string;
  className?:string
}


const SubMenu:React.FC<SubMenuProps> = ({index,title,children,className})=>{
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenuProps as Array<string>
  const isopened = (index&&context.mode==='vertical') ? openedSubMenus.includes(index):false
  const[menuOpen,setOpen] = useState(isopened)
  
  const  classes = classNames('menu-item submenu-item',className,{
    'is-active':context.index === index,
    'is-opened':menuOpen,
    'is-vetical':context.mode==='vertical'
  })
  let timer:any;
  const handleMouse = (e: React.MouseEvent,toggle:boolean)=>{
    clearTimeout(timer);
    e.preventDefault()
    timer = setTimeout(()=>{
      setOpen(toggle)
    },300)

  }
  const handleClick = (e: React.MouseEvent)=>{e.preventDefault();setOpen(!menuOpen)}
  const handleClickEvent = context.mode === 'vertical' ? {onClick:handleClick} :{}
  const handleHoverEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e:React.MouseEvent) =>{handleMouse(e,true)},
    onMouseLeave: (e:React.MouseEvent) =>{handleMouse(e,false)}
  } :{}
  const renderChildren = ()=>{
    const subMenuClass = classNames('xkx-submenu',{
      'menu-opened':menuOpen
    })
    const childrenComp = React.Children.map(children,(child,i)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem'){
        return React.cloneElement(childElement,{
          index:`${index}-${i}`
        })
      } else{
        console.error('menu should have children element with menuitem props')
      }
    })
    return(
      <Transition
        in = {menuOpen}
        timeout = {300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClass}>
          {childrenComp}
      </ul>
      </Transition>

    ) 
  }
  return(
    <li key={index} className = {classes} {...handleHoverEvent}>
      <div className="submenu-title" {...handleClickEvent}>
        {title}
        <Icon icon="angle-down" className= "arrow-icon"/>
      </div>
      { renderChildren() }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu;