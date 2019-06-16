import React, { useState, useEffect, useContext } from 'react';
import { DesignContext } from '../../../../Context';

import View from '../../../../Elements/View';
import ViewStyle from '../../../../Elements/View/style';

import Box from '../../../../Elements/Box';
import { SmallSpinner } from '../../../../Elements/Spinner';

export const SalesforceFields = () => {

    const { loading, activeQuestion, requiredFields, additionalFields, setSObjectEdit } = useContext(DesignContext); 

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
                            loading ? <SmallSpinner /> : <SalesforceSelects /> 
                        }

                    </ViewStyle>

                </Box>  
            </View>
        </View>
    )
}

const SalesforceSelects = () => {
    return 'SalesforceSelects'
}