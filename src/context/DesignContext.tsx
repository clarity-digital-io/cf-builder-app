import React, { ReactChild, createContext, useContext } from 'react'
import { useDesign } from '../hooks'
import {
  DesignProviderState,
  designInitialState,
} from '../reducers'

// ready
const DesignContext = createContext<DesignProviderState>(
  designInitialState
)

interface Props {
  children: ReactChild | ReactChild[]
}

// not ready
export const DesignContextProvider = ({ children }: Props) => {
  const designProviderState = useDesign()

  return (
    <DesignContext.Provider value={designProviderState}>
      {children}
    </DesignContext.Provider>
  )
}

// ready
export function useDesignContext() {
  return useContext(DesignContext)
}
