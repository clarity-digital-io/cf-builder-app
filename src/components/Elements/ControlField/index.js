import React, { useState, useContext } from 'react';
import View from '../View';
import Box from '../Box';
import { DesignContext } from '../../Context';

import CloseIcon from '../Icons/close';
import {Button} from '../Button';

export const ControlGroup = ({ rows, setRows }) => {

    return [
        <ControlHeader key={'Header'} />, 
        <ControlRows setRows={setRows} rows={rows} key={'Rows'} />,
        <ControlAddRow setRows={setRows} key={'Add'} />
    ]
}

const ControlRows = ({ rows, setRows }) => {

    return rows.map((row, i) => {

        return <ControlRow key={row.Id} order={i} row={row} setRows={setRows} />

    })

}

const ControlRow = ({ order, row, setRows }) => {
    console.log('ControlRow', row);
    const { questions } = useContext(DesignContext);

    const [operators, setOperators] = useState(getCorrectOperators(row.Field_Type__c != null ? row.Field_Type__c : ''));

    const [types, setTypes] = useState(getCorrectTypes(row.Field_Type__c != null ? row.Field_Type__c : ''));

    const setQuestionSelection = (e, order) => {

        let value = e.target.value; 
        console.log(value); 
        let question = questions.find(question => question.Id == value); 

        setOperators(getCorrectOperators(question.Type__c));

        setTypes(getCorrectTypes(question.Type__c));

        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, Title__c: question.Title__c, Field__c: question.Id, Field_Type__c: question.Type__c, Operator__c: '' }
                }
                return row;
            })
        }); 

    }

    const setOperatorSelection = (e, order) => {

        let value = e.target.value; 

        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, Operator__c: value }
                }
                return row;
            })
        }); 

    }

    const removeRow = (order) => {

        setRows(rows => {

            let newRows = rows.filter((row, i) => {
                if(i != order) {
                    return row; 
                }

            });
            console.log('newRows', newRows)
            return newRows; 

        })

    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-1">
                <Box padding='.5em'>
                    <span id="center">{ order + 1 }</span>
                </Box>
            </View>
            <View className="col-xs-3">
                <Box padding='.5em'>
                    <ControlField type={'Question'} order={order} record={row.Field__c} values={questions} setSelection={setQuestionSelection} />
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField type={'Operator'} order={order} record={row.Operator__c} values={operators} setSelection={setOperatorSelection} />
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField type={'Type'}  order={order} record={row.Type__c} values={types} />
                </Box>
            </View>
            <View className="col-xs-3">
                <Box padding='.5em'>
                    
                </Box>
            </View>
            <View className="col-xs-1">
                <Box padding='.5em'>
                    
                    <div onClick={() => removeRow(order)}>
                        <svg className="slds-button__icon" aria-hidden="true">
                            <CloseIcon />
                        </svg>
                    </div>
                </Box>
            </View>
        </View>
    )
}

const ControlAddRow = ({ setRows }) => {

    const add = () => {
        setRows(rows => {
            return rows.concat([{ Operator__c: '', Type__c: '', Value__c: '', Title__c: '', Field__c: null, Field_Type__c: '' }])
        })
    }

    return (
        <View className="row center-xs middle-xs">
            <View className="col-xs-1">

                <Button add onClick={() => add()}>Add</Button>

            </View>
            <View className="col-xs-11">


            </View>
        </View>
    )
    
}

const ControlField = ({ order, type, record, values, setSelection }) => {

    console.log(record, values)
    return (
        <div class="slds-form-element">
            <div class="slds-form-element__control">
                <div class="slds-select_container">
                <select class="slds-select" id="select-01" value={record} onChange={(e) => setSelection(e, order)} >
                    <option value="">Please select</option>
                    {
                        values.map(value => {
                            return <option value={value.Id}>{value.Title__c}</option>
                        })
                    }
                </select>
                </div>
            </div>
        </div>
    )
}

const ControlHeader = () => {

    return (
        <View className="row middle-xs">
            <View className="col-xs-1">
                <Box padding='.5em'>
                    
                </Box>
            </View>
            <View className="col-xs-3">
                <Box padding='.5em'>
                    Question
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    Operator
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    Type
                </Box>
            </View>
            <View className="col-xs-3">
                <Box padding='.5em'>
                    Value
                </Box>
            </View>
            <View className="col-xs-1">
                <Box padding='.5em'>
                    
                </Box>
            </View>
        </View>
    )

}

const getCorrectOperators = (fieldType) => {

    switch (fieldType) {
        case '':
            return [];
            break;
        default:
            return [{Id: 1, Title__c: 'Equals'}, {Id: 2, Title__c: 'Not Equal'}, {Id: 3, Title__c: 'Is Null'}]; 
            break;
    }

}

const getCorrectTypes = (fieldType) => {

    switch (fieldType) {
        case '':
            return [];
            break;
        default:
            return [{Id: 1, Title__c: 'String'}, {Id: 2, Title__c: 'Reference'}, {Id: 3, Title__c: 'Global Constant'}]; 
            break;
    }

}
