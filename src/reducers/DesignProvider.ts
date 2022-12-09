export enum QuestionStates {
  NEW,
  EDIT,
  LOGIC,
  SF
}

export type DesignProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questionOptions: any | null | undefined
  addPageUpdate: any | null | undefined
  navQuestion: any | null | undefined
  sObjects: any | null | undefined
  recordGroup: any | null | undefined
  questionToDelete: any | null | undefined
  questionUpdate: any | null | undefined
  questionState: QuestionStates
  activeQuestion: any | null | undefined
  update: any | null | undefined
  questions: any | null | undefined
  pages: any | null | undefined
  activePage: any | null | undefined
  activePageQuestions: any | null | undefined
}


export const designInitialState: DesignProviderState = {
  questions: null,
  questionToDelete: null,
  questionState: QuestionStates.NEW,

  questionOptions: null,
  addPageUpdate: null,
  navQuestion: null,
  sObjects: [],
  recordGroup: [],
  questionUpdate: [],
  activeQuestion: null,
  update: null,
  pages: null,
  activePage: null,
  activePageQuestions: null
}

export type DesignAction =
  | {
    type: 'SET_QUESTIONS'
    questions?: DesignProviderState['questions']
  }
  | {
    type: 'SET_DELETE_QUESTIONS'
    questionToDelete?: DesignProviderState['questionToDelete']
  }
  | {
    type: 'RESET_DESIGN_PROVIDER'
  }

export function designReducer(
  state: DesignProviderState,
  action: DesignAction
): DesignProviderState {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions }
    case 'SET_DELETE_QUESTIONS':
      return { ...state, questionToDelete: action.questionToDelete }
    case 'RESET_DESIGN_PROVIDER':
      return designInitialState
    default:
      throw new Error()
  }
}
