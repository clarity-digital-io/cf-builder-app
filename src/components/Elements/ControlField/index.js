import React, { useState, useContext } from 'react';
import View from '../View';
import Box from '../Box';
import { DesignContext } from '../../Context';

import CloseIcon from '../Icons/close';
import {Button} from '../Button';

export const ControlGroup = () => {

    const [rows, setRows] = useState([{ Id: 1, Operator__c: 'Equals', Type__c: 'String', Value__c: 'Something', Title__c: "Comment", Field__c: 1, Field_Type__c: 'Comment' }]);

    return [
        <ControlHeader key={'Header'} />, 
        <ControlRows setRows={setRows} rows={rows} key={'Rows'} />,
        <ControlAddRow setRows={setRows} key={'Add'} />
    ]
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

const ControlRows = ({ rows, setRows }) => {

    return rows.map((row, i) => {

        return <ControlRow key={row.Id} order={i} row={row} setRows={setRows} />

    })

}

const ControlRow = ({ order, row, setRows }) => {

    const { questions } = useContext(DesignContext);

    const [operators, setOperators] = useState([{Id: 1, Title__c: 'Equals'}, {Id: 2, Title__c: 'Not Equal'}, {Id: 3, Title__c: 'Is Null'}]);

    const [types, setTypes] = useState([{Id: 1, Title__c: 'String'}, {Id: 2, Title__c: 'Reference'}, {Id: 3, Title__c: 'Global Constant'}]);

    const setQuestionSelection = (index, value) => {

        setOperators(getCorrectOperators(value));

        setTypes(getCorrectTypes(value));

        setRows((rows) => {
            return rows.map((row, i) => {
                if(i == index) {
                    return { ...row, Title__c: value.Title__c, Field__c: value.Id, Field_Type__c: value.Type__c }
                }
                return row;
            })
        })

    }

    const removeRow = (order) => {

        setRows(rows => {
            let updated = rows.slice();
            updated.splice(order, 1);
            return updated;
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
                    <ControlField type={'Question'} order={order} record={row} values={questions} setSelection={setQuestionSelection} />
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField type={'Operator'} order={order} record={row.Operator__c} values={operators} />
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'>
                    <ControlField type={'Type'}  order={order} record={row.Type__c} values={[]} />
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
            console.log('add', rows);
            return rows.concat([{ Operator__c: '', Type__c: '', Value__c: '', Title__c: '', Field__c: null }])
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

    const [open, setOpen] = useState(false); 

    const openClass = open ? 'slds-dropdown-trigger_click slds-is-open' : ''; 

    const hasFocus = open ? 'slds-has-focus' : ''; 

    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <div className="slds-combobox_container">
                    <div className={`slds-combobox slds-dropdown-trigger ${openClass}`} aria-expanded="true" aria-haspopup="listbox" role="combobox">
                        <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                            <input value={record.Title__c} onChange={(e) => setSelection(order, value)} onBlur={() => setOpen(false)} onClick={() => setOpen(open => !open)} type="text" className={`slds-input slds-combobox__input ${hasFocus} slds-combobox__input-value`} id="combobox-id-9" aria-controls="listbox-id-2" autoComplete="off" role="textbox" placeholder="Select an Option" />
                            <span className="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                                <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                                </svg>
                                </span>
                        </div>
                        <div id="listbox-id-2" className="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid" role="listbox">
                            <ul className="slds-listbox slds-listbox_vertical" role="presentation">
                                {
                                    values.map((value, i) => {

                                        let isSelected = value.Id == record.Id ? ' slds-is-selected' : '';

                                        return (
                                            <li key={value + i} role="presentation" className="slds-listbox__item" onMouseDown={(e) => setSelection(order, value)}>
                                                <div id={`option${i}`} className={`slds-media slds-listbox__option slds-listbox__option_plain slds-media_small ${isSelected}`} role="option">
                                                <span className="slds-media__figure slds-listbox__option-icon">
                                                    {
                                                        isSelected ? 
                                                        <span class="slds-icon_container slds-icon-utility-check slds-current-color">
                                                            <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                                                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                                                            </svg>
                                                        </span> : 
                                                        null
                                                    }
                                                </span>
                                                <span className="slds-media__body">
                                                    <span className="slds-truncate" title={value.Id}>{value.Title__c}</span>
                                                </span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}