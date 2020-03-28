import React, { useState } from 'react';
import { Combobox } from '@salesforce/design-system-react';

export const Lookup = ({ question }) => {

	return (
			<Combobox
				id="combobox-inline-single"
				events={{
					onChange: (event, { value }) => {
						console.log('onChange value', value);
					},
					onRequestRemoveSelectedOption: (event, data) => {
						console.log('onRequestRemoveSelectedOption value');
					},
					onSubmit: (event, { value }) => {
						console.log('onSubmit value', value);
					},
					onSelect: (event, data) => {
						console.log('onSelect value', data);
					},
				}}
				labels={{
					label: question.forms__Title__c
				}}
				options={[]}
				selection={[]}
				value={''}
				variant="inline-listbox"
			/>
	)

}