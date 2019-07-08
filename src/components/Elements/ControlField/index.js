import React, { useState, useEffect } from 'react';
import View from '../View';
import Box from '../Box';

import CloseIcon from '../Icons/close';
import {Button} from '../Button';
import { call } from '../../RemoteActions';
import ViewStyle from '../View/style';

export const ControlGroup = ({ relatedId, value, rows, setRows, setCondition, questions, filter }) => {

    return [
        <ControlHeader key={'Header'} />, 
        <ControlRows setRows={setRows} rows={rows} key={'Rows'} questions={questions} filter={filter} />,
        <ControlAddRow setRows={setRows} relatedId={relatedId} key={'Add'} />,
        <ControlCondition value={value} setCondition={setCondition} key={'Condition'} />
    ]
}

const ControlCondition = ({value, setCondition}) => {

    return (
        <ViewStyle space>
            <View className="row middle-xs">
                <View className="col-xs-12">

                <fieldset className="slds-form-element">
                    <div className="slds-form-element__control">
                        <span className="slds-radio">
                        <input onChange={(e) => setCondition(e)} type="radio" className="radio" id="AND" checked={value == 'AND'} name="options" disabled="" />
                        <label className="slds-radio__label" htmlFor="AND">
                            <span className="slds-radio_faux"></span>
                            <span className="slds-form-element__label">All of the Conditions are met (AND)</span>
                        </label>
                        </span>
                        <span className="slds-radio">
                        <input onChange={(e) => setCondition(e)} type="radio" className="radio" id="OR" checked={value == 'OR'} name="options" disabled="" />
                        <label className="slds-radio__label" htmlFor="OR">
                            <span className="slds-radio_faux"></span>
                            <span className="slds-form-element__label">Any of the Conditions are met (OR)</span>
                        </label>
                        </span>
                    </div>
                </fieldset>

                </View>
            </View>
        </ViewStyle>
    )
}

const ControlRows = ({ rows, setRows, questions, filter }) => {

    return rows.map((row, i) => {

        return <ControlRow key={row.Id} order={i} row={row} setRows={setRows} questions={questions} filter={filter} />

    })

}

const ControlRow = ({ order, row, setRows, questions, filter }) => {

    const [operators, setOperators] = useState(getCorrectOperators(row.Field_Type__c));

    const [types, setTypes] = useState(getCorrectTypes(row));

    const [options, setOptions] = useState([]); 
    
    const [valueField, setValueField] = useState(row.Type__c);

    useEffect(() => {

        if(valueField == 'Boolean') {
            setOptions(['True'])
        }

        if(valueField == 'Picklist' && row.Field_Type__c == 'Date') {
            setOptions(['TODAY', 'YESTERDAY', 'LAST_WEEK', 'LAST_MONTH', 'NEXT_WEEK', 'NEXT_MONTH'])
        }

        if(valueField == 'Picklist' && row.Field_Type__c != 'Date') {
            call("ClarityFormBuilder.getQuestionOptions", [row.Field__c], (result, e) => getOptionsHandler(result, e, setOptions));
        }

    }, [valueField])

    const setQuestionSelection = (e, order) => {

        let value = e.target.value; 

        let question = questions.find(question => question.Id == value); 

        setOperators(getCorrectOperators(question.Type__c));

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

        setTypes(getCorrectTypes({ ...row, Operator__c: value }));

    }

    const setTypeSelection = (e, order) => {

        let value = e.target.value; 

        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, Type__c: value }
                }
                return row;
            })
        }); 

        setValueField(value); 

    }

    const setValueSelection = (e, order) => {

        let value = e.target.value; 

        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, Value__c: value }
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
                    {
                        filter ? 
                        <ControlFieldSF order={order} record={row.Field__c} values={questions} setSelection={setQuestionSelection} /> :
                        <ControlFieldQuestion order={order} record={row.Field__c} values={questions} setSelection={setQuestionSelection} />
                    }
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField order={order} record={row.Operator__c} values={operators} setSelection={setOperatorSelection} />
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField order={order} record={row.Type__c} values={types} setSelection={setTypeSelection} />
                </Box>
            </View>
            <View className="col-xs-3">
                <Box padding='.5em'>
                    <ControlValueField options={options} order={order} record={row} setSelection={setValueSelection} /> 
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

const ControlAddRow = ({ setRows, relatedId }) => {

    const add = () => {
        setRows(rows => {
            return rows.concat([{ Operator__c: '', Type__c: '', Value__c: '', Title__c: '', Field__c: null, Field_Type__c: '', Clarity_Form_Question__c: relatedId }])
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

const ControlFieldSF = ({ order, record, values, setSelection }) => {

    return (
        <div class="slds-form-element">
            <div class="slds-form-element__control">
                <div class="slds-select_container">
                <select class="slds-select" id="select-02" value={record} onChange={(e) => setSelection(e, order)} >
                    <option value="">Please select</option>
                    {
                        values.map(value => {
                            return <option value={value}>{value}</option>
                        })
                    }
                </select>
                </div>
            </div>
        </div>
    )

}

const ControlFieldQuestion = ({ order, record, values, setSelection }) => {

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

const ControlField = ({ order, record, values, setSelection }) => {

    return (
        <div class="slds-form-element">
            <div class="slds-form-element__control">
                <div class="slds-select_container">
                <select class="slds-select" id="select-01" value={record} onChange={(e) => setSelection(e, order)} >
                    <option value="">Please select</option>
                    {
                        values.map(value => {
                            return <option value={value}>{value}</option>
                        })
                    }
                </select>
                </div>
            </div>
        </div>
    )
}

const ControlFieldInput = ({ type, order, record, setSelection }) => {

    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <input type={type} onChange={(e) => setSelection(e, order)} value={ record } id="text-input-id-1" placeholder="" className="slds-input" />
            </div>
        </div>
    )
}

const getOptionsHandler = (result, e, setOptions) => {
    setOptions(result.map(r => r.Label__c)); 
}

const ControlValueField = ({ options, order, record, setSelection }) => {

    switch (record.Type__c) {
        case 'String':
            return <ControlFieldInput type={'text'} order={order} record={record.Value__c} setSelection={setSelection} />
            break; 
        case 'Number':
            return <ControlFieldInput type={'number'} order={order} record={record.Value__c} setSelection={setSelection} />
            break;
        case 'Reference':
            return 'Reference'
            break;
        case 'Picklist':
            return <ControlField order={order} record={record.Value__c} values={options} setSelection={setSelection} />
            break;
        case 'Boolean':
            return <ControlField order={order} record={record.Value__c} values={options} setSelection={setSelection} />
            break; 
        case 'Date':
            return <ControlFieldInput type={'date'} order={order} record={record.Value__c} setSelection={setSelection} />
            break;
        default:
            return ''
            break;
    }

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
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Ranking':
        case 'Checkbox':
        case 'Email':
        case 'Lookup':
            return ['Equals', 'Not Equal', 'Is Not Null']; 
            break;
        case 'Comment':
        case 'RecordGroup':
        case 'Attachments':
            return ['Is Not Null']; 
            break;
        case 'NetPromoterScore':
        case 'Slider':
        case 'Number':
        case 'Date':
            return ['Equals', 'Not Equal', 'Is Not Null', 'Is Greater than or equal to', 'Is Less than or equal to']; 
            break;
        default:
            return []; 
            break;
    }

}

const getCorrectTypes = (row) => {

    switch (row.Operator__c) {
        case 'Equals':
            return getTypeForEquals(row.Field_Type__c); 
            break;
        case 'Not Equal':
            return getTypeForEquals(row.Field_Type__c); 
            break;
        case 'Is Not Null':
            return ['Boolean'];
            break;
        case 'Is Greater than or equal to':
            return getTypeForGLEqual(row.Field_Type__c);
            break;
        case 'Is Less than or equal to':
            return getTypeForGLEqual(row.Field_Type__c);
            break;
        default:
            return [];
            break;
    }
}

const getTypeForGLEqual = (fieldType) => {
    switch (fieldType) {
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Ranking':
        case 'Checkbox':
        case 'Email':
        case 'Lookup':
        case 'NetPromoterScore':
        case 'Slider':
        case 'Number':
            return ['Reference', 'Number'];
        case 'Date':
            return ['Reference', 'Date', 'Picklist'];
    }
}

const getTypeForEquals = (fieldType) => {

    switch (fieldType) {
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Ranking':
        case 'Checkbox':
            return ['Reference', 'Picklist'];
            break;  
        case 'Email':
        case 'Lookup':
            return ['Reference', 'String']; 
        case 'NetPromoterScore':
        case 'Slider':
        case 'Number':
            return ['Reference', 'Number']; 
        case 'Date':
            return ['Reference', 'Date', 'Picklist'];
    }
}
