import { ImageListType } from "react-images-uploading"
import { FieldType } from "../utils/constants/fields"
import { ComboQuestionField } from "../utils/types/fields"
import { Form_Connection_Field__c, Form_Connection__c, Form__c, Question_Criteria__c, Question_Option__c, Question__c } from "../utils/types/sObjects"

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
  formId: string
  availableFields: Array<FieldType>
  form: Form__c | null
  dndQuestions: Record<number, Array<Question__c>> // questions by page 
  error: Error
  isLoading: any | null | undefined
  navState: NavStates // may move
  // activeConnection: any | null | undefined // may move
  // activeFieldMapping: any | null | undefined // may move
  // activeFieldPrefills: any | null | undefined // may move
  // activeFields: any | null | undefined // may move

  question: Question__c | null

  //criteria 
  criteria: Array<Question_Criteria__c>

  // question options (active)
  options: Array<Question_Option__c>
  pictureOptions: ImageListType

  // form connections (active)
  // activeFormConnection: Form_Connection__c,
  formConnectionId: string | null,
  formConnections: Array<Form_Connection__c>
  formConnectionFields: Array<Form_Connection_Field__c>

  // save all 
  allQuestionsCombo: ComboQuestionField[],
  allQuestions: Question__c[]
  allOptions: Array<Question_Option__c>
  allCriteria: Array<Question_Criteria__c>
  allFormConnections: Array<Form_Connection__c>
  allFormConnectionFields: Array<Form_Connection_Field__c>

  // setAllOptions: (connection: Array<Question_Option__c>) => void,
  // setAllCriteria: (connection: Array<Question_Criteria__c>) => void,
  // setAllFormConnections: (connection: Array<Form_Connection__c>) => void,
  // setAllFormConnectionFields: (connections: Array<Form_Connection_Field__c>) => void,

  initFormConnection: (formConnectionId: string) => void
  setNewFormConnection: (connection: Form_Connection__c) => void
  handleUpdateFormConnections: (connection: Form_Connection__c[]) => void
  handleRemoveFormConnection: (index: number) => void

  setNewFormConnectionField: (connectionField: Form_Connection_Field__c) => void
  handleUpdateFormConnectionField: (connectionFields: Form_Connection_Field__c[]) => void
  handleRemoveFormConnectionField: (index: number) => void

  setNewCriterion: (criterion: Question_Criteria__c) => void
  handleRemoveCriterion: (index: number) => void
  handleUpdateCriteria: (criteria: Question_Criteria__c[]) => void

  setNewOption: (option: Question_Option__c, isPictureChoice: boolean) => void
  handleDrageUpdateOptions: (activeIndex: number, overIndex: number, isPictureChoice?: boolean) => void
  handleUpdatePictureOption: (pictureOptions: ImageListType) => void
  handleUpdateOptions: (options: Question_Option__c[]) => void
  handleRemoveOptions: (index: number, isPictureChoice?: boolean) => void

  initQuestionEdit: (question: Question__c | null) => void
  setQuestionUpdate: (question: Question__c | null) => void

  setFormUpdate: (form: any) => void
  setDndQuestion: (questions: any, availableFields?: any) => void
  handleFormStatusUpdate: (status: any) => void
  handleFormUpdate: (form: any) => void
  handleNavigate: (location: any) => void
  handleSave: (values: any) => void
  handleError: (message: any) => void
}


export const builderInitialState: BuilderProviderState = {
  formId: '',
  availableFields: [],
  form: null,
  dndQuestions: {},
  error: { message: '', display: false },
  isLoading: true,
  // activeConnection: [],
  // activeFieldMapping: [],
  // activeFieldPrefills: null,
  // activeFields: [],
  navState: NavStates.QUESTIONS,

  question: null,
  criteria: [],
  options: [],
  pictureOptions: [],

  // activeFormConnection: null,
  formConnectionId: null,
  formConnections: [],
  formConnectionFields: [],

  allQuestionsCombo: [],
  allQuestions: [],
  allOptions: [],
  allCriteria: [],
  allFormConnections: [],
  allFormConnectionFields: [],

  // setAllOptions: (any) => void any,
  // setAllCriteria: (any) => void any,
  // setAllFormConnections: (any) => void any,
  // setAllFormConnectionFields: (any) => void any,

  initFormConnection: (any) => void any,
  setNewFormConnection: (any) => void any,
  handleUpdateFormConnections: (any) => void any,
  handleRemoveFormConnection: (any) => void any,

  setNewFormConnectionField: (any) => void any,
  handleUpdateFormConnectionField: (any) => void any,
  handleRemoveFormConnectionField: (any) => void any,


  setNewCriterion: (any) => void any,
  handleRemoveCriterion: (any) => void any,
  handleUpdateCriteria: (any) => void any,

  setNewOption: (any) => void any,
  handleDrageUpdateOptions: (any) => void any,
  handleUpdatePictureOption: (any) => void any,
  handleUpdateOptions: (any) => void any,
  handleRemoveOptions: (any) => void any,

  initQuestionEdit: (any) => void any,
  setQuestionUpdate: (any) => void any,

  setFormUpdate: (any) => void any,
  setDndQuestion: (any) => void any,
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
    allQuestions: BuilderProviderState['allQuestions'],
    dndQuestions: BuilderProviderState['dndQuestions'],
  }
  | {
    type: 'SET_DROP_QUESTION'
    dndQuestions: BuilderProviderState['dndQuestions'],
  }
  // | {
  //   type: 'SET_CONNECTIONS'
  //   connections?: BuilderProviderState['connections']
  // }
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
    type: 'SET_UPDATE_CRITERIA',
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
  | {
    type: 'SET_ACTIVE_FORM_CONNECTION',
    formConnectionId: BuilderProviderState['formConnectionId'],
  }
  | {
    type: 'SET_NEW_FORM_CONNECTION',
    formConnections: BuilderProviderState['formConnections'],
  }
  | {
    type: 'SET_UPDATE_FORM_CONNECTIONS',
    formConnections: BuilderProviderState['formConnections'],
  }
  | {
    type: 'SET_NEW_FORM_CONNECTION_FIELD',
    formConnectionFields: BuilderProviderState['formConnectionFields'],
  }
  | {
    type: 'SET_UPDATE_FORM_CONNECTION_FIELDS',
    formConnectionFields: BuilderProviderState['formConnectionFields'],
  }
  | {
    type: 'SET_ALL_QUESTIONS',
    allQuestions: BuilderProviderState['allQuestions'],
    allQuestionsCombo: BuilderProviderState['allQuestionsCombo']
  }
  | {
    type: 'SET_ALL_OPTIONS',
    allOptions: BuilderProviderState['allOptions']
  }
  | {
    type: 'SET_ALL_CRITERIA',
    allCriteria: BuilderProviderState['allCriteria']
  }
  | {
    type: 'SET_ALL_FORM_CONNECTIONS',
    allFormConnections: BuilderProviderState['allFormConnections']
  }
  | {
    type: 'SET_ALL_FORM_CONNECTION_FIELDS',
    allFormConnectionFields: BuilderProviderState['allFormConnectionFields']
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
      return { ...state, form: action.form }
    case 'SET_QUESTIONS':
      return { ...state, allQuestions: action.allQuestions, dndQuestions: action.dndQuestions }
    case 'SET_DROP_QUESTION':
      return { ...state, dndQuestions: action.dndQuestions }
    case 'SET_NAV_STATE':
      return { ...state, navState: action.navState }
    case 'INIT_QUESTION':
      return { ...state, question: action.question, criteria: action.criteria, options: action.options }
    case 'SET_QUESTION':
      return { ...state, question: action.question }
    case 'SET_NEW_CRITERION':
    case 'SET_UPDATE_CRITERIA':
      return { ...state, criteria: action.criteria }
    case 'SET_NEW_OPTION':
    case 'SET_UPDATE_OPTIONS':
      return { ...state, options: action.options }
    case 'SET_NEW_PICTURE_OPTION':
    case 'SET_UPDATE_PICTURE_OPTIONS':
      return { ...state, pictureOptions: action.pictureOptions }
    case 'SET_ACTIVE_FORM_CONNECTION':
      return { ...state, formConnectionId: action.formConnectionId }
    case 'SET_NEW_FORM_CONNECTION':
    case 'SET_UPDATE_FORM_CONNECTIONS':
      return { ...state, formConnections: action.formConnections }
    case 'SET_NEW_FORM_CONNECTION_FIELD':
    case 'SET_UPDATE_FORM_CONNECTION_FIELDS':
      return { ...state, formConnectionFields: action.formConnectionFields }
    case 'SET_ALL_QUESTIONS':
      return { ...state, allQuestions: action.allQuestions, allQuestionsCombo: action.allQuestionsCombo }
    case 'SET_ALL_OPTIONS':
      return { ...state, allOptions: action.allOptions }
    case 'SET_ALL_CRITERIA':
      return { ...state, allCriteria: action.allCriteria }
    case 'SET_ALL_FORM_CONNECTIONS':
      return { ...state, allFormConnections: action.allFormConnections }
    case 'SET_ALL_FORM_CONNECTION_FIELDS':
      return { ...state, allFormConnectionFields: action.allFormConnectionFields }
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
