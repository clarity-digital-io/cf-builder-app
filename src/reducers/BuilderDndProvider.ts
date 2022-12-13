type Error = {
  message: string
  display: boolean
}

export type BuilderDndProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availableFields: Array<any>
  activeAvailableFieldId: any | null | undefined
  formFields: Array<any>
  activeFormFieldId: any | null | undefined
  error: Error
  isLoading: boolean,
  handleDragEnd: (event: any) => void
  handleDragStart: (event: any) => void
  handleError: (message: any) => void
}


export const builderDndInitialState: BuilderDndProviderState = {
  availableFields: [],
  activeAvailableFieldId: null,
  formFields: [],
  activeFormFieldId: null,
  error: { message: '', display: false },
  isLoading: true,
  handleDragEnd: (any) => void any,
  handleDragStart: (any) => void any,
  handleError: (any) => void any
}

export type BuilderDndAction =
  | {
    type: 'SET_ACTIVE_FIELD_ID'
    activeAvailableFieldId?: BuilderDndProviderState['activeAvailableFieldId']
  }
  | {
    type: 'SET_AVAILABLE_FIELDS'
    availableFields: BuilderDndProviderState['availableFields']
    activeAvailableFieldId?: BuilderDndProviderState['activeAvailableFieldId']
  }
  | {
    type: 'SET_FORM_FIELDS'
    formFields: BuilderDndProviderState['formFields'],
    activeFormFieldId?: BuilderDndProviderState['activeFormFieldId']
  }
  | {
    type: 'SET_LOADING'
    isLoading: BuilderDndProviderState['isLoading']
  }
  | {
    type: 'SET_ERROR'
    error: BuilderDndProviderState['error']
  }
  | {
    type: 'RESET_DND_PROVIDER'
  }

export function builderDndReducer(
  state: BuilderDndProviderState,
  action: BuilderDndAction
): BuilderDndProviderState {
  switch (action.type) {
    case 'SET_ACTIVE_FIELD_ID':
      return { ...state, activeAvailableFieldId: action.activeAvailableFieldId }
    case 'SET_AVAILABLE_FIELDS':
      return { ...state, availableFields: action.availableFields, activeAvailableFieldId: action.activeAvailableFieldId }
    case 'SET_FORM_FIELDS':
      return { ...state, formFields: action.formFields, activeFormFieldId: action.activeFormFieldId }
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'RESET_DND_PROVIDER':
      return builderDndInitialState
    default:
      throw new Error()
  }
}
