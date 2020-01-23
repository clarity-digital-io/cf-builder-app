import React, { useContext, useEffect, useState } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';

import { BuilderContext } from '../../../Context';
import DistributionNavigation from '../../../Elements/Navigation/distribution';
import { StatusHandler } from '../../../Elements/Notification';

export const DistributeState = () => {

    const { form, setForm } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
                    "ClarityFormBuilder.updateForm", 
                    [JSON.stringify(form)], 
                    (result, e) => resultHandler(result, e, setForm, setUpdate),
                )
            )
        }
        
    }, [update]);

    return (

        <View silver full className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Distribution</h1>

                        <p>Clarity Forms provides multiple ways for users to access your new Form.</p>

                        {
                            form.forms__Status__c == 'Draft' ? 
                            <h2>Form must be published before distribution.</h2>:
                            null
                        }

                    </ViewStyle>


                    <View>

                        <DistributionNavigation />

                    </View>

                </Box>
            </View>
        </View>

    )
}
