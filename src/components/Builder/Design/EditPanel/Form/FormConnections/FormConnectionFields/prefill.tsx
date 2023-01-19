import React, { useCallback, useEffect, useState } from 'react';

import { Button, Combobox, comboboxFilterAndLimit, Icon } from "@salesforce/design-system-react";
import { useBuilderContext } from '../../../../../../../context/BuilderContext';
import { Form_Connection_Field__c } from '../../../../../../../utils/types/sObjects';
import { ComboQuestionField, ComboSObjectField } from '../../../../../../../utils/types/fields';
import styled from "styled-components";

export const Prefill = ({ questions, sObjectFields }: { questions: Array<ComboQuestionField>, sObjectFields: Array<ComboSObjectField> }) => {

  const {
    formConnectionId,
    formConnectionFields,
    setNewFormConnectionField,
    handleRemoveFormConnectionField
  } = useBuilderContext();

  const _handleRemoveFormConnectionField = (index: number) => {
    handleRemoveFormConnectionField(index);
  }

  return <div className='slds-grid slds-grid_vertical'>
    {
      formConnectionFields
        .filter((formConnectionField: Form_Connection_Field__c) => {
          return formConnectionField.cforms__PreFill__c;
        })
        .map((formConnectionField: Form_Connection_Field__c, index: number) => {
          return <div key={formConnectionField.id} className='slds-col'>
            <PrefillRow
              formConnectionField={formConnectionField}
              handleRemove={() => _handleRemoveFormConnectionField(index)}
              questions={questions}
              sObjectFields={sObjectFields}
            />
          </div>
        })
    }

    <div className='slds-col slds-p-top_xx-small'>
      <Button
        variant="neutral"
        onClick={() => {
          const formConnectionFieldSObject: Form_Connection_Field__c = {
            cforms__Form_Connection__c: formConnectionId || '',
            cforms__PreFill__c: true,
            id: formConnectionFields.length.toString()
          }
          setNewFormConnectionField(formConnectionFieldSObject)
        }}
        iconCategory="utility"
        iconName="new"
        iconPosition="left"
        label="Add Prefill"
      />
    </div>

  </div>
}

const PrefillRow = (
  {
    formConnectionField,
    handleRemove,
    questions,
    sObjectFields
  }:
    {
      formConnectionField: Form_Connection_Field__c,
      handleRemove: any,
      questions: Array<ComboQuestionField>,
      sObjectFields: Array<ComboSObjectField>,
    }) => {

  const { formConnectionFields, allQuestionsCombo, handleUpdateFormConnectionField } = useBuilderContext();

  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState<ComboQuestionField[]>([])

  const [sObjectFieldValue, setSObjectFieldValue] = useState('');
  const [sObjectSelection, setSObjectSelection] = useState<ComboSObjectField[]>([])

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (!init) {
      const _activeQuestionValue = allQuestionsCombo.filter((questionCombo: ComboQuestionField) => questionCombo.id === formConnectionField.cforms__Question__c?.toString());
      console.log({ _activeQuestionValue, allQuestionsCombo, formConnectionField })
      setSelection(_activeQuestionValue);
      setInputValue(_activeQuestionValue.length > 0 ? _activeQuestionValue[0].label : '');


      setSObjectFieldValue(formConnectionField.cforms__Salesforce_Field__c || '');
      setSObjectSelection(sObjectFields.filter((_sObjectField: ComboSObjectField) => _sObjectField.id === formConnectionField.cforms__Salesforce_Field__c));
      setInit(true);
    }
  }, [init, allQuestionsCombo, sObjectFields, formConnectionField])

  const handleUpdateQuestionField = useCallback(() => {
    const _formConnectionFields = formConnectionFields.map((_formConnectionField: Form_Connection_Field__c) => {
      if (_formConnectionField.id === formConnectionField.id) {
        return { ...formConnectionField, cforms__Question__c: selection[0].id }
      } else {
        return _formConnectionField;
      }
    })
    handleUpdateFormConnectionField(_formConnectionFields)
  }, [selection]);

  useEffect(() => {
    console.log({ selection })
    if (selection.length > 0 && formConnectionField && formConnectionField.cforms__Question__c != selection[0].id) {
      handleUpdateQuestionField();
    }
  }, [selection, formConnectionField])

  const handleUpdateSObjectField = useCallback(() => {
    const _formConnectionFields = formConnectionFields.map((_formConnectionField: Form_Connection_Field__c) => {
      if (_formConnectionField.id === formConnectionField.id) {
        return { ...formConnectionField, cforms__Salesforce_Field__c: sObjectSelection[0].id }
      } else {
        return _formConnectionField;
      }
    })
    handleUpdateFormConnectionField(_formConnectionFields)
  }, [sObjectSelection]);

  useEffect(() => {
    if (sObjectSelection.length > 0 && formConnectionField && formConnectionField.cforms__Salesforce_Field__c != sObjectSelection[0].id) {
      handleUpdateSObjectField();
    }
  }, [sObjectSelection, formConnectionField])

  return <div className='slds-col slds-size_1-of-1 slds-grid slds-grid_align-center slds-p-top_xx-small slds-p-horizontal_large'>
    <div className='slds-col slds-size_3-of-6'>
      <Combobox
        id="sObjects"
        events={{
          onChange: (e, { value }) => setInputValue(value),
          onRequestRemoveSelectedOption: (event, data) => {
            setSObjectFieldValue('');
            setSObjectSelection(data.selection);
          },
          onSelect: (e, data) => {
            setSObjectFieldValue('');
            setSObjectSelection(data.selection);
          }
        }}
        labels={{
          placeholder: 'Select a Field'
        }}
        options={comboboxFilterAndLimit({
          inputValue: sObjectFieldValue,
          options: sObjectFields,
          selection: sObjectSelection,
        })}
        required
        selection={sObjectSelection}
        value={sObjectFieldValue} // add check for has selection option
        variant="inline-listbox"
      />
    </div>
    <div className='slds-col slds-grow-none slds-p-around_xx-small'>
      <Icon
        className={'slds-m-right_x-small'}
        assistiveText={{ label: 'to' }}
        category={'utility'}
        name={'forward'}
        size={'xx-small'}
      />
    </div>
    <div className='slds-col slds-size_3-of-6'>
      <Combobox
        id="Questions"
        events={{
          onChange: (e, { value }) => setInputValue(value),
          onRequestRemoveSelectedOption: (event, data) => {
            setInputValue('');
            setSelection(data.selection);
          },
          onSelect: (e, data) => {
            setInputValue('');
            setSelection(data.selection);
          }
        }}
        labels={{
          placeholder: 'Select a Question'
        }}
        options={comboboxFilterAndLimit({
          inputValue: inputValue,
          options: questions,
          selection: selection,
        })}
        required
        selection={selection}
        value={inputValue} // add check for has selection option
        variant="inline-listbox"
      />
    </div>
    <Point onClick={handleRemove} className="slds-col slds-grow-none slds-p-around_xx-small">
      <svg className="slds-button__icon slds-float_right slds-align_absolute-center" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
      </svg>
    </Point>
  </div>
}

const Point = styled.div`
  cursor: pointer; 
`