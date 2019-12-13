import React, { useContext, useEffect, useState } from 'react';
import { call } from '../../../RemoteActions'; 

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';
import CloseIcon from '../../../Elements/Icons/close';
import { Select } from '../../../Elements/Select';

import { BuilderContext } from '../../../Context';
import { SmallSpinner } from '../../../Elements/Spinner';
import { StatusHandler } from '../../../Elements/Notification';

export const ConnectState = () => {

    const { form, connections, setConnections, sObjects, setNavState, setActiveConnection } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    const [removed, setRemoved] = useState([]);

    useEffect(() => {

        if(update) {

            StatusHandler(
                form.Status__c,
                () => setUpdate(false),
                () => call(
                    "ClarityFormBuilder.saveConnections", 
                    [JSON.stringify(connections), form.Id, JSON.stringify(removed)], 
                    (result, e) => connectionsResultHandler(result, e, setConnections, setUpdate),
                    form.Status__c
                )
            )
        }
        
    }, [update]);

    const activate = (e, order) => {

        let checked = e.target.checked;

        setConnections((rows) => {

            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, New__c: checked }
                }
                return row;
            })
        }); 

    }

    const setObjectSelection = (value, order) => {

        setConnections((rows) => {

            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, Salesforce_Object__c: value }
                }
                return row;
            })
        }); 

    }

    const edit = (connection) => {

        setActiveConnection(connection);
        setNavState('MAPPING'); 

    }

    const add = () => {

        setConnections(connections => {

            return connections.concat([{ Clarity_Form__c: form.Id, Salesforce_Object__c: '' }])

        })

    }

    const removeRow = (order, connection) => {

        setConnections(rows => {
            let updated = rows.slice();
            updated.splice(order, 1);
            return updated;
        });

        setRemoved(removed => {
            return removed.concat([connection]);
        })

    }


    return [
        
        <View silver body className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Form Connections</h1>

                        <p>Create new or update existing Salesforce records from Clarity Form Responses. Order determines which record is created first, giving you the ability to store and use a created Record Id.</p>

                        <p>When connecting existing Salesforce records, we can use those values to prepopulate Clarity Form Questions.</p>

                    </ViewStyle>

                    <ViewStyle>
                        <View border space className="row middle-xs">

                            <View className="col-xs-2">
                                <Box padding='.5em'>
                                    <h2>Order</h2>
                                </Box>
                            </View>
                            <View className="col-xs-2">
                                <Box padding='.5em'>
                                    
                                    <h2>New</h2>

                                </Box>
                            </View>
                            <View className="col-xs-5">
                                <Box padding='.5em'>
                                    <h2>Salesforce Object</h2>
                                </Box>
                            </View>
                            <View className="col-xs-2">
                                <Box padding='.5em'>


                                </Box>
                            </View>

                            <View className="col-xs-1">
                                <Box padding='.5em'>
                                    
                                </Box>
                            </View>

                        </View>

                        {
                            connections.map((connection, order) => {

                                return (
                                    <View key={connection.Id} space border className="row middle-xs">

                                        <View className="col-xs-2">
                                            <Box padding='.5em'>
                                                { order + 1}
                                            </Box>
                                        </View>

                                        <View className="col-xs-2">
                                            <Box padding='.5em'>

                                                <div className="slds-form-element">
                                                    <label className="slds-checkbox_toggle slds-grid">
                                                        <input checked={connection.New__c} onChange={(e) => activate(e, order)} type="checkbox" name="checkbox-toggle-14" value="checkbox-toggle-14" aria-describedby="checkbox-toggle-14" />
                                                        <span id="checkbox-toggle-14" className="slds-checkbox_faux_container" aria-live="assertive">
                                                        <span className="slds-checkbox_faux"></span>
                                                        </span>
                                                    </label>
                                                </div>

                                            </Box>
                                        </View>
                                        <View className="col-xs-4">
                                            <Box padding='.5em'>

                                                <Select order={order} options={sObjects} value={connection.Salesforce_Object__c} onChange={setObjectSelection} />

                                            </Box>
                                        </View>
                                        <View className="col-xs-2">
                                            <Box padding='.5em'>

                                            {
                                                connection.Id != null ? 
                                                <Button add onClick={() => edit(connection)}>Edit</Button> : 
                                                null
                                            }

                                            </Box>
                                        </View>

                                        <View className="col-xs-1">
                                            <Box padding='.5em'>
                                                
                                                <div onClick={() => removeRow(order, connection)}>
                                                    <svg className="slds-button__icon" aria-hidden="true">
                                                        <CloseIcon />
                                                    </svg>
                                                </div>

                                            </Box>
                                        </View>

                                    </View>
                                )

                            })
                        }

                        {
                            update ? 
                            <ViewStyle space top border>
                                <SmallSpinner />
                            </ViewStyle> :
                            <View className="row center-xs middle-xs">
                                <View className="col-xs-3">
                                    <Box padding='.5em'>
                                        <Button add onClick={() => add()}>Add Connection</Button>
                                    </Box>
                                </View>
                                <View className="col-xs-9">
                                    <Box padding='.5em'>
                                        
                                    </Box>
                                </View>
                            </View>
                        }
                        
                    </ViewStyle>

                </Box>
            </View>
        </View>,
    
        <View footer className="row middle-xs end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle middle>
                    <Button cta onClick={() => setUpdate(true)}>
                        Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>

    ]
}

const connectionsResultHandler = (result, e, setConnections, setUpdate) => {

    setConnections(result); 
    setUpdate(false); 

}