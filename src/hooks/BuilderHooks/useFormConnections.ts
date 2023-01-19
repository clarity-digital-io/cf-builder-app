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
    formConnectionId,
    formConnections,
    formConnectionFields,
    allFormConnections,
    allFormConnectionFields
  } = state;

  // const addFormConnection = () => {

  //   const formConnectionSObject: Form_Connection__c = {
  //     id: formConnections.length.toString(),
  //     cforms__Form__c: formId,
  //     cforms__New__c: false,
  //     cforms__Result_Holder__c: '',
  //     cforms__Salesforce_Object__c: '',
  //     cforms__End_Date__c: ''
  //   }

  //   dispatch({
  //     type: 'SET_FORM_CONNECTION',
  //     activeFormConnection: formConnectionSObject,
  //   })
  // }

  // const setFormConnection = (connection: Form_Connection__c) => {
  //   dispatch({
  //     type: 'SET_FORM_CONNECTION',
  //     activeFormConnection: connection
  //   })
  // }

  // const addFormConnectionField = (isPrefill: boolean) => {
  //   if (!activeFormConnection) return;
  //   const formConnectionFieldSObject: Form_Connection_Field__c = {
  //     id: formConnections.length.toString(),
  //     cforms__Custom_Value__c: '',
  //     cforms__Form_Connection__c: activeFormConnection.id,
  //     cforms__PreFill__c: '',
  //     cforms__Question__c: '',
  //     cforms__Salesforce_Field__c: ''
  //   }

  //   dispatch({
  //     type: 'SET_FORM_CONNECTION',
  //     activeFormConnection: formConnectionSObject,
  //   })
  // }

  // UPDATE
  const initFormConnection = (_formConnectionId: string) => {
    dispatch({
      type: 'SET_ACTIVE_FORM_CONNECTION',
      formConnectionId: _formConnectionId
    })
  }

  const setNewFormConnection = (_formConnection: Form_Connection__c) => {
    dispatch({
      type: 'SET_NEW_FORM_CONNECTION',
      formConnections: formConnections.concat([_formConnection]),
    })

  }

  const handleUpdateFormConnections = (_formConnections: Form_Connection__c[]) => {
    dispatch({
      type: 'SET_UPDATE_FORM_CONNECTIONS',
      formConnections: _formConnections
    })
  }

  const handleRemoveFormConnection = (index: number) => {
    dispatch({
      type: 'SET_UPDATE_FORM_CONNECTIONS',
      formConnections: formConnections.filter((_formConnection: Form_Connection__c, _index: number) => {
        return _index != index;
      })
    })
  }

  const setNewFormConnectionField = (_formConnectionField: Form_Connection_Field__c) => {
    dispatch({
      type: 'SET_NEW_FORM_CONNECTION_FIELD',
      formConnectionFields: formConnectionFields.concat([_formConnectionField]),
    })
  }

  const handleUpdateFormConnectionField = (formConnectionFields: Form_Connection_Field__c[]) => {
    dispatch({
      type: 'SET_UPDATE_FORM_CONNECTION_FIELDS',
      formConnectionFields: formConnectionFields
    })
  }

  // const handleUpdateFormConnectionField = (formConnectionField: Form_Connection_Field__c) => {
  //   console.log({ formConnectionFields })

  //   const _formConnectionFields = formConnectionFields.map((_formConnectionField: Form_Connection_Field__c) => {
  //     console.log(_formConnectionField.id === formConnectionField.id, { _formConnectionField, formConnectionField })
  //     if (_formConnectionField.id === formConnectionField.id) {
  //       return formConnectionField;
  //     } else {
  //       return _formConnectionField;
  //     }
  //   })

  //   dispatch({
  //     type: 'SET_UPDATE_FORM_CONNECTION_FIELDS',
  //     formConnectionFields: _formConnectionFields
  //   })
  // }

  const handleRemoveFormConnectionField = (index: number) => {
    dispatch({
      type: 'SET_UPDATE_FORM_CONNECTION_FIELDS',
      formConnectionFields: formConnectionFields.filter((_option: Form_Connection_Field__c, _index: number) => {
        return _index != index;
      })
    })
  }

  return {
    formConnectionId,
    formConnections,
    formConnectionFields,
    allFormConnections,
    allFormConnectionFields,
    initFormConnection,
    setNewFormConnection,
    handleUpdateFormConnections,
    handleRemoveFormConnection,
    setNewFormConnectionField,
    handleUpdateFormConnectionField,
    handleRemoveFormConnectionField
  }
}