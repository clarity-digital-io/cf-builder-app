import React, { useContext } from 'react';
import { DesignContext } from '../../../../Context';
import { RadioGroup as SalesforceRadioGroup } from '@salesforce/design-system-react';

import { Radio as SalesforceRadio } from '@salesforce/design-system-react';


export const FreeText = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    const onChange = (e) => {

        let value = e.target.value; 

        setActiveQuestion(question => {
            return { ...question, forms__FreeText_Type__c: value }
        });

    }

    return (
			<SalesforceRadioGroup
					labels={{ label: "Free Text Type" }}
					onChange={(event) => onChange(event)}
					name={"Free Text Type"}
				>
				<SalesforceRadio
					key={"Header"}
					id={"Header"}
					labels={{ label: "Header" }}
					value={"Header"}
					checked={activeQuestion.forms__FreeText_Type__c == "Header"}
					variant="base"
				/>
				<SalesforceRadio
					key={"Paragraph"}
					id={"Paragraph"}
					labels={{ label: "Paragraph" }}
					value={"Paragraph"}
					checked={activeQuestion.forms__FreeText_Type__c == "Paragraph"}
					variant="base"
				/>
			</SalesforceRadioGroup>
    )

}