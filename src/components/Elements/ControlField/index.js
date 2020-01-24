import React, { useState, useEffect } from 'react';
import { Input as AntInput, Radio as AntRadio} from 'antd';
import { call } from '../../RemoteActions';

import View from '../View';
import Box from '../Box';

import CloseIcon from '../Icons/close';
import {Button} from '../Button';
import ViewStyle from '../View/style';
import { Select } from '../Select'; 


export const ControlGroup = ({ type, relatedId, value, rows, setRows, setCondition, questions, filter }) => {

    return [
        <ControlHeader key={'Header'} />, 
        <ControlRows setRows={setRows} rows={rows} key={'Rows'} questions={questions} filter={filter} />,
        <ControlAddRow type={type} setRows={setRows} relatedId={relatedId} key={'Add'} />,
        <ControlCondition value={value} setCondition={setCondition} key={'Condition'} />
    ]
}

const ControlCondition = ({value, setCondition}) => {

		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};

    return (
        <ViewStyle space>
            <View className="row middle-xs">
                <View className="col-xs-12">

									<AntRadio.Group onChange={(e) => setCondition(e)} value={value}>
										<AntRadio style={radioStyle} value={'AND'}>
											All of the Conditions are met (AND)
										</AntRadio>
										<AntRadio style={radioStyle} value={'OR'}>
											Any of the Conditions are met (OR)
										</AntRadio>
									</AntRadio.Group>

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

    const [operators, setOperators] = useState(getCorrectOperators(row.forms__Field_Type__c));

    const [types, setTypes] = useState(getCorrectTypes(row));

    const [options, setOptions] = useState([]); 
    
    const [valueField, setValueField] = useState(row.forms__forms__Type__c);

    useEffect(() => {

        if(valueField == 'Boolean') {
            setOptions(['True'])
        }

        if(valueField == 'Picklist' && row.forms__Field_Type__c == 'Date') {
            setOptions(['TODAY', 'YESTERDAY', 'LAST_WEEK', 'LAST_MONTH', 'NEXT_WEEK', 'NEXT_MONTH'])
        }

        if(valueField == 'Picklist' && row.forms__Field_Type__c != 'Date') {
            call("ClarityFormBuilder.getQuestionOptions", [row.forms__Field__c], (result, e) => getOptionsHandler(result, e, setOptions));
        }

    }, [valueField])

    const setQuestionSelection = (value, order) => {

			let question = questions.find(question => question.Id == value); 

        setOperators(getCorrectOperators(question.forms__Type__c));

        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, forms__Title__c: question.forms__Title__c, forms__Field__c: question.Id, forms__Field_Type__c: question.forms__Type__c, forms__Operator__c: '' }
                }
                return row;
            })
        }); 

    }

    const setOperatorSelection = (value, order) => {
        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, forms__Operator__c: value }
                }
                return row;
            })
        }); 

        setTypes(getCorrectTypes({ ...row, forms__Operator__c: value }));
    }

    const setTypeSelection = (value, order) => {
        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, forms__Type__c: value }
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
                    return { ...row, forms__Value__c: value }
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
		
		const closeStyle = {
			height: '60%',
			width: '60%',
		};

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
                        <ControlFieldQuestion order={order} record={row.forms__Field__c} values={questions} setSelection={setQuestionSelection} /> :
                        <ControlFieldQuestion order={order} record={row} values={questions} setSelection={setQuestionSelection} />
                    }
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField order={order} record={row.forms__Operator__c} values={operators} setSelection={setOperatorSelection} />
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
                    
                    <div style={closeStyle} onClick={() => removeRow(order)}>

                        <CloseIcon />

                    </div>
                    
                </Box>
            </View>
        </View>
    )
}

const ControlAddRow = ({ type, setRows, relatedId }) => {

    const add = () => {

        setRows(rows => {
            switch (type) {
                case 'assign':
                    return rows.concat([{ forms__Operator__c: '', forms__Type__c: '', forms__Value__c: '', forms__Title__c: '', forms__Field__c: null, forms__Field_Type__c: '', forms__Clarity_Form_Assignment__c: relatedId }])
                    break;  
                default:
                    return rows.concat([{ forms__Operator__c: '', forms__Type__c: '', forms__Value__c: '', forms__Title__c: '', forms__Field__c: null, forms__Field_Type__c: '', forms__Clarity_Form_Question__c: relatedId }])
                    break;
            }
        });
    }

    return (
        <View className="row center-xs middle-xs">
            <View className="col-xs-1">

                <Button add onClick={() => add()}>&#43;</Button>

            </View>
            <View className="col-xs-11">


            </View>
        </View>
    )
    
}

const ControlFieldQuestion = ({ order, record, values, setSelection }) => {

    return <Select key={record.Id} value={record.forms__Field__c} options={values} onChange={(e) => setSelection(e, order)} valueField={'Id'} labelField={'forms__Title__c'} />

}

const ControlField = ({ order, record, values, setSelection }) => {

    return <Select key={record} value={record} options={values} onChange={(e) => setSelection(e, order)} />
}

const ControlFieldInput = ({ type, order, record, setSelection }) => {
    return <AntInput type="text" id={order} value={record} onChange={(e) => setSelection(e, order)} />
}

const getOptionsHandler = (result, e, setOptions) => {
    setOptions(result.map(r => r.forms__Label__c)); 
}

const ControlValueField = ({ options, order, record, setSelection }) => {
    switch (record.forms__Type__c) {
        case 'String':
            return <ControlFieldInput type={'text'} order={order} record={record.forms__Value__c} setSelection={setSelection} />
            break; 
        case 'Number of New Records':
        case 'Number':
            return <ControlFieldInput type={'number'} order={order} record={record.forms__Value__c} setSelection={setSelection} />
            break;
        case 'Reference':
            return <ControlFieldInput type={'text'} order={order} record={record.forms__Value__c} setSelection={setSelection} />
            break;
        case 'Picklist':
            return <ControlField order={order} record={record.forms__Value__c} values={options} setSelection={setSelection} />
            break;
        case 'Boolean':
            return <ControlField order={order} record={record.forms__Value__c} values={options} setSelection={setSelection} />
            break; 
        case 'Date':
            return <ControlFieldInput type={'date'} order={order} record={record.forms__Value__c} setSelection={setSelection} />
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
        case 'PictureChoice':
        case 'MultipleChoice':
        case 'Dropdown':
        case 'Ranking':
        case 'Checkbox':
        case 'Email':
            return ['Equals', 'Not Equal', 'Is Not Null']; 
            break;
        case 'Comment':
        case 'Attachments':
        case 'Lookup':
            return ['Is Not Null']; 
            break;
        case 'NetPromoterScore':
        case 'Slider':
        case 'Number':
        case 'Date':
        case 'RecordGroup':
            return ['Equals', 'Not Equal', 'Is Not Null', 'Is Greater than or equal to', 'Is Less than or equal to']; 
            break;
        default:
            return []; 
            break;
    }

}

const getCorrectTypes = (row) => {

    switch (row.forms__Operator__c) {
        case 'Equals':
            return getTypeForEquals(row.forms__Field_Type__c); 
            break;
        case 'Not Equal':
            return getTypeForEquals(row.forms__Field_Type__c); 
            break;
        case 'Is Not Null':
            return ['Boolean'];
            break;
        case 'Is Greater than or equal to':
            return getTypeForGLEqual(row.forms__Field_Type__c);
            break;
        case 'Is Less than or equal to':
            return getTypeForGLEqual(row.forms__Field_Type__c);
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
            break;
        case 'Date':
            return ['Reference', 'Date', 'Picklist'];
            break;
        case 'RecordGroup':
            return ['Number of New Records'];
            break;
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
            return ['Reference', 'String']; 
            break;
        case 'NetPromoterScore':
        case 'Slider':
        case 'Number':
            return ['Reference', 'Number']; 
            break;
        case 'RecordGroup':
            return ['Number of New Records'];
            break;
        case 'Date':
            return ['Reference', 'Date', 'Picklist'];
            break;
    }
}
