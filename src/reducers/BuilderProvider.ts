import { ImageListType } from "react-images-uploading"
import { Form_Connection_Field__c, Form_Connection__c, Question_Criteria__c, Question_Option__c, Question__c } from "../utils/types/sObjects"

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

export type Questions = {
  [key: string]: Question__c
}

export type BuilderProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formId: any | null | undefined
  availableFields: Array<any>
  form: any | null | undefined
  questions: Question__c[]
  dndQuestions: Record<number, Array<Question__c>> // questions by page 
  connections: any | null | undefined
  error: Error
  isLoading: any | null | undefined
  navState: NavStates // may move
  // activeConnection: any | null | undefined // may move
  activeFieldMapping: any | null | undefined // may move
  activeFieldPrefills: any | null | undefined // may move
  activeFields: any | null | undefined // may move

  question: Question__c | null

  //criteria 
  criteria: Array<any> | null

  // question options 
  options: Array<any>
  pictureOptions: ImageListType

  // form connections
  activeFormConnection: Form_Connection__c | null,
  formConnections: Array<Form_Connection__c>
  formConnectionFields: Array<Form_Connection_Field__c>

  addFormConnection: () => void
  setFormConnection: (connection: Form_Connection__c) => void,

  setNewCriterion: (criterion: Question_Criteria__c) => void
  setNewOption: (option: Question_Option__c, isPictureChoice: boolean) => void

  handleDrageUpdateOptions: (activeIndex: number, overIndex: number, isPictureChoice?: boolean) => void
  handleUpdatePictureOption: (pictureOptions: ImageListType) => void
  handleUpdateOptions: (options: Question_Option__c[]) => void
  handleRemoveOptions: (index: number, isPictureChoice?: boolean) => void

  initQuestionEdit: (question: Question__c | null) => void
  setQuestionUpdate: (question: Question__c | null) => void

  setFormUpdate: (form: any) => void
  setDndQuestion: (questions: any, availableFields?: any) => void
  handleQuestionsUpdate: (questions: any) => void
  handleFormStatusUpdate: (status: any) => void
  handleFormUpdate: (form: any) => void
  handleNavigate: (location: any) => void
  handleSave: (values: any) => void
  handleError: (message: any) => void
}


export const builderInitialState: BuilderProviderState = {
  formId: null,
  availableFields: [],
  form: null,
  questions: [],
  dndQuestions: {},
  connections: null,
  error: { message: '', display: false },
  isLoading: true,
  // activeConnection: [],
  activeFieldMapping: [],
  activeFieldPrefills: null,
  activeFields: [],
  navState: NavStates.QUESTIONS,

  question: null,
  criteria: null,

  options: [],
  pictureOptions: [],

  activeFormConnection: null,
  formConnections: [],
  formConnectionFields: [],

  addFormConnection: () => void {},
  setFormConnection: (any) => void any,

  setNewCriterion: (any) => void any,

  setNewOption: (any) => void any,
  handleDrageUpdateOptions: (any) => void any,
  handleUpdatePictureOption: (any) => void any,
  handleUpdateOptions: (any) => void any,
  handleRemoveOptions: (any) => void any,

  initQuestionEdit: (any) => void any,
  setQuestionUpdate: (any) => void any,

  setFormUpdate: (any) => void any,
  setDndQuestion: (any) => void any,
  handleQuestionsUpdate: (any) => void any,
  handleFormStatusUpdate: (any) => void any,
  handleFormUpdate: (any) => void any,
  handleNavigate: (any) => void any,
  handleSave: (any) => void any,

  handleError: (any) => void any
}

export type BuilderAction =
  | {
    type: 'SET_FORM_ID'
    formId?: BuilderProviderState['formId']
  }
  | {
    type: 'SET_AVAILABLE_FIELDS'
    availableFields: BuilderProviderState['availableFields']
  }
  | {
    type: 'SET_FORM'
    form?: BuilderProviderState['form']
  }
  | {
    type: 'SET_QUESTIONS'
    questions: BuilderProviderState['questions'],
    dndQuestions: BuilderProviderState['dndQuestions'],
  }
  | {
    type: 'SET_DROP_QUESTION'
    dndQuestions: BuilderProviderState['dndQuestions'],
  }
  | {
    type: 'UPDATE_QUESTIONS',
    questions: BuilderProviderState['questions']
  }
  | {
    type: 'SET_CONNECTIONS'
    connections?: BuilderProviderState['connections']
  }
  | {
    type: 'INIT_QUESTION',
    question: BuilderProviderState['question']
    options: BuilderProviderState['options']
    criteria: BuilderProviderState['criteria']
  }
  | {
    type: 'SET_QUESTION',
    question: BuilderProviderState['question']
  }
  | {
    type: 'SET_NEW_CRITERION',
    criteria: BuilderProviderState['criteria']
  }
  | {
    type: 'SET_NEW_OPTION',
    options: BuilderProviderState['options'],
  }
  | {
    type: 'SET_UPDATE_OPTIONS',
    options: BuilderProviderState['options'],
  }
  | {
    type: 'SET_NEW_PICTURE_OPTION',
    pictureOptions: BuilderProviderState['pictureOptions']
  }
  | {
    type: 'SET_UPDATE_PICTURE_OPTIONS',
    pictureOptions: BuilderProviderState['pictureOptions']
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
    type: 'SET_NAV_STATE'
    navState: BuilderProviderState['navState']
  }
  // | {
  //   type: 'SET_ACTIVE_CONNECTIONS'
  //   activeConnection?: BuilderProviderState['activeConnection']
  // }
  | {
    type: 'SET_ACTIVE_FIELDS'
    activeFields?: BuilderProviderState['activeFields']
    activeFieldMapping?: BuilderProviderState['activeFieldMapping']
    activeFieldPrefills?: BuilderProviderState['activeFieldPrefills']
  }
  | {
    type: 'SET_FORM_CONNECTIONS',
    formConnections: BuilderProviderState['formConnections']
  }
  | {
    type: 'SET_FORM_CONNECTION',
    activeFormConnection: BuilderProviderState['activeFormConnection']
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
    case 'SET_AVAILABLE_FIELDS':
      return { ...state, availableFields: action.availableFields }
    case 'SET_FORM':
      console.log('set_form', action)
      return { ...state, form: action.form }
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions, dndQuestions: action.dndQuestions }
    case 'SET_DROP_QUESTION':
      return { ...state, dndQuestions: action.dndQuestions }
    case 'UPDATE_QUESTIONS':
      return { ...state, questions: action.questions }
    case 'SET_CONNECTIONS':
      return { ...state, connections: action.connections }
    case 'SET_NAV_STATE':
      return { ...state, navState: action.navState }
    // case 'SET_ACTIVE_CONNECTIONS':
    //   return { ...state, activeConnection: action.activeConnection }
    case 'SET_ACTIVE_FIELDS':
      return {
        ...state,
        activeFields: action.activeFields,
        activeFieldMapping: action.activeFieldMapping,
        activeFieldPrefills: action.activeFieldPrefills
      }
    case 'SET_FORM_CONNECTIONS':
      return {
        ...state,
        formConnections: action.formConnections
      }
    case 'SET_FORM_CONNECTION':
      return {
        ...state,
        activeFormConnection: action.activeFormConnection,
      }
    case 'INIT_QUESTION':
      return { ...state, question: action.question, criteria: action.criteria, options: action.options }
    case 'SET_QUESTION':
      return { ...state, question: action.question }
    case 'SET_NEW_CRITERION':
      return { ...state, criteria: action.criteria }
    case 'SET_NEW_OPTION':
    case 'SET_UPDATE_OPTIONS':
      return { ...state, options: action.options }
    case 'SET_NEW_PICTURE_OPTION':
    case 'SET_UPDATE_PICTURE_OPTIONS':
      return { ...state, pictureOptions: action.pictureOptions }
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
