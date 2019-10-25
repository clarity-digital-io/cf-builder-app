import React, { useState, useContext, useEffect } from 'react';

import { Card, Spin, Icon, Table, Form } from 'antd';
import { DesignContext } from '../../Context';
import { getType } from '../../Builder/Design/Display/types';

const FormItem = Form.Item;

export const RecordGroup = ({ question }) => {

    const [newItem, addNewItem] = useState(false);

    const [recordQuestion, setRecordQuestion] = useState(question); 
    
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
                question={recordQuestion} 
            />

        </Card>
    )

}

const RecordBody = ({ items, newItem, question }) => {

    const { recordGroup } = useContext(DesignContext);
    console.log('ecordGroup', recordGroup);
    const [recordGroupFields, setRecordGroupFields] = useState(recordGroup.get(question.Id) || []);

    const [columns, setColumns] = useState([]);

    console.log('columns 1', columns); 

    useEffect(() => {

        if(recordGroupFields && recordGroupFields != null) {
            setColumns(getRecordColumns(recordGroupFields));
        }

    }, [recordGroupFields])

    return newItem ?
        [
            recordGroupFields.map(question => {
                return <FormItem key={question.Id} label={question.Title__c} required={question.Required__c}>
                    { getType(question) }
                </FormItem>
            })
        ]
        :
        <Table dataSource={items} columns={columns} />

}

const getRecordColumns = (recordGroupFields) => {
    console.log('recordGroupFields 2', recordGroupFields); 

    return recordGroupFields.map(question => {
        console.log('question', question); 
        return {
            title: question.Salesforce_Field__c,
            dataIndex: question.Salesforce_Field__c, 
            key: question.Salesforce_Field__c
        }

    })
    
}