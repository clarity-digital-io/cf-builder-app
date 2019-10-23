import React, { useState, useContext } from 'react';

import { Card, Spin, Icon, Table, Form } from 'antd';
import { DesignContext } from '../../Context';
import { getType } from '../../Builder/Design/Display/types';

const FormItem = Form.Item;

export const RecordGroup = ({ question }) => {

    const [newItem, addNewItem] = useState(false);
    
    return (
        <Card
            title={question.Title__c}
            actions={
                newItem ?
                [<Icon type="arrow-left" onClick={() => addNewItem(false)} />, <Icon type="save" />] :
                [<Icon type="plus" onClick={() => addNewItem(true)} />]
            }
            style={{ width: '100%' }}
        >

            <RecordBody 
                items={[]} 
                newItem={newItem} 
                question={question} 
            />

        </Card>
    )

}

const RecordBody = ({ items, newItem, question }) => {

    const { recordGroup } = useContext(DesignContext);

    const [recordGroupFields, setRecordGroupFields] = useState(recordGroup != null ? (recordGroup.get(question.Id) || []): []);

    const getRecordColumns = () => {

        return recordGroupFields.map(question => {

            return {
                title: question.Title__c,
                dataIndex: question.Salesforce_Field__c, 
                key: question.Salesforce_Field__c
            }

        })
        
    }

    const [columns, setColumns] = useState(getRecordColumns());

    return newItem ?
        <div className="slds-p-around_small">
        {
            recordGroupFields.map(question => {
                return <FormItem key={question.Id} label={question.Title__c} required={question.Required__c}>
                    { getType(question) }
                </FormItem>
            })
        }
        </div> :
        <Table dataSource={items} columns={columns} />

}