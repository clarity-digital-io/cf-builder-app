import React, { useState } from "react";
import { useEditFormContext } from "../../../../../context/EditContext";

import { ExpandableSection, Button, RadioGroup, Radio, Input, Tooltip } from "@salesforce/design-system-react";
import { Question_Criteria__c } from "../../../../../utils/types/sObjects";
import { VisibilityFilterPopover } from "./VisibilityFilter/popover";
import { FilterLogicTypes } from "../../../../../utils/criteria";

export const CriteriaEdit = () => {

  const { question, criteria, setNewCriterion } = useEditFormContext();

  if (!question) return null;

  const [openExpandableSection, setOpenExpandableSection] = useState<boolean>(false);

  const handleNewCriteria = () => {
    // show filter box 
    if (!question) return;

    const criterion: Question_Criteria__c = {
      id: `qc-${question.id}`,
      cforms__Field__c: question.Id || question.id,
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
          <div className="slds-box slds-m-bottom_small">

            {
              criteria ?
                criteria.map((criterion: Question_Criteria__c, index) => {
                  const { cforms__Question__c, cforms__Operator__c } = criterion;
                  return <VisibilityFilterPopover setNewCriterion={setNewCriterion} question={question} criterion={criterion} key={index}>
                    <p>{`Question ${cforms__Question__c} ${cforms__Operator__c}`}</p>
                  </VisibilityFilterPopover>
                })
                : null
            }

            <div className="slds-m-top_x-small">
              <Button
                iconCategory="utility"
                iconName="add"
                iconPosition="left"
                label="Add Filter"
                onClick={(e) => handleNewCriteria()} // add new criteria here setCriteria([].concat(newcriteria))
              />
            </div>
          </div>

          {
            criteria && criteria.length > 1 ?
              <FilterLogic /> :
              null
          }
        </div>

      </ExpandableSection>
    </div>
  </section>
}

enum LogicOperators {
  AND,
  OR,
  NOT
}

const FilterLogic = () => {

  const { criteria, question, setQuestionUpdate } = useEditFormContext();

  const [errorId, setErrorId] = useState(null);

  return <div className="slds-m-top_medium">
    <RadioGroup
      labels={{ label: 'Show question when:' }}
      onChange={(event) => setQuestionUpdate({ ...question, cforms__Logic__c: event.target.value })}
      required={false}
      name={'FilterLogic'}
      errorId={errorId}
    >
      {
        (Object.keys(FilterLogicTypes) as Array<keyof typeof FilterLogicTypes>).map((key) => {
          const value = FilterLogicTypes[key];
          return <Radio
            key={key}
            id={value}
            labels={{ label: value }}
            value={value}
            checked={question?.cforms__Logic__c === value}
            variant="base"
          />
        })
      }
    </RadioGroup>

    {
      question?.cforms__Logic__c === FilterLogicTypes.Custom ?
        <div className="slds-m-top_x-small">
          <Input
            type="text"
            id="base-id"
            label="Filter Logic"
            placeholder=""
            onBlur={(e) => {
              // regex check first 
              setTimeout(() => {
                if (e.target.value.match("[^A-Za-z0-9)s]+") != null) {
                  const { valid, message } = validateCustomLogic(e.target.value);
                  if (valid) {
                    console.log('update custom logic field on question', message)
                  } else {
                    console.log('display error message ')
                  }
                }
              }, 100)
            }}
            value={question?.cforms__Custom_Logic__c}
            fieldLevelHelpTooltip={
              <Tooltip
                id="field-level-help-tooltip"
                align="left"
                position="overflowBoundaryElement"
                content="Filter logic governs how and when your filter criteria let users see this component. Use the AND, OR, and NOT operators to fine tune your results."
              />
            }
          />
        </div> :
        null
    }
  </div>
}

type CustomLogicValidation = {
  valid: boolean,
  message: string
}

const validateCustomLogic = (value: string): CustomLogicValidation => {

  const logicValues: string[] = value.split(' ');

  let isValidInitialCheck = true;

  logicValues.forEach((value: string) => {
    const isNumber = isNumeric(value);
    if (!isNumber) {// is it part of logic operators (parents / not / or / and)
      isValidInitialCheck = ['not', 'or', 'and'].includes(value.toLowerCase());
    } else {  // is it part of criteria
      isValidInitialCheck = [1, 2, 3].includes(Number(value));
    }
    if (!isValidInitialCheck) return;
  });

  // exit if first check is invalid
  if (!isValidInitialCheck) return { valid: false, message: '' }

  const isValidIncludesAllCriteria = logicValues
    .filter((value: string) => isNumeric(value))
    .map((value: string) => (Number(value)))
    .some((value: number) => [1, 2, 3].indexOf(value) !== -1);

  // exit if second check is invalid
  if (!isValidIncludesAllCriteria) return { valid: false, message: 'not all criteria included' };

  let isValidValuesUsingNot = true;

  logicValues.forEach((value: string, index: number, arr: string[]) => {
    if (index === 0 && !isNumeric(value) && value == 'not') {
      isValidValuesUsingNot = false;
    }
    if (!isNumeric(value) && value == 'not' && !validValueBeforeNot(arr[index - 1])) {
      isValidValuesUsingNot = false;
    }
    if (!isValidValuesUsingNot) return;
  });

  // exit if third check is invalid
  if (!isValidValuesUsingNot) return { valid: false, message: '' }

  const { leftSide, rightSide } = logicValues.filter((value: string) => {
    if (value === '(' || value === ')') {
      return true;
    }
  }).reduce((accum: any, value: string) => {
    if (value === '(') {
      return { ...accum, leftSide: accum['leftSide'] + 1 }
    } else {
      return { ...accum, leftSide: accum['rightSide'] + 1 }
    }
  }, { leftSide: 0, rightSide: 0 });

  if (leftSide != rightSide) return { valid: false, message: '' }

  const isValidParenthesesGrouping: CustomLogicValidation = validParenthesesGrouping(logicValues);

  return isValidParenthesesGrouping;

}

const validParenthesesGrouping = (logicValues: string[]): CustomLogicValidation => {

  let validation: CustomLogicValidation;
  // (1 AND (1 OR 2)) OR (3 AND 5)
  logicValues.forEach((value, index) => {
    if (value === '(') {
      // find it's rightSide starting at current Index
      let lastLeftSideIndex: number[] = [];
      let nextRightSide = 0;
      let hasInnerGroups = false;

      logicValues.slice(index + 1, logicValues.length).forEach((valueJ, indexJ) => {
        if (valueJ === ')' && nextRightSide == 0) {

          // check if group is valid 
          const parenthesesGroup = logicValues.slice(index + 1, indexJ - 1);
          if (!hasInnerGroups) { // no need to check more has been checked
            return validInnerParenthesesGroup(parenthesesGroup)
          }

        } else if (valueJ === ')' && nextRightSide > 0) {
          const innerParenthesesGroup = logicValues.slice(lastLeftSideIndex[lastLeftSideIndex.length], indexJ);
          const validation = validInnerParenthesesGroup(innerParenthesesGroup);
          if (!validation.valid) {
            return validation;
          }
          nextRightSide--;
          lastLeftSideIndex = lastLeftSideIndex.splice(0, lastLeftSideIndex.length - 1)
          hasInnerGroups = true;
        } else if (valueJ === '(') {
          // increase count of rightside + 1
          lastLeftSideIndex = lastLeftSideIndex.concat([indexJ]); // maybe keep list here 
          nextRightSide++;
        }
      });

    }
  })

  return validation;
}

const validInnerParenthesesGroup = (group: string[]): CustomLogicValidation => {
  if (group.length < 2) return { valid: false, message: 'successive' };

  // no numbers 
  if (!group.some((value: string) => isNumeric(value))) return { valid: false, message: 'successive' };

  // no text 
  if (group.some((value: string) => isNumeric(value))) return { valid: false, message: 'successive' };

  // not has no "AND or OR"
  const indexOfNot = group.indexOf("NOT");
  if (indexOfNot > 0) {
    const orExpression = group[indexOfNot - 1] === 'OR';
    const andExpression = group[indexOfNot - 1] === 'AND';

    if (orExpression == false || andExpression == false) {
      return { valid: false, message: 'successive' }
    }

  } else {
    return { valid: false, message: 'successive' }
  }

  // success and or without a split
  let hasOr = false;
  let hasAnd = false;
  group.forEach(value => {
    if (value === 'OR') {
      hasOr = true;
    }

    if (value === 'AND') {
      hasAnd = true;
    }
  })

  if (hasOr && hasAnd) {
    return { valid: false, message: 'successive' }
  }

  return { valid: true, message: '' };
}

const validValueBeforeNot = (value: string) => {
  if (isNumeric(value)) return false;
  return ['not', 'or', 'and'].includes(value.toLowerCase());
}

const isNumeric = (str: string) => {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}