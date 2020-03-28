import React from 'react';
import { Button as SalesforceButton } from '@salesforce/design-system-react';

export const Button = ({ children, onClick }) => {
	return <SalesforceButton
		onClick={() => {
			onClick()
		}}
	>
		{children}
	</SalesforceButton>
}