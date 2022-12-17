import { Question_Criteria__c, Question__c } from "../utils/types/sObjects"

type Error = {
  message: string
  display: boolean
}

export type EditFormProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: Question__c | null
  options: Array<any> | null
  criteria: Array<any> | null
  error: Error
  setNewCriterion: (criterion: Question_Criteria__c) => void
  setQuestionUpdate: (question: Question__c | null) => void
  handleSaveQuestion: (message: any) => void
  handleSaveQuestionWithOptions: (message: any) => void
  handleSaveQuestionWithCriteria: (message: any) => void
  handleError: (message: any) => void
}


export const editFormInitialState: EditFormProviderState = {
  question: null,
  options: null,
  criteria: null,
  error: { message: '', display: false },
  setNewCriterion: (any) => void any,
  setQuestionUpdate: (any) => void any,
  handleSaveQuestion: (any) => void any,
  handleSaveQuestionWithOptions: (any) => void any,
  handleSaveQuestionWithCriteria: (any) => void any,
  handleError: (any) => void any
}

export type EditFormAction =
  | {
    type: 'SET_QUESTION',
    question: EditFormProviderState['question']
    options: EditFormProviderState['options']
    criteria: EditFormProviderState['criteria']
  }
  | {
    type: 'SET_NEW_CRITERION',
    criteria: EditFormProviderState['criteria']
  }
  | {
    type: 'SET_ERROR'
    error: EditFormProviderState['error']
  }
  | {
    type: 'RESET_EDIT_FORM_PROVIDER'
  }

export function editFormReducer(
  state: EditFormProviderState,
  action: EditFormAction
): EditFormProviderState {
  switch (action.type) {
    case 'SET_QUESTION':
      return { ...state, question: action.question, criteria: action.criteria, options: action.options }
    case 'SET_NEW_CRITERION':
      return { ...state, criteria: action.criteria }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'RESET_EDIT_FORM_PROVIDER':
      return editFormInitialState
    default:
      throw new Error()
  }
}
