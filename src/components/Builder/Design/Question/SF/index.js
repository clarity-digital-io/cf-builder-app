import React, { useState, useEffect, useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { SmallSpinner } from '../../../../Elements/Spinner';
import CloseIcon from '../../../../Elements/Icons/close';

import { Select } from '../../../../Elements/Select';
import { Button } from '../../../../Elements/Button';

export const SalesforceFields = () => {

    const { activeRecordGroup, setActiveRecordGroup, setSObjectEdit } = useContext(EditContext); 

    const { recordGroup, activeQuestion } = useContext(DesignContext); 

    useEffect(() => {
        
        setActiveRecordGroup(recordGroup.get(activeQuestion.Id));
        setSObjectEdit(activeQuestion.Type__c);

    }, []);



    return (
        <View className="row middle-xs">
            <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Box>

                    <ViewStyle space border>

                        <h1>{ activeQuestion.Type__c }: { activeQuestion.Salesforce_Object__c } </h1>

                        <ViewStyle>

                            <p>
                                { activeQuestion.Title__c }
                            </p>

                        </ViewStyle>

                    </ViewStyle>

                    <ViewStyle space border>

                        <h1>Salesforce Fields</h1>

                        <SalesforceSelects 
                            records={activeRecordGroup} 
                            setActiveRecordGroup={setActiveRecordGroup} 
                            relatedId={activeQuestion.Id} 
                        /> 

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}

const SalesforceSelects = ({ records, setActiveRecordGroup, relatedId }) => {
 
    return [
        <ControlSelects key={'Select'} records={records} />,
        <ControlAddRow key={'Add'} setActiveRecordGroup={setActiveRecordGroup} relatedId={relatedId} />
    ]

}

const ControlSelects = ({ records }) => {

    return records.map((row, i) => {
        return <ControlSelect key={row.Order__c} index={i} row={row} />
    });

}

const ControlSelect = ({ index, row }) => {

    const { activeRecordGroup, setActiveRecordGroup, additionalFields } = useContext(EditContext); 

    const { setQuestionState, setActiveQuestion } = useContext(DesignContext); 

    const edit = (state) => {

        setQuestionState(state);
        setActiveQuestion(row);

    }

    const setSelection = (e, order) => {

        let value = e.target.value; 

        setActiveRecordGroup(records => {

            return records.map((record, i) => {

                if(i == order) {
                    return { ...record, Field__c: value, Type__c: additionalFields[value] }
                }

                return record; 

            })
        })

    }

    return (
        <View className="row center-xs middle-xs">
            <View className="col-xs-1">
                <Box padding='.5em'>
                    <span id="center">{ index + 1 }</span>
                </Box>                
            </View>
            <View className="col-xs-4">
                <Box padding='.5em'> 
                    <Select key={row.Order__c} value={row.Field__c} options={Object.keys(additionalFields)} onChange={(e) => setSelection(e, row.Order__c)}/>
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    <Button add onClick={() => edit('EDIT')}>Edit</Button>
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    <Button add onClick={() => edit('AUTOMATE')}>Automate</Button>
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    <Button add onClick={() => edit('LOGIC')}>Logic</Button>
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

const ControlAddRow = ({ setActiveRecordGroup, relatedId }) => {

    const add = () => {
 
        setActiveRecordGroup(records => {   
            return records.concat([{ Logic__c: 'AND', Type__c: '', Title__c: '', Field__c: '', Record_Group__c: relatedId, Order__c: records.length, Page__c: 0 }]);
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
