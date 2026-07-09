import React from 'react'
import Tippy from '@tippyjs/react'
import type { Placement } from 'tippy.js'
import 'tippy.js/dist/tippy.css'

interface TooltipProps {
  placement?: Placement
  content: React.ReactNode
  children: React.ReactElement
  className? : string
}

export default function Tooltip({
  placement = 'top',
  content,
  children,
  className
}: TooltipProps) {
  return (
    <Tippy
      className={className}
      placement={placement}
      animation={`custom-${placement}`}
      content={content}
      theme="dashboard"
      duration={[180, 120]}
      delay={[50, 0]}
    >
      <span>{children}</span>
    </Tippy>
  )
}
