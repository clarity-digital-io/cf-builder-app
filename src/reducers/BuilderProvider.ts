export enum NavStates {
  QUESTIONS,
  CONNECT,
  MAPPING,
  SETTINGS,
  EDIT
}

type Error = {
  message: string
  display: boolean
}

export type BuilderProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formId: any | null | undefined
  error: Error
  isLoading: any | null | undefined
  activeConnection: any | null | undefined
  activeFieldMapping: any | null | undefined
  activeFieldPrefills: any | null | undefined
  activeFields: any | null | undefined
  connections: any | null | undefined
  form: any | null | undefined
  navState: NavStates
  sObjects: any | null | undefined
  handleFormUpdate: (status: any) => void
  handleNavigate: (location: any) => void
  handleError: (message: any) => void
}


export const builderInitialState: BuilderProviderState = {
  formId: null,
  error: { message: '', display: false },
  isLoading: true,
  activeConnection: [],
  activeFieldMapping: [],
  activeFieldPrefills: null,
  activeFields: [],
  connections: null,
  form: null,
  navState: NavStates.QUESTIONS,
  sObjects: null,
  handleFormUpdate: (any) => void any,
  handleNavigate: (any) => void any,
  handleError: (any) => void any
}

export type BuilderAction =
  | {
    type: 'SET_FORM_ID'
    formId?: BuilderProviderState['formId']
  }
  | {
    type: 'SET_NAV_STATE'
    navState: BuilderProviderState['navState']
  }
  | {
    type: 'SET_CONNECTIONS'
    connections?: BuilderProviderState['connections']
  }
  | {
    type: 'SET_SOBJECTS'
    sObjects?: BuilderProviderState['sObjects']
  }
  | {
    type: 'SET_ACTIVE_CONNECTIONS'
    activeConnection?: BuilderProviderState['activeConnection']
  }
  | {
    type: 'SET_ACTIVE_FIELDS'
    activeFields?: BuilderProviderState['activeFields']
    activeFieldMapping?: BuilderProviderState['activeFieldMapping']
    activeFieldPrefills?: BuilderProviderState['activeFieldPrefills']
  }
  | {
    type: 'SET_FORM'
    form?: BuilderProviderState['form']
  }
  | {
    type: 'SET_LOADING'
    isLoading?: BuilderProviderState['isLoading']
  }
  | {
    type: 'SET_ERROR'
    error: BuilderProviderState['error']
  }
  | {
    type: 'RESET_BUILDER_PROVIDER'
  }

export function builderReducer(
  state: BuilderProviderState,
  action: BuilderAction
): BuilderProviderState {
  switch (action.type) {
    case 'SET_FORM_ID':
      return { ...state, formId: action.formId }
    case 'SET_NAV_STATE':
      return { ...state, navState: action.navState }
    case 'SET_CONNECTIONS':
      return { ...state, connections: action.connections }
    case 'SET_SOBJECTS':
      return { ...state, sObjects: action.sObjects }
    case 'SET_ACTIVE_CONNECTIONS':
      return { ...state, activeConnection: action.activeConnection }
    case 'SET_ACTIVE_FIELDS':
      return {
        ...state,
        activeFields: action.activeFields,
        activeFieldMapping: action.activeFieldMapping,
        activeFieldPrefills: action.activeFieldPrefills
      }
    case 'SET_FORM':
      return { ...state, form: action.form }
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'RESET_BUILDER_PROVIDER':
      return builderInitialState
    default:
      throw new Error()
  }
}
