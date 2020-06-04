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
  onClick?:any;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


/**
 * 这是我们的第一个button 组件
 *
 * `import {Button} from 'kwf'`
 */
export const Button: React.FC<BaseButtonProps> = (props) =>{
  const {
    /**设置Button 类型 */
    btnType,
    /**设置Button 禁用 */
    disabled,
    /**设置Button 大小 */
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