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

  return <div>
    <RadioGroup
      labels={{ label: 'Show question when:' }}
      onChange={(event) => setQuestionUpdate({ ...question, cforms__Logic__c: event.target.value })}
      required={false}
      name={'FilterLogic'}
      errorId={errorId}
    >
      {
        (Object.keys(FilterLogicTypes) as Array<keyof typeof FilterLogicTypes>).map((key) => {
          console.log({ key })
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
        <Input
          type="text"
          id="base-id"
          label="Filter Logic"
          placeholder=""
          onChange={(e) => {
            // regex check first 
            if (e.target.value.match("[^A-Za-z0-9)s]+") == null) {
              const { valid, message } = validateCustomLogic(e.target.value);
              if (valid) {
                console.log('update custom logic field on question', message)
              } else {
                console.log('display error message ')
              }
            }
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
        /> :
        null
    }
  </div>
}

type CustomLogicValidation = {
  valid: boolean,
  message: string
}

const validateCustomLogic = (value: string): CustomLogicValidation => {
  // need to reference all criteria
  // need to reference criteria that exists (not undefined)
  // check spelling (Not part of AND NOT OR can be lower case when is a string not number)
  // if starts with a logic operator (logic operator can be parentheses too ) (should start with a number (criteria))
  // -- also if there is no number between logic operator 

  const logicValues: string[] = value.split(' ');

  // this can be 
  // 1 / 2 / OR / AND / 234 / ai233432 / x123 / NOt / 1 OR 2 / 1 And 2 / 1 or 2 / 1 or 3 

  // first check should be
  // is it a number or text 
  // if text is part of logicoperators (lowercase it)
  // if number does it include all criteria
  let isValidInitialCheck = true;

  logicValues.forEach((value: string) => {
    const isNumber = Number.isFinite(value);
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
    .filter((value: string) => Number.isFinite(value))
    .map((value: string) => (Number(value)))
    .some((value: number) => [1, 2, 3].indexOf(value) !== -1);

  // exit if second check is invalid
  if (!isValidIncludesAllCriteria) return { valid: false, message: '' };

  const validValueBeforeNot = (value: string) => {
    if (Number.isFinite(value)) return false;
    return ['not', 'or', 'and'].includes(value.toLowerCase());
  }

  let isValidValuesUsingNot = true;

  logicValues.forEach((value: string, index: number, arr: string[]) => {
    if (index === 0 && !Number.isFinite(value) && value == 'not') {
      isValidValuesUsingNot = false;
    }
    if (!Number.isFinite(value) && value == 'not' && !validValueBeforeNot(arr[index - 1])) {
      isValidValuesUsingNot = false;
    }
    if (!isValidValuesUsingNot) return;
  });

  // exit if third check is invalid
  if (!isValidValuesUsingNot) return { valid: false, message: '' }

  // check if there are any parentheses only 

  // open parentheses must have a closing
  // 2 open parentheses must equal 2 closing
  // check inside parentheses is valid grouping (1 and parenthesesGroupType /** (1 and 2) (1 and (2 or 3)) */ )

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

  // check that each opening is valid group 
  // (1 AND 2) is valid
  // (1 AND (1 OR 2)) is valid

  // start from parent level down to each level 
  // how do i know 
  // (1 AND (1 OR 2)) OR (3 AND 5)
  // parent level is first parentheses group
  // child level is second parentheses group
  // grand child level is third parentheses group 

  // loop through each logic value
  // if leftSide find it's rightSide
  // continue to next index 
  // if another leftSide is found
  // continue to next index + 1 on the rightside 
  // once completed

  // (1 AND (1 OR 2)) OR (3 AND 5)

  const isValidParenthesesGrouping: CustomLogicValidation = validParenthesesGrouping(logicValues);
  return isValidParenthesesGrouping;

  // const validValueBeforeParentheses = (value: string) => {
  //   if (Number.isFinite(value)) return false;
  //   return ['not', 'or', 'and'].includes(value.toLowerCase());
  // }

  // let isValidUsingParentheses = false;
  // logicValues.forEach((value: string, index: number, arr: string[]) => {
  //   if (index === 0 && !Number.isFinite(value) && value == ')') {
  //     isValidUsingParentheses = false;
  //   }
  //   if (!Number.isFinite(value) && value == 'not' && !validValueBeforeParentheses(arr[index - 1])) {
  //     isValidUsingParentheses = false;
  //   }
  //   if (!isValidUsingParentheses) return;
  // });


  // not needs to have an or / and before 
  // check closing parentheses 


}

const validParenthesesGrouping = (logicValues: string[]): CustomLogicValidation => {

  logicValues.forEach((value, index) => {
    if (value === '(') {
      // find it's rightSide starting at current Index
      let lastLeftSideIndex = 0;
      let nextRightSide = 0;
      let hasInnerGroups = false;
      logicValues.slice(index + 1, logicValues.length).forEach((valueJ, indexJ) => {
        if (valueJ === ')' && nextRightSide == 0) {

          // check if group is valid 
          const parenthesesGroup = logicValues.slice(index + 1, indexJ - 1);
          if (!hasInnerGroups) { // no need to check more has been checked

            if (!validInnerParenthesesGroup(parenthesesGroup)) {
              return;
            }

          }

        } else if (valueJ === ')' && nextRightSide > 0) {
          // nested parentheses group should check this 
          const innerParenthesesGroup = logicValues.slice(lastLeftSideIndex, indexJ);
          if (!validInnerParenthesesGroup(innerParenthesesGroup)) {
            return;
          }
          nextRightSide--;
          hasInnerGroups = true;
        } else if (valueJ === '(') {
          // increase count of rightside + 1
          lastLeftSideIndex = indexJ;
          nextRightSide++;
        }
      });

    }
  })

  // logicValues.forEach((value, index) => {
  //   if (value === '(') {
  //     validParenthesesGrouping()
  //   } 
  // })

}

const validInnerParenthesesGroup = (group: string[]): boolean => {
  if (group.length < 2) return false;

  // no numbers 
  if (!group.some((value: string) => Number.isFinite(value))) return false;

  // no text 
  if (group.some((value: string) => Number.isFinite(value))) return false;

  // not has no "AND or OR"
  const indexOfNot = group.indexOf("NOT");
  if (indexOfNot > 0) {
    const orExpression = group[indexOfNot - 1] === 'OR';
    const andExpression = group[indexOfNot - 1] === 'AND';

    if (orExpression == false || andExpression == false) {
      return false;
    }

  } else {
    return false;
  }

  // success and or without a split
  let hasOr = false;
  let hasAnd = false;
  group.forEach(value => {
    if (value === 'OR') {
      hasOr = true;
    }

    if (havaluesAnd === 'AND') {
      hasAnd = true;
    }
  })

  if (hasOr && hasAnd) {
    return { valid: false, message: 'successive' }
  }

  return true;
}