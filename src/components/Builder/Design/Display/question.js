import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import {Icon as SalesforceIcon} from '@salesforce/design-system-react'; 

import Main from '../../../Elements/Theme';
import { getType } from './types'; 

import { DesignContext, BuilderContext } from '../../../Context';

const Icon = ({ type, label, background }) => (
	<SalesforceIcon
		assistiveText={{ label: label }}
		category="utility"
		name={type}
		size="small"
		style={{ background: '#fff', fill: background, padding: '.5em', borderRadius: '2px', marginBottom: '2px' }}
		containerStyle={{ height: '1.5em' }}
	/>
)

export const Question = ({ question }) => {

    const { navState, setNavState } = useContext(BuilderContext); 

    const { setQuestionState, setNavQuestion, activeQuestion, setActiveQuestion, setQuestionToDelete } = useContext(DesignContext);

    const edit = (state) => {

        if(navState != 'QUESTIONS') {
            setNavState('QUESTIONS')
        }

        setActiveQuestion(question);
        setNavQuestion(question.Id);
        setQuestionState(state);
    }

    return (
        <QuestionStyle key={'Question'}>

            <Options active={ question.Id != null && (question.Id == activeQuestion.Id) }>
							<div>
									<li onClick={() => edit('EDIT')}><Icon label="Edit" type="edit" background="#1589ee" /></li>

									<li onClick={() => edit('LOGIC')} ><Icon label="Logic" type="hierarchy" background="#16325c" /></li>

									{
											(question.forms__Type__c == 'RecordGroup' && question.forms__Salesforce_Object__c != null) ? 
											<li onClick={() => edit('SF')}><Icon label="Record Group Edit" type="record_update" background="#16325c" /></li> : 
													null
									}

									<li onClick={() => setQuestionToDelete((question.Id))}><Icon label="Delete" type="delete" background="#d4504c" /></li>
							</div>
            </Options>

            <FieldBox>

                {
									hasFormLabel(question.forms__Type__c) ? 
									<div key={question.Id} className="slds-form-element slds-form-element_stacked">
										{ getType(question) } 
									</div> :
									getType(question)
                }

            </FieldBox>

        </QuestionStyle>
    )
}

const hasFormLabel = (type) => {

    if(type == 'RecordGroup' || type == 'FreeText') {
        return false; 
    }

    return true;

}

const Options = styled.div`

		margin-right: .5em;
   
    display: inline-block; 

    li {
        list-style-type: none;
				cursor: pointer;
		}
		
    i {
				cursor: pointer; 
				padding: 1em;
		} 
		
		li:hover {
			opacity: .8;
		}

`;

const FieldBox = styled.div`
    padding: 1em; 
    display: inline-block;
		width: 100%;
		border: 1px dashed ${Main.color.body}
		margin-bottom: .2em;
		background: ${Main.color.white}
`;

const QuestionStyle = styled.div`

    span#required {
        color: ${Main.color.alert};
    }

    ${props => props.repeatable && css`
        border: 1px solid ${Main.color.body};
    `}

    width: 100%;
    display: flex;
    flex-direction: row;
`;