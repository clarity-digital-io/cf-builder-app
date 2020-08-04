import React, { useState, useContext, useEffect } from 'react';

import { DesignContext } from '../../Context';
import { getType } from '../../Builder/Design/Display/types';

import { Card, DataTable, DataTableColumn, Icon, Button } from '@salesforce/design-system-react';


export const RecordGroup = ({ question }) => {

    const [newItem, addNewItem] = useState(false);
		
		const { recordGroup } = useContext(DesignContext);

		return (
				<div className="slds-grid slds-grid_vertical">
					<Card
						id="ExampleCard"
						headerActions={
							newItem ? 
							<Button
								label="Save"
							/> :							
							<Button
								label="Add Items"
								onClick={() => addNewItem(true)}
							/> 
						}
						heading={question.forms__Title__c}
						icon={<Icon category="standard" name="document" size="small" />}
					>
							<RecordBody 
									key="body"
									items={[]} 
									newItem={newItem} 
									recordGroupFields={recordGroup.has(question.Id) ? recordGroup.get(question.Id) : []}
							/>
					</Card>
				</div>
		)

}

const getFields = (questionId, recordGroup) => {
	return recordGroup.has(questionId) ? recordGroup.get(questionId) : []
}

const RecordBody = ({ items, newItem, recordGroupFields }) => {

	const [columns, setColumns] = useState(getRecordColumns(recordGroupFields));

	return newItem ?  
			<div className="slds-m-around_medium">
				{
					recordGroupFields.map(question => {
							return getType(question)
					})
				}
			</div>
			:
			<DataTable items={items} id="DataTableExample-1">
				{
					columns.map((col, i) => {
						<DataTableColumn
							key={i}
							label={col.title}
							property={i}
							truncate
						/>
					})
				}

			</DataTable>

}

const getRecordColumns = (recordGroupFields) => {

	return recordGroupFields.map(question => {

			return {
					title: question.forms__Salesforce_Field__c,
					dataIndex: question.forms__Salesforce_Field__c, 
					key: question.forms__Salesforce_Field__c
			}

	})
	
}