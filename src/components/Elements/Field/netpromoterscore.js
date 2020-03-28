import React, { useState } from 'react';
import { RadioButtonGroup, Radio } from '@salesforce/design-system-react';

export const NetPromoterScore = ({ question }) => {

	const [nps, setNps] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
	return (
				<RadioButtonGroup
					labels={{ label: question.forms__Title__c }}
					onChange={(e) => update(e)}
					required={question.forms__Required__c}
					name={question.Name}
				>
					{ 
						nps.map((rate) => {
							return <Radio
								key={rate}
								id={rate.toString()}
								labels={{ label: rate.toString() }}
								value={rate.toString()}
								checked={false}
								variant="button-group"
							/>
						})
					}
				</RadioButtonGroup>
		);
}