import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderAction,
  builderInitialState,
  builderReducer,
} from '../../reducers'
export const useError = () => {

  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  const handleError = (message: any) => {
    dispatch({
      type: 'SET_ERROR',
      error: message
    })
  }


  return { handleError }
}
