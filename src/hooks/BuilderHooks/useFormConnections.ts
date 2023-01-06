import { useCallback, useEffect } from 'react'
import { BuilderController } from '../../utils/constants/methods';
import { call } from '../../query';

import {
  BuilderProviderState,
  BuilderAction,
} from '../../reducers'
import { Form_Connection_Field__c, Form_Connection__c } from '../../utils/types/sObjects';

export const useFormConnections = (reducer: [BuilderProviderState, React.Dispatch<BuilderAction>]) => {

  const [state, dispatch] = reducer;

  const {
    formId,
    activeFormConnection,
    formConnections,
    formConnectionFields
  } = state;

  const addFormConnection = () => {

    const formConnectionSObject: Form_Connection__c = {
      id: formConnections.length.toString(),
      cforms__Form__c: formId,
      cforms__New__c: false,
      cforms__Result_Holder__c: '',
      cforms__Salesforce_Object__c: '',
      cforms__End_Date__c: ''
    }

    dispatch({
      type: 'SET_FORM_CONNECTION',
      activeFormConnection: formConnectionSObject,
    })
  }

  const setFormConnection = (connection: Form_Connection__c) => {
    dispatch({
      type: 'SET_FORM_CONNECTION',
      activeFormConnection: connection
    })
  }

  const addFormConnectionField = (isPrefill: boolean) => {
    if (!activeFormConnection) return;
    const formConnectionFieldSObject: Form_Connection_Field__c = {
      id: formConnections.length.toString(),
      cforms__Custom_Value__c: '',
      cforms__Form_Connection__c: activeFormConnection.id,
      cforms__PreFill__c: '',
      cforms__Question__c: '',
      cforms__Salesforce_Field__c: ''
    }

    dispatch({
      type: 'SET_FORM_CONNECTION',
      activeFormConnection: formConnectionSObject,
    })
  }

  // setFormFieldConnections

  return {
    formConnections,
    formConnectionFields,
    activeFormConnection,
    addFormConnection,
    setFormConnection
  }
}