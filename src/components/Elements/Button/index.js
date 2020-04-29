import React from 'react';
import { Button as SalesforceButton } from '@salesforce/design-system-react';

export const Button = ({ variant, children, onClick, disabled }) => {
	return <SalesforceButton
		variant={variant}
		disabled={disabled}
		onClick={() => {
			onClick()
		}}
	>
		{children}
	</SalesforceButton>
}