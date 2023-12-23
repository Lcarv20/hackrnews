import React from 'react'
import { twJoin } from 'tailwind-merge'

type PillProps = {
  variant?: 'primary' | 'ghost'
  children?: React.ReactNode
}

export default function Pill(props: PillProps) {
  return (
  <span
      className={
        twJoin(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium',
          props.variant === 'primary' ? 'bg-primary text-surface1' : 'bg-surface1 text-primary border border-primary',
        )
      }
    >
      {props.children}
    </span>
  )
}
