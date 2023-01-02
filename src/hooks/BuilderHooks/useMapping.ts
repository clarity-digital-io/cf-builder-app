import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderAction,
  builderInitialState,
  builderReducer,
} from '../../reducers'

export const useMapping = () => {

  const [state, dispatch] = useReducer(
    builderReducer,
    builderInitialState
  );

  // just handle setting and method calls here


  return {} as BuilderProviderState
}
