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
                                    setRecordGroup={setActiveRecordGroup} 
                                    relatedId={activeQuestion.Id} 
                                    additionalFields={additionalFields}
                                /> 
               

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}

const SalesforceSelects = ({ records, setRecordGroup, relatedId, additionalFields }) => {
 
    return [
        <ControlSelects key={'Select'} records={records} additionalFields={additionalFields} />,
        <ControlAddRow key={'Add'} setRecordGroup={setRecordGroup} relatedId={relatedId} />
    ]

}

const ControlSelects = ({ records, additionalFields }) => {

    console.log('reccordGroup3.1', records, additionalFields); 

    return records.map(row => {
        console.log('row', row)
        return <Select key={row.Id} value={row.Field__c} options={Object.keys(additionalFields)} />
    });

}

const ControlAddRow = ({ setRecordGroup, relatedId }) => {

    const add = () => {
 
        setRecordGroup(records => {   
            return records.concat([{ Id: 10, Logic__c: 'AND', Type__c: '', Title__c: '', Field__c: '', Record_Group__c: relatedId, Order__c: records.length, Page__c: 0 }]);
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
