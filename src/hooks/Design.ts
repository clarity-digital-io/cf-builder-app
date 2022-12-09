import { useCallback, useEffect, useReducer } from 'react'
import { call } from '../components/RemoteActions';
import { useBuilderContext } from '../context/BuilderContext';

import {
  DesignProviderState,
  DesignAction,
  designInitialState,
  designReducer,
} from '../reducers'
import { BuilderController } from '../utils/constants/methods';

export const useDesign = () => {

  const [state, dispatch] = useReducer(
    designReducer,
    designInitialState
  );

  // get builder hook 

  // add new page to form 

  // fetch questions 

  // save the form with new questions (single or multi)

  // delete question

  // pageQuestionsDelete

  // handleBack 

  // handHelp 

  const {
    questions,
    questionToDelete,
    questionState
  } = state;

  return {
    questionState
  } as DesignProviderState
}
