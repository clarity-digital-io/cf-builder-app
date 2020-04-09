import React, {useState} from 'react';
import { Textarea as SalesforceTextarea } from '@salesforce/design-system-react';

export const Comment = ({ question }) => {

		const [value, setValue] = useState('');

    return <SalesforceTextarea
			aria-describedby={question.Id}
			id={question.Name}
			name={question.Name}
			label={question.forms__Title__c}
			required={question.forms__Required__c}
			placeholder={question.forms__Placeholder__c}
			onChange={(e) => setValue(e.target.value)}
			value={value}
		/>

}