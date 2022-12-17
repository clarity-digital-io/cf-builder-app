import React, { createContext, useContext, ReactElement } from 'react'
import { useEditForm } from '../hooks'
import {
  EditFormProviderState,
  editFormInitialState,
} from '../reducers'

// ready
const EditFormContext = createContext<EditFormProviderState>(
  editFormInitialState
)

interface Props {
  children: ReactElement | ReactElement[]
}

// not ready
export const EditFormContextProvider = ({ children }: Props) => {
  const editFormProviderState = useEditForm()

  return (
    <EditFormContext.Provider value={editFormProviderState}>
      {children}
    </EditFormContext.Provider>
  )
}

// ready
export function useEditFormContext() {
  return useContext(EditFormContext)
}
