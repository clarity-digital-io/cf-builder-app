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
    formConnections,
    formConnectionFields,
    allQuestions,
    allOptions,
    allCriteria,
    allFormConnections,
    allFormConnectionFields,
  } = state;
  // setAllOptions,
  // setAllCriteria,
  // setAllFormConnections,
  // setAllFormConnectionFields

  // all options - []
  const updateAllOptions = useCallback(() => {

    const updatedOptionIds = options.filter(option => option.id).map(option => option.id);
    const updatedOptionIdsRemovedFromAll = allOptions.filter(option => updatedOptionIds.indexOf(option.id) < 0)
    const _cleanedOptions = updatedOptionIdsRemovedFromAll.concat(options);

    dispatch({
      type: 'SET_ALL_OPTIONS',
      allOptions: _cleanedOptions
    })

  }, [options])

  useEffect(() => {
    if (options.length > 0) {
      updateAllOptions();
    }
  }, [options])

  // // all criteria - []
  const updateAllCriteria = useCallback(() => {
    const updatedCriteriaIds = criteria.filter(criterion => criterion.id).map(criterion => criterion.id);
    const updatedCriteriaIdsRemovedFromAll = allCriteria.filter(criterion => updatedCriteriaIds.indexOf(criterion.id) < 0)
    const _cleanedCriteria = updatedCriteriaIdsRemovedFromAll.concat(criteria);

    dispatch({
      type: 'SET_ALL_CRITERIA',
      allCriteria: _cleanedCriteria
    })
  }, [criteria])

  useEffect(() => {
    if (criteria.length > 0) {
      updateAllCriteria();
    }
  }, [criteria])

  // all connections - []
  const updateAllFormConnections = useCallback(() => {
    const updatedFormConnections = formConnections.filter(formConnection => formConnection.id).map(formConnection => formConnection.id);
    const updatedFormConnectionIdsRemovedFromAll = allFormConnections.filter(formConnection => updatedFormConnections.indexOf(formConnection.id) < 0)
    const _cleanedFormConnections = updatedFormConnectionIdsRemovedFromAll.concat(formConnections);

    dispatch({
      type: 'SET_ALL_FORM_CONNECTIONS',
      allFormConnections: _cleanedFormConnections
    })
  }, [formConnections])

  useEffect(() => {
    if (formConnections.length > 0) {
      updateAllFormConnections();
    }
  }, [formConnections])

  const updateAllFormConnectionFields = useCallback(() => {
    const updatedFormConnectionFields = formConnectionFields.filter(formConnectionField => formConnectionField.id).map(formConnectionField => formConnectionField.id);
    const updatedFormConnectionFieldIdsRemovedFromAll = allFormConnectionFields.filter(formConnectionField => updatedFormConnectionFields.indexOf(formConnectionField.id) < 0)
    const _cleanedFormConnectionFields = updatedFormConnectionFieldIdsRemovedFromAll.concat(formConnectionFields);

    dispatch({
      type: 'SET_ALL_FORM_CONNECTION_FIELDS',
      allFormConnectionFields: _cleanedFormConnectionFields
    })
  }, [formConnectionFields])

  useEffect(() => {
    if (formConnectionFields.length > 0) {
      updateAllFormConnectionFields();
    }
  }, [formConnectionFields])

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

  const updateAllQuestions = useCallback(() => {

    const questions: Array<Question__c> = Object.keys(dndQuestions)
      .reduce((accum, value: any) => {
        const _questions: Array<Question__c> = dndQuestions[value];
        return accum.concat(_questions);
      }, [] as Question__c[]);

    dispatch({
      type: 'SET_ALL_QUESTIONS',
      allQuestions: questions,
      allQuestionsCombo: questions.map((question: Question__c) => {
        return { id: question.id, label: question.cforms__Title__c, type: question.cforms__Type__c }
      })
    })

  }, [dndQuestions])

  useEffect(() => {
    if (Object.keys(dndQuestions).length > 0) {
      updateAllQuestions();
    }

  }, [dndQuestions])

  const handleSave = useCallback(async () => {

    console.log({
      form,
      allQuestions,
      allOptions,
      allCriteria,
      allFormConnections,
      allFormConnectionFields
    })

    // prepare form 

    // prepare allQuestions

    // prepare allOptions

    // prepare allCriteria

    // prepare allPictureOptions

    // prepare allFormConnections

    // prepare allFormFieldConnections

    // save
    const sForm = JSON.stringify(form);
    const sAllQuestions = JSON.stringify(allQuestions);
    const sAllOptions = JSON.stringify(allOptions);
    const sAllCriteria = JSON.stringify(allCriteria);

    const status = await call(
      BuilderController.save,
      [
        sForm,
        [sAllQuestions, sAllOptions, sAllCriteria]
      ]
    )

    console.log({ status })

    // const questions: Array<Question__c> = Object.keys(dndQuestions)
    //   .reduce((accum, value: any) => {
    //     const _questions: Array<Question__c> = dndQuestions[value];
    //     console.log({ _questions })
    //     return accum.concat(_questions);
    //   }, [] as Question__c[]);

    // if (questions.length > 0) {

    //   console.log({ questions })
    //   // save
    //   // await call(BuilderController.save, [questions]);

    // }

    // check which controller method to call

    // save => all things that can possibly be changed
    // questions added
    // questions updated
    // questions deleted
    // question options 
    // question criteria

  }, [
    form,
    allQuestions,
    allOptions,
    allCriteria,
    allFormConnections,
    allFormConnectionFields
  ]);

  return { handleSave }
}

