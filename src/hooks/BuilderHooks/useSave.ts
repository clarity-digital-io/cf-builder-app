import { useCallback, useEffect, useReducer } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderAction,
  BuilderProviderState,
} from '../../reducers'
import { Question__c } from '../../utils/types/sObjects';

export const useSave = (reducer: [BuilderProviderState, React.Dispatch<BuilderAction>]) => {

  const [state, dispatch] = reducer;

  const {
    dndQuestions,
    form,
    question,
    options,
    criteria,
  } = state;


  // just handle setting and method calls here
  // save in salesforce ('save button')
  // new questions
  // questions edited
  // - options added
  // - requirements
  // - criteria 
  // mapping (prefilled)

  // certain changes 

  // mapping will be saved from a popup
  const handleSave = useCallback(async () => {

    console.log({
      form,
      dndQuestions,
      question,
      options,
      criteria
    })

    const questions: Array<Question__c> = Object.keys(dndQuestions)
      .reduce((accum, value: any) => {
        const _questions: Array<Question__c> = dndQuestions[value];
        console.log({ _questions })
        return accum.concat(_questions);
      }, [] as Question__c[]);

    if (questions.length > 0) {
      // save
      await call(BuilderController.save, [questions]);

    }

    // check which controller method to call

    // save => all things that can possibly be changed
    // questions added
    // questions updated
    // questions deleted
    // question options 
    // question criteria

  }, [
    form,
    dndQuestions,
    question,
    options,
    criteria
  ]);

  return { handleSave }
}
