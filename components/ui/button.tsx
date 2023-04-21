import * as React from 'react'

export function Button(props: {
  onClick?: () => void
  icon?: JSX.Element
  text?: string
  bordered?: boolean
  className?: string
  title?: string
}) {
  return (
    <div
      className={`bg-white hover:bg-gray-100 py-1 px-1.5 rounded-md items-center justify-center flex shadow-sm cursor-pointer select-none overflow-hidden transition ${props.className}`}
      onClick={props.onClick}
      title={props.title}
    >
      {props.icon && <div className={'icon-button-icon'}>{props.icon}</div>}
      {props.text && <div className="text-xs">{props.text}</div>}
    </div>
  )
}
