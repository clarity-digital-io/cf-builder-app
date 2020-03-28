import React from 'react';
import { Input } from '@salesforce/design-system-react';

export const InputField = ({ value, onChange }) => {

    return <Input onChange={(e) => onChange(e)} value={ value } />
    
}

export const InputNumber = ({ min, max, value, onChange }) => {

		return <Input
			min={min}
			max={max || 10000000}
			onChange={(e, data) => onChange(data.number)} 
			value={ value }
			variant="counter"
		/>
}

