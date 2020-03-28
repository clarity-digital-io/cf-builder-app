import React from 'react';

import { Combobox } from '@salesforce/design-system-react';


export const Select = ({ disabled, key, placeholder, options, value, onChange, order, valueField, labelField, setLabel }) => {
	
	let transformedOptions = getOptions(options, valueField, labelField, setLabel); 

	return (
		<Combobox
			disabled={disabled}
			id={key}
			events={{
				onSelect: (event, data) => onChange(data.selection, order)
			}}
			labels={{
				placeholder: 'Please Select Option'
			}}
			options={ transformedOptions }
			selection={ value != null ? getSelection(transformedOptions, valueField, value) : []}
			value={''}
			variant="readonly"
		/>
	)

}

const getSelection = (options, valueField, value) => {

	return options.filter(option => {
		return value == option.value;
	})

}

const getOptions = (options, valueField, labelField, setLabel) => {

	return options.map(option => {

		let key = valueField != null ? option[valueField] : option;
		let value = valueField != null ? option[valueField] : option;
		let label = labelField != null ? option[labelField] : option;

		if(setLabel) {
					
			label = option.forms__Record_Group__c != null ?  'Record Group: ' + option.forms__Title__c + ' (' + option.forms__Salesforce_Field__c + ')' : option.forms__Title__c
	
		}

		return {
			id: key,
			label: label,
			value: value
		} 
	})

}
