import React, { useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import {Checkbox} from '@salesforce/design-system-react';
import { Input as SalesforceInput } from '@salesforce/design-system-react';

import { Attachments } from './Attachments'; 
import { Multiple } from './multiple'; 
import { Comment } from './comment'; 
import { Number } from './number'; 
import { Lookup } from './lookup'; 
import { RecordGroup } from './recordgroup'; 
import { ConnectedObject } from './connectedobject'; 
import { PictureChoices } from './picturechoices'; 
import { FreeText } from './freetext'; 
import { Spinner } from '../../../../Elements/Spinner';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

const getQuestionType = (type) => {

	switch (type) {
        case 'Attachments':
            return <Attachments />
            break;
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Checkbox':
            return <Multiple />
            break;
        case 'Comment':
            return <Comment />
            break; 
        case 'NetPromoterScore':
            return <div>NetPromoterScore</div>
            break;
        case 'Slider':
				case 'Number':
            return <Number type={type} />
            break;
        case 'Email':
            return <Email />
            break;
        case 'Lookup':
        case 'REFERENCE':
            return <Lookup />
            break;
        case 'RecordGroup':
            return <RecordGroup />
            break;
        case 'ConnectedObject':
            return <ConnectedObject />
            break;
        case 'PictureChoice':
            return <PictureChoices />
            break;
        case 'FreeText':
            return <FreeText />
            break;
        default:
            return <div></div>
            break;
    }

}

export const EditQuestion = () => {

    const { loading } = useContext(EditContext);

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext); 

		const updateRequiredStatus = (e) => {

        let checked = e.target.checked;

        setActiveQuestion(question => {
            return { ...question, forms__Required__c: checked }
        })

    }

    const updateActiveQuestion = (e) => {
        
        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, forms__Title__c: value }
        })

    }
		return (			
			<View className="row middle-xs">
				<View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<ViewStyle space border>

					<h1>Settings</h1>
					{
						showRequiredInput(activeQuestion.forms__Type__c) ?
							<Checkbox
								labels={{
									label: 'Required Field',
								}}
								id="checkbox-toggle-example"
								variant="toggle"
								defaultChecked={activeQuestion.forms__Required__c} 
								onChange={(e, {checked}) => updateRequiredStatus(e)}
							/> : 
							null
					}
					</ViewStyle>
					
					<ViewStyle space border>

							<SalesforceInput
								aria-describedby={activeQuestion.Id}
								value={activeQuestion.forms__Title__c || activeQuestion.forms__Salesforce_Field__c}
								id={activeQuestion.Id}
								label={'Question Label'}
								onChange={(e) => updateActiveQuestion(e)}
							/>

					</ViewStyle>
					
					<ViewStyle space scroll>
					{
							hasExtraEditSettings(activeQuestion.forms__Type__c) ?
							loading ? <Spinner /> : getQuestionType(activeQuestion.forms__Type__c)  :
							null	
					}
					</ViewStyle>

				</View>
			</View>					
		)
}

const hasExtraEditSettings = (type) => {

    switch (type) {
        case 'NetPromoterScore':
        case 'Email':
            return false
            break;
        default:
            return true; 
            break;
    }

}

const showRequiredInput = (type) => {

    switch (type) {
        case 'ConnectedObject':
        case 'RecordGroup':
        case 'FreeText':
            return false;
            break;
        default:
            return true;
            break;
    }

}