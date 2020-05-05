import React,{FC, ButtonHTMLAttributes,AnchorHTMLAttributes} from 'react';
import classnames from 'classnames';
export enum ButtonSize{
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className ?: string;
  disabled?: boolean;
  size?:ButtonSize;
  btnType?:ButtonType;
  children: React.ReactNode;
  href ?: string;
}
type NativeButtonProps = BaseButtonProps& ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps& AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps&AnchorButtonProps>


/**
 * 
 * import {Button} from 'kwf'
 */
const Button: React.FC<BaseButtonProps> = (props) =>{
  const {
    btnType,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props
  // btn,btn-lg
  const classes = classnames('btn',{
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    'disabled':(btnType===ButtonType.Link)&&disabled
  })
  if(btnType===ButtonType.Link&&href){
    return(
    <a href ={href}
      {...restProps}
      className = {classes}>
        {children}
    </a>    
    )
  }else{
    return(
      <button
      className ={classes}
      disabled = {disabled}
      {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled:false,
  btnType:ButtonType.Default
}

export default Button;