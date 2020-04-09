import React, { useContext, useState } from 'react';
import { VisualPicker, Radio, Icon } from '@salesforce/design-system-react';
import { DesignContext } from '../../Context';

export const PictureChoice = ({ question }) => {

	const { questionOptions } = useContext(DesignContext); 

	const [value, setValue] = useState('');

	return <VisualPicker
			label={question.forms__Title__c}
			id={question.Id}
			required={question.forms__Required__c} 
			coverable
		>
			{
				questionOptions.get(question.Id) != null ?
					questionOptions.get(question.Id).map((option, index) => {
						return (
							<Radio
								key={index}
								checked={option.Id == value}
								value={option.Id}
								onChange={(e) => setValue(option.Id) }
								labels={{
									label: option.label
								}}
								id={question.id}
								onRenderVisualPickerSelected={() => (
									<Icon
										assistiveText={{ label: option.forms__Label__c }}
										category="utility"
										name="check"
										colorVariant="base"
										size="large"
									/>
								)}
								onRenderVisualPickerNotSelected={() => (
									<img width="200" src={getImage(option)} />
								)}
							/>
						)
					}) :
					null
			}
		</VisualPicker>
}

const getImage = (option) => {
	if(option.forms__Choice_Image__c != null && option.forms__Choice_Image__c.length <= 18) {
		return `/sfc/servlet.shepherd/version/download/${option.forms__Choice_Image__c}`;
	} else {
		return option.forms__Choice_Image__c; 
	}
}