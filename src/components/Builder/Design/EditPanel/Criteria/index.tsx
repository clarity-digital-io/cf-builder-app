import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useEditFormContext } from "../../../../../context/EditContext";

import { Popover, ExpandableSection, Combobox, ButtonGroup, Button, Input, comboboxFilterAndLimit } from "@salesforce/design-system-react";
import { Question_Criteria__c, Question__c } from "../../../../../utils/types/sObjects";
import { BuilderContextProvider, useBuilderContext } from "../../../../../context/BuilderContext";

export const CriteriaEdit = () => {

  const { question, criteria, setNewCriterion } = useEditFormContext();
  console.log('criteriaedit', { question })

  if (!question) return null;

  const [openExpandableSection, setOpenExpandableSection] = useState<boolean>(false);

  const handleNewCriteria = () => {
    // show filter box 
    if (!question) return;

    const criterion: Question_Criteria__c = {
      cforms__Field__c: question.Id || '',
      cforms__Field_Type__c: question.cforms__Type__c,
      cforms__Operator__c: '',
      cforms__Question__c: '',
      cforms__Type__c: '',
      cforms__Value__c: ''
    }
    setNewCriterion(criterion)
  }

  return <section className="slds-ui-gen__vertical-layout">
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      <ExpandableSection
        class="slds-theme_default"
        id="controlled-expandable-section"
        isOpen={openExpandableSection}
        onToggleOpen={() => setOpenExpandableSection(!openExpandableSection)}
        title="Set Question Visibility"
      >
        <div className="slds-p-top_medium slds-ui-gen__layout-item">
          <label className="slds-form-element__label slds-no-flex">
            Filters
          </label>
          <div>

            {
              criteria ?
                criteria.map((criterion, index) => {
                  return <VisibilityFilterPopover question={question} criterion={criterion} key={index}>
                    <div>BUILD CRITERION NOTES FROM criterion object here</div>
                  </VisibilityFilterPopover>
                })
                : null
            }

            <Button
              iconCategory="utility"
              iconName="add"
              iconPosition="left"
              label="Add Filter"
              onClick={(e) => handleNewCriteria()} // add new criteria here setCriteria([].concat(newcriteria))
            />
          </div>
        </div>
      </ExpandableSection>
    </div>
  </section>
}

const VisibilityFilterPopover = ({ question, criterion, children }: { question: Question__c, criterion: Question_Criteria__c, children: ReactElement }) => {

  const handleCriterionUpdate = (test) => {
    console.log(test)
  }

  const [isOpen, setOpen] = useState(false);

  return <Popover
    position={'overflowBoundaryElement'}
    isOpen={isOpen}
    body={
      <BuilderContextProvider>
        <VisibilityFilter question={question} criterion={criterion} handleCriterionUpdate={handleCriterionUpdate} />
      </BuilderContextProvider>
    }
    footer={
      <div className="slds-text-align_right">
        <Button label="Cancel" onClick={() => setOpen(false)} />
      </div>
    }
    id="popover-controlled-with-footer"
    onClose={() => setOpen(false)}
    onRequestClose={() => setOpen(false)}
  >
    <button onClick={() => setOpen(true)}>
      {children}
    </button>
  </Popover >
}

type ComboQuestion = {
  id: string,
  label: string
}

const VisibilityFilter = (
  { question, criterion, handleCriterionUpdate }:
    { question: Question__c, criterion: Question_Criteria__c, handleCriterionUpdate: (a: any) => void }
) => {

  const { questions } = useBuilderContext();

  const [allPageQuestions, setAllPageQuestions] = useState<ComboQuestion[]>([]);

  const combineAllQuestions = useCallback(() => {
    const _questions = Object.values(questions).flat().map((question: Question__c, index) => {
      return { id: question.Id?.toString() || index.toString(), label: question.cforms__Title__c }
    });
    setAllPageQuestions(_questions);
  }, [questions]);

  useEffect(() => {
    combineAllQuestions();
  }, [questions])

  const [inputValue, setInputValue] = useState('test')
  const [selection, setSelection] = useState<ComboQuestion[]>([{ id: '', label: '' }])

  console.log({ questions, question, criterion, allPageQuestions })
  return <section className="slds-ui-gen__vertical-layout">
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      {/* for now only field type (future maybe device type / advanced (record parent based)) */}
      {/* should be a button group here with a a label "Field Type" */}
      <ButtonGroup labels={{ label: 'Filter Type' }} id="button-group-list-1" variant="list">
        <Button id="refresh-button-1" label="Field Type" />
      </ButtonGroup>

    </div>
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      {/* depending on button field type display here field
      for now show other form questions */}
      <Input
        id="base-id"
        label="Field"
        placeholder="My placeholder"
      />

      combobox here
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
        selection={selection}
        value={inputValue}
        variant="inline-listbox"
      />

    </div>
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      {/* depending on previous field value choose type of operators allowed  */}
      <Input
        id="base-id"
        label="Operator"
        placeholder="My placeholder"
      />
    </div>
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      {/* sometimes this will be an input / input number / picklist (dropdown of option values) / picklist of (true / false) */}
      <Input
        id="base-id"
        label="Value"
        placeholder="My placeholder"
      />
    </div>
  </section>
}
