import React, { createContext, useContext } from 'react'
import { useSetup } from '../hooks'
import {
  SetupProviderState,
  setupInitialState,
} from '../reducers'
import { Props } from '../utils/types'

// ready
const SetupContext = createContext<SetupProviderState>(
  setupInitialState
)

// not ready
export const SetupContextProvider = ({ children }: Props) => {
  const setupProviderState = useSetup()

  return (
    <SetupContext.Provider value={setupProviderState}>
      {children}
    </SetupContext.Provider>
  )
}

// ready
export function useSetupContext() {
  return useContext(SetupContext)
}
