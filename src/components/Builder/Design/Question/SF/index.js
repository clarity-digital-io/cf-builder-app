import React, { useState, useEffect, useContext } from 'react';
import { DesignContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { SmallSpinner } from '../../../../Elements/Spinner';
import { Select } from '../../../../Elements/Select';

export const SalesforceFields = () => {

    const { loading, activeQuestion, questions, requiredFields, additionalFields, setSObjectEdit, recordGroup } = useContext(DesignContext); 

    useEffect(() => {
        
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

                        {
                            loading ? 
                                <SmallSpinner /> : 
                                <SalesforceSelects fields={recordGroup.get(activeQuestion.Id)} additionalFields={additionalFields} /> 
                        }

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}

const SalesforceSelects = ({ fields, additionalFields }) => {

    console.log(fields, additionalFields);
    return ['test'
        // <ControlSelects rows={rows} additionalFields={additionalFields} />,
        // <ControlAddRow setRows={setRows} relatedId={relatedId} key={'Add'} />
    ]

}

const ControlSelects = ({additionalFields}) => {

    return rows.map()

    return <Select options={Object.keys(additionalFields)} />

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
