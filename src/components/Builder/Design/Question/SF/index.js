import React, { useState, useEffect, useContext } from 'react';
import { DesignContext, EditContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { SmallSpinner } from '../../../../Elements/Spinner';
import { Select } from '../../../../Elements/Select';
import { Button } from '../../../../Elements/Button';

export const SalesforceFields = () => {

    const { activeRecordGroup, setActiveRecordGroup } = useContext(EditContext); 

    const { loading, recordGroup, additionalFields, activeQuestion, setRecordGroup, setSObjectEdit } = useContext(DesignContext); 

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
                            additionalFields={additionalFields}
                        /> 

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}

const SalesforceSelects = ({ records, setActiveRecordGroup, relatedId, additionalFields }) => {
 
    return [
        <ControlSelects setActiveRecordGroup={setActiveRecordGroup} key={'Select'} records={records} additionalFields={additionalFields} />,
        <ControlAddRow key={'Add'} setActiveRecordGroup={setActiveRecordGroup} relatedId={relatedId} />
    ]

}

const ControlSelects = ({ setActiveRecordGroup, records, additionalFields }) => {

    return records.map((row, i) => {
        return <ControlSelect setActiveRecordGroup={setActiveRecordGroup} key={row.Order__c} index={i} row={row} additionalFields={additionalFields} />
    });

}

const ControlSelect = ({ setActiveRecordGroup, index, row, additionalFields }) => {

    const setSelection = (e, order) => {

        let value = e.target.value; 

        setActiveRecordGroup(records => {

            return records.map((record, i) => {

                if(i == index) {
                    return { ...record, Field__c: value, Type__c: additionalFields[value] }
                }

                return record; 

            })
        })

    }

    return (
        <View className="row middle-xs">
            <View className="col-xs-1">
                <Box padding='.5em'>
                    <span id="center">{ index + 1 }</span>
                </Box>                
            </View>
            <View className="col-xs-3">
                <Box padding='.5em'> 
                    <Select key={row.Order__c} value={row.Field__c} options={Object.keys(additionalFields)} onChange={(e) => setSelection(e, row.Order__c)}/>
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    Edit
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    Automate
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    Logic
                </Box>
            </View>
            <View className="col-xs-2">
                <Box padding='.5em'> 
                    Delete
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
