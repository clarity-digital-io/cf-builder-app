import React, { useContext } from 'react';
import { Radio } from 'antd';
import { DesignContext } from '../../Context';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export const PictureChoice = ({ question, disabled }) => {
	
	const { questionOptions } = useContext(DesignContext); 

	return (
			<RadioGroup>
					{
							questionOptions.get(question.Id) != null ? 
								questionOptions.get(question.Id).map((option) => {
										return (
														<RadioButton
																name={option.Id}
																id={option.Id}
																value={option.Id}
																checked={false}
														>
															<img width="100" src={getImage(option)} />
														</RadioButton>
												)
								}) :
								null
					}
			</RadioGroup>
	)

}

const getImage = (option) => {
	console.log('option.forms__Choice_Image__c', option.forms__Choice_Image__c); 
	if(option.forms__Choice_Image__c != '' && option.forms__Choice_Image__c.length <= 18) {
		return `/sfc/servlet.shepherd/version/download/${option.forms__Choice_Image__c}`;
	} else {
		return option.forms__Choice_Image__c; 
	}
}