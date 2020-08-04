import React, { useContext, useEffect, useState } from 'react';
import { call } from '../../../RemoteActions'; 
import {Checkbox} from '@salesforce/design-system-react';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';
import CloseIcon from '../../../Elements/Icons/close';
import { Select } from '../../../Elements/Select';

import { BuilderContext } from '../../../Context';
import { Spinner } from '../../../Elements/Spinner';
import { StatusHandler } from '../../../Elements/Notification';

const prepare = (connections) => {
	return connections.map(connection => {
		if(connection.hasOwnProperty('forms__Form_Connection_Fields__r')) {
			delete connection.forms__Form_Connection_Fields__r;
		}
		return connection; 
	})
}

export const ConnectState = () => {

    const { form, connections, setConnections, sObjects, setNavState, setActiveConnection, setError } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    const [removed, setRemoved] = useState([]);

    useEffect(() => {

				let preppedConnections = prepare(connections); 
				let preppedRemovedConnections = prepare(removed); 

        if(update) {
            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "BuilderController.saveConnections", 
                    [JSON.stringify(preppedConnections), form.Id, JSON.stringify(preppedRemovedConnections)], 
                    (result, e) => connectionsResultHandler(result, e, setConnections, setUpdate),
                    form.forms__Status__c
								),
								null,
								setError
            )
        }
        
    }, [update]);

    const activate = (value, order) => {
				
        setConnections((rows) => {

            return rows.map((row, i) => {
                if(i == order) {
                    return { ...row, forms__New__c: value }
                }
                return row;
            })
        }); 

    }

    const setObjectSelection = (selection, order) => {

			let value = selection[0].value;

			setConnections((rows) => {

					return rows.map((row, i) => {
							if(i == order) {
									return { ...row, forms__Salesforce_Object__c: value }
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

            return connections.concat([{ forms__Form__c: form.Id, forms__Salesforce_Object__c: '' }])

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
		
		const closeStyle = {
			height: '60%',
			width: '60%',
		};

    return [
				
				<View className="row middle-xs end-xs" key={'Header'}>
						<View className="col-xs-12">
								<ViewStyle border>
										<Button onClick={() => setUpdate(true)}>
												Save Changes
										</Button>
								</ViewStyle>
						</View>
				</View>,
        <View body key={'Body'}>

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
                                    <View key={connection.Id} space className="row middle-xs">

                                        <View className="col-xs-2">
                                            <Box padding='.5em'>
                                                { order + 1}
                                            </Box>
                                        </View>

                                        <View className="col-xs-2">
                                            <Box padding='.5em'>

																								<Checkbox
																									id={connection.Id}
																									variant="toggle"
																									defaultChecked={connection.forms__New__c} 
																									onChange={(e, {checked}) => activate(checked, order)}
																								/>

                                            </Box>
                                        </View>
                                        <View className="col-xs-4">
                                            <Box padding='.5em'>

                                                <Select order={order} options={sObjects} value={connection.forms__Salesforce_Object__c} onChange={setObjectSelection} />

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
                                                
                                                <div style={closeStyle} onClick={() => removeRow(order, connection)}>
                                                    <CloseIcon />
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
                                <Spinner />
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

    ]
}

const connectionsResultHandler = (result, e, setConnections, setUpdate) => {

    setConnections(result); 
    setUpdate(false); 

}