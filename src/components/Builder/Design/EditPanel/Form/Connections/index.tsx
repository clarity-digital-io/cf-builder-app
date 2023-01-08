import React, { Dispatch, useCallback, useEffect, useState } from 'react';

import { Modal, Tabs, TabsPanel, Checkbox, Button, Combobox, comboboxFilterAndLimit, Icon } from "@salesforce/design-system-react";
import { useBuilderContext } from '../../../../../../context/BuilderContext';
import { useSetupContext } from '../../../../../../context/SetupContext';
import { BuilderController } from '../../../../../../utils/constants/methods';
import { call } from '../../../../../../query';
import { Question__c } from '../../../../../../utils/types/sObjects';
import { FieldMap } from '../../../../../../utils/constants/fields';
import { QuestionTypes } from '../../../../../../utils/types/fields';


export const Connections = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: Dispatch<boolean> }) => {

  const { activeFormConnection, setFormConnection } = useBuilderContext();

  const handleNewRecordCheck = (checked: boolean) => {
    if (!activeFormConnection) return;
    setFormConnection({ ...activeFormConnection, cforms__New__c: checked })
  }

  return (
    <div>
      <Modal
        size="large"
        isOpen={isOpen}
        footer={[
          <Button key={'cancel'} label="Cancel" onClick={() => setOpen(!isOpen)} />,
          <Button key={'save'} label="Save" variant="brand" onClick={() => setOpen(!isOpen)} />,
        ]}
        onRequestClose={() => setOpen(!isOpen)}
        heading={"New Form Connection"}
      >
        <section className="slds-p-around_large">
          <div className="slds-form-element slds-m-bottom_large">
            <SObjectLookup />
          </div>
          <div className="slds-form-element slds-m-bottom_large">
            <Checkbox
              labels={{
                label: 'Create New Record',
              }}
              id="create-new-record"
              variant="toggle"
              onChange={(e: any) => {
                handleNewRecordCheck(e.target.checked)
              }}
            />
          </div>

          <div className="slds-form-element slds-m-bottom_large">
            <ConnectionTabs />
          </div>
        </section>
      </Modal>
    </div>
  );

}

type ComboSObject = {
  id: number,
  label: string
  type: string
}

const SObjectLookup = () => {

  const { sObjects } = useSetupContext();

  const { activeFormConnection, setFormConnection } = useBuilderContext();

  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState<ComboSObject[]>([])

  // need id to be able to update the one where working with so other components can update based on this
  const handleSetSalesforceObject = useCallback(() => {
    if (selection.length > 0 && selection[0] && selection[0].type && inputValue == '') {
      if (!activeFormConnection) return;
      setFormConnection({ ...activeFormConnection, cforms__Salesforce_Object__c: selection[0].type })
    }
  }, [selection, activeFormConnection, inputValue, setFormConnection])

  useEffect(() => {
    if (selection.length > 0 && selection[0]) {
      handleSetSalesforceObject()
    }
  }, [selection, inputValue])

  return <Combobox
    id="sObjects"
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
      label: 'Form Connection sObject',
      placeholder: 'Select an sObject'
    }}
    options={comboboxFilterAndLimit({
      inputValue: inputValue,
      options: sObjects,
      selection: selection,
    })}
    required
    selection={selection}
    value={inputValue} // add check for has selection option
    variant="inline-listbox"
  />
}

type ComboQuestionField = {
  id: number,
  label: string
  type: QuestionTypes
}

type ComboSObjectField = {
  id: number,
  label: string
  type: string
}

const ConnectionTabs = () => {

  const { activeFormConnection, questions } = useBuilderContext();
  const [_questions, _setQuestions] = useState<Array<ComboQuestionField>>([])
  const [sObjectFields, setSObjectFields] = useState<Array<ComboSObjectField>>([])

  const requestSObjectFields = useCallback(async () => {
    if (activeFormConnection?.cforms__Salesforce_Object__c) {
      const _sObjectFields = await await call(BuilderController.getSObjectFields, [activeFormConnection?.cforms__Salesforce_Object__c]);
      setSObjectFields(_sObjectFields.map((field: FieldMap) => ({ id: field.field, label: field.field, type: field.type })));
    }
  }, [activeFormConnection])

  useEffect(() => {
    if (activeFormConnection?.cforms__Salesforce_Object__c) {
      requestSObjectFields();
    }
  }, [activeFormConnection])

  const formatQuestions = useCallback(() => {
    const _formattedQuestions = questions.map((question: Question__c, index: number) => {
      return {
        id: index,
        label: question.cforms__Title__c,
        type: question.cforms__Type__c
      }
    });
    _setQuestions(_formattedQuestions)
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0) {
      formatQuestions()
    }
  }, [questions])

  return <Tabs id="tabs-connections" defaultSelectedIndex={1}>
    <TabsPanel disabled={activeFormConnection?.cforms__New__c} label={activeFormConnection?.cforms__New__c ? "Prefill *Not Available" : "Prefill"}>
      <Prefill questions={_questions} sObjectFields={sObjectFields} />
    </TabsPanel>
    <TabsPanel label="Field Mapping">
      <FieldMapping questions={_questions} sObjectFields={sObjectFields} />
    </TabsPanel>
  </Tabs>
}

const Prefill = ({ questions, sObjectFields }: { questions: Array<ComboQuestionField>, sObjectFields: Array<ComboSObjectField> }) => {
  return <div className='slds-grid slds-wrap'>
    <PrefillRow questions={questions} sObjectFields={sObjectFields} />
  </div>
}

const PrefillRow = ({ questions, sObjectFields }: { questions: Array<ComboQuestionField>, sObjectFields: Array<ComboSObjectField> }) => {

  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState<ComboQuestionField[]>([])

  const [sObjectFieldValue, setSObjectFieldValue] = useState('');
  const [sObjectSelection, setSObjectSelection] = useState<ComboSObjectField[]>([])

  return <div className='slds-col slds-size_1-of-1 slds-grid slds-grid_align-center slds-p-top_xx-small slds-p-horizontal_x-small'>
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
  </div>
}

const FieldMapping = ({ questions, sObjectFields }: { questions: Array<ComboQuestionField>, sObjectFields: Array<ComboSObjectField> }) => {
  return <div className='slds-grid slds-wrap'>
    <FieldMappingRow questions={questions} sObjectFields={sObjectFields} />
    <FieldMappingRow questions={questions} sObjectFields={sObjectFields} />
    <FieldMappingRow questions={questions} sObjectFields={sObjectFields} />
    <FieldMappingRow questions={questions} sObjectFields={sObjectFields} />
  </div>
}

const FieldMappingRow = ({ questions, sObjectFields }: { questions: Array<ComboQuestionField>, sObjectFields: Array<ComboSObjectField> }) => {
  //connection question
  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState<ComboQuestionField[]>([])

  //connection sobjectfield
  const [sObjectFieldValue, setSObjectFieldValue] = useState('');
  const [sObjectSelection, setSObjectSelection] = useState<ComboSObjectField[]>([])

  // useffect on selection for row 
  return <div className='slds-col slds-size_1-of-1 slds-grid slds-grid_align-center slds-p-top_xx-small slds-p-horizontal_x-small'>
    <div className='slds-col slds-size_3-of-6'>
      <Combobox
        id="Questions"
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
          placeholder: 'Select a Question'
        }}
        options={comboboxFilterAndLimit({
          inputValue: sObjectFieldValue,
          options: questions,
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
        id="sObjects"
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
          placeholder: 'Select a Field'
        }}
        options={comboboxFilterAndLimit({
          inputValue: inputValue,
          options: sObjectFields,
          selection: selection,
        })}
        required
        selection={selection}
        value={inputValue} // add check for has selection option
        variant="inline-listbox"
      />
    </div>
  </div>

}