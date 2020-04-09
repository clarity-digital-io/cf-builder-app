import React, { useState } from 'react';
import { Input as SalesforceInput } from '@salesforce/design-system-react';

export const Email = ({ question }) => {

		const [value, setValue] = useState('');

		return (
			<SalesforceInput
				aria-describedby={question.Id}
				id={question.Name}
				label={question.forms__Title__c}
				required={question.forms__Required__c}
				type="email"
				value={value}
				onChange={(e) => setValue(e.target.value)} 
				placeholder={question.forms__Title__c}
			/>
		)

}
