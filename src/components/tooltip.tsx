import React from 'react'
import Tippy from '@tippyjs/react'
import type { Placement } from 'tippy.js'

interface TooltipProps {
  placement?: Placement
  content: React.ReactNode
  children: React.ReactElement
}

export default function Tooltip({
  placement = 'top',
  content,
  children,
}: TooltipProps) {
  return (
    <Tippy
      placement={placement}
      animation={`custom-${placement}`}
      content={content}
    >
      {children}
    </Tippy>
  )
}
