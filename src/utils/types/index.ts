import React from 'react';

export interface Props {
  children?: React.Node
}

export interface ButtonProps extends Props {
  variant?: string
  onClick?: (v: any) => any
  disabled?: boolean
}

export interface SelectProps extends Props {
  disabled?: boolean
  key?: string
  placeholder?: string
  options?: any
  value?: any
  onChange?: any
  order?: any
  valueField?: any
  labelField?: any
  setLabel?: any
}
