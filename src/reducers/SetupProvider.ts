export type ComboSObject = {
  id: number,
  label: string
  type: string
}

export type SetupProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sObjects: Array<ComboSObject>
  sObjectFields: Array<string>
  handleError: (message: any) => void
}


export const setupInitialState: SetupProviderState = {
  sObjects: [],
  sObjectFields: [],
  handleError: (any) => void any
}

export type SetupAction =
  | {
    type: 'SET_SOBJECTS'
    sObjects: SetupProviderState['sObjects']
  }
  | {
    type: 'RESET_SETUP_PROVIDER'
  }

export function setupReducer(
  state: SetupProviderState,
  action: SetupAction
): SetupProviderState {
  switch (action.type) {
    case 'SET_SOBJECTS':
      return { ...state, sObjects: action.sObjects }
    case 'RESET_SETUP_PROVIDER':
      return setupInitialState
    default:
      throw new Error()
  }
}
