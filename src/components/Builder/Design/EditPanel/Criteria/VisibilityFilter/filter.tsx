import React, { ReactElement, useCallback, useEffect, useState } from "react";

import { Combobox, ButtonGroup, Button, Input, comboboxFilterAndLimit } from "@salesforce/design-system-react";
import { Question_Criteria__c, Question__c } from "../../../../../../utils/types/sObjects";
import { useBuilderContext } from "../../../../../../context/BuilderContext";
import { OperatorTypes, validOperatorsForTypes, ValueTypes, validValueForOperatorTypes } from "../../../../../../utils/criteria";
import { QuestionTypes } from "../../../../../../utils/types/fields";

export const VisibilityFilter = (
  { question, criterion, handleCriterionUpdate }:
    { question: Question__c, criterion: Question_Criteria__c, handleCriterionUpdate: (a: any) => void }
) => {

  const { questions } = useBuilderContext();

  const [allPageQuestions, setAllPageQuestions] = useState<ComboQuestion[]>([]);
  const [formFieldValidOperators, setFormFieldValidOperators] = useState<ComboOperator[]>([]);

  const combineAllQuestions = useCallback(() => {
    const _questions = Object.values(questions).flat().map((question: Question__c, index) => {
      return { id: question.Id?.toString() || index.toString(), label: question.cforms__Title__c, type: question.cforms__Type__c }
    });
    setAllPageQuestions(_questions);
  }, [questions]);

  useEffect(() => {
    combineAllQuestions();
  }, [questions])

  // form field selection
  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState<ComboQuestion[]>([{ id: '', label: '', type: QuestionTypes.None }])

  // operator selection
  const [operatorInputValue, setOperatorInputValue] = useState('');
  const [operatorSelection, setOperatorSelection] = useState<ComboOperator[]>([{ id: '', label: '', type: OperatorTypes.EMPTY }])

  const calculateValidOperators = useCallback((type: QuestionTypes) => {
    const validOperators: OperatorTypes[] = validOperatorsForTypes(type);
    const formatValidOperators: ComboOperator[] = validOperators.map((validOperator, index) => {
      return { id: validOperator, label: validOperator, type: validOperator }
    });
    setFormFieldValidOperators(formatValidOperators);
  }, [selection])


  useEffect(() => {
    if (selection.length > 0 && selection[0].id != '') {
      calculateValidOperators(selection[0].type)
    }
  }, [selection])

  // comparison value select
  const [valueFieldValue, setValueFieldValue] = useState('');
  const [valueType, setValueType] = useState<ValueTypes>(ValueTypes.None);

  const calculateValueTypeForQuestionOperator = useCallback((questionType: QuestionTypes, operatorType: OperatorTypes) => {
    const validValueType: ValueTypes = validValueForOperatorTypes(questionType, operatorType);
    setValueType(validValueType);
  }, [selection, operatorSelection])

  useEffect(() => {
    if (selection.length > 0 && selection[0].id != '' && operatorSelection.length > 0) {
      calculateValueTypeForQuestionOperator(selection[0].type, operatorSelection[0].type);
    }
  }, [selection, operatorSelection])

  //check changes to selection, operatorSelection, and value selection
  // to update handleCriterionUpdate
  useEffect(() => {
    if (selection.length > 0 && selection[0].id != '' && operatorSelection.length > 0 && valueFieldValue == '') {
      handleCriterionUpdate({
        selection: selection[0],
        operatorSelection: operatorSelection[0],
        valueFieldValue
      })
    }
  }, [selection, operatorSelection])

  return <section className="slds-ui-gen__vertical-layout">
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      {/* for now only field type (future maybe device type / advanced (record parent based)) */}
      {/* should be a button group here with a a label "Field Type" */}
      <ButtonGroup labels={{ label: 'Filter Type' }} id="button-group-list-1" variant="list">
        <Button id="refresh-button-1" label="Form Field" variant="brand" />
        <Button id="refresh-button-1" label="Device" />
        <Button id="refresh-button-1" label="Advanced" />
      </ButtonGroup>

    </div>
    {/* section below changes depending on filter type */}
    <>
      <div className="slds-p-top_medium slds-ui-gen__layout-item">
        {/* depending on button field type display here field
      for now show other form questions */}
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
            label: 'Field',
            placeholder: 'Select a Question'
          }}
          options={comboboxFilterAndLimit({
            inputValue: inputValue,
            options: allPageQuestions,
            selection: selection,
          })}
          required
          selection={selection}
          value={inputValue} // add check for has selection option
          variant="inline-listbox"
        />
      </div>
      <div className="slds-p-top_medium slds-ui-gen__layout-item">
        {/* depending on previous field value choose type of operators allowed  */}

        <Combobox
          id="Operator"
          events={{
            onChange: (e, { value }) => setOperatorInputValue(value),
            onRequestRemoveSelectedOption: (event, data) => {
              setOperatorInputValue('');
              setOperatorSelection(data.selection);
            },
            onSelect: (e, data) => {
              setOperatorInputValue('');
              setOperatorSelection(data.selection);
            }
          }}
          labels={{
            label: 'Operator',
            placeholder: 'Select an Operator'
          }}
          options={comboboxFilterAndLimit({
            inputValue: operatorInputValue,
            options: formFieldValidOperators,
            selection: operatorSelection,
          })}
          required
          selection={operatorSelection}
          value={operatorInputValue} // add check for has selection option
          variant="inline-listbox"
        />

      </div>
      <div className="slds-p-top_medium slds-ui-gen__layout-item">
        {/* sometimes this will be an input / input number / picklist (dropdown of option values) / picklist of (true / false) */}
        {
          valueType === ValueTypes.InputText ?
            <Input
              type="text"
              id="base-id"
              label="Value"
              placeholder="My InputText"
            />
            : null
        }

        {
          valueType === ValueTypes.InputNumber ?
            <Input
              type="number"
              id="base-id"
              label="Value"
              placeholder="My InputNumber"
            />
            : null
        }

        {
          valueType === ValueTypes.InputDate ?
            <Input
              type="date"
              id="base-id"
              label="Value"
              placeholder="My InputDate"
            />
            : null
        }


        {
          valueType === ValueTypes.Picklist ?
            <Input
              id="base-id"
              label="Value"
              placeholder="My Picklist"
            />
            : null
        }

      </div>
    </>
  </section>
}

type ComboQuestion = {
  id: string,
  label: string
  type: QuestionTypes
}

type ComboOperator = {
  id: string,
  label: string
  type: OperatorTypes
}
