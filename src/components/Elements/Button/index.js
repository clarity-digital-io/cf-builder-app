import React from 'react';
import { Button as SalesforceButton } from '@salesforce/design-system-react';

export const Button = ({ children, onClick, disabled }) => {
	return <SalesforceButton
		disabled={disabled}
		onClick={() => {
			onClick()
		}}
	>
		{children}
	</SalesforceButton>
}