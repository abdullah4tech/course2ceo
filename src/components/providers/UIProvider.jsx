import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

export function UIProvider({ children }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}