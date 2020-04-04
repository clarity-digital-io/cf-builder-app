import React, { useContext, useState, useEffect } from 'react';
import { call } from '../../../RemoteActions'; 
import styled, { css } from 'styled-components';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';
import { Spinner } from '../../../Elements/Spinner';
import Main from '../../../Elements/Theme';

import { BuilderContext, DesignContext } from '../../../Context';
import { FieldConnectState } from './connect';
import { PreFillState } from './prefill';
import { StatusHandler } from '../../../Elements/Notification';
 
export const MappingState = () => {

    const [localNavState, setLocalNavState] = useState('CONNECT');

    const { setError, loading, navState, setNavState, activeFieldPrefills, setActiveFieldPrefills, activeFieldMapping, setActiveFieldMapping, activeConnection, form } = useContext(BuilderContext);

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if(update) {

            const combinedConnections = activeFieldMapping.concat(activeFieldPrefills).map(fieldMapping => {
                delete fieldMapping.Id; 
                return fieldMapping;
            });

            StatusHandler(
                form.forms__Status__c,
                () => setUpdate(false),
                () => call(
										setError,
                    "ClarityFormBuilder.saveActiveFieldConnections", 
                    [JSON.stringify(combinedConnections), activeConnection.Id], 
                    (result, e) => fieldConnectionsResultHandler(result, e, setActiveFieldPrefills, setActiveFieldMapping, setUpdate),
                    form.forms__Status__c
								),
								null,
								setError
            )

        }
        
    }, [update]);

    const navigateMapping = (loc) => {
        if(loc == 'PREPOPULATE' && activeConnection.forms__New__c) {
            return;
        }

        setLocalNavState(loc); 
    }

    return [

				<View footer className="row middle-xs end-xs" key={'Header'}>
					<View className="col-xs-12">
							<ViewStyle middle>

									{
											navState == 'MAPPING' ? 
													<Button neutral onClick={() => setNavState('CONNECT')}>Back</Button> : 
													null
									}

									<Button cta onClick={() => setUpdate(true)}>
											Save Changes
									</Button>
							</ViewStyle>
					</View>
			</View>,
        <View extraspace body className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle border>
                        <View className="row middle-xs">
                            <View className="col-xs-4">
                                <Box padding='0'>

                                    <Navigation>
                                        <ul>
                                            <li className={ localNavState == 'CONNECT' ? 'active' : '' } onClick={() => navigateMapping('CONNECT')}>
                                                <a>Connect</a>
                                            </li>

                                            <li className={ getClassName(activeConnection.forms__New__c, localNavState) } onClick={() => navigateMapping('PREFILL')}>
                                                <a>Prefill</a>
                                            </li>

                                        </ul>
                                    </Navigation>

                                </Box>
                            </View>
                        </View>
                    </ViewStyle>

                    <ViewStyle space>
                        
                        <h1>Connection Fields: { activeConnection.forms__Salesforce_Object__c }</h1>

                        {
                            localNavState == 'CONNECT' ? 
                            <p>Map question values from a Clarity Form Response to the <strong>{ activeConnection.forms__Salesforce_Object__c }</strong> type record.</p> :
                            <p>Prefill question values with <strong>{ activeConnection.forms__Salesforce_Object__c }</strong> record field values.</p>

                        }

                    </ViewStyle>

                    {
                        loading ? 
                        <Spinner /> :
                        getMappingState(localNavState)
                    }

                    <ViewStyle>
                        <View className="row middle-xs">
                            <View className="col-xs-8">
                                <Box padding='0em'>

                                    <h1>Record Id stored as { `{Connection_${activeConnection.forms__Salesforce_Object__c}}` }</h1>

                                    <p>Record Id can be used in subsequent Connections, by selecting 'Custom' and adding the variable Record Id: { `{Connection_${activeConnection.forms__Salesforce_Object__c}}` }. &#128526;</p>

                                </Box>
                            </View>
                        </View>
                    </ViewStyle>

                </Box>
            </View>
        </View>

    ]
}

const fieldConnectionsResultHandler = (result, e, setActiveFieldPrefills, setActiveFieldMapping, setUpdate) => {
    setActiveFieldMapping(result.Mapping); 
    setActiveFieldPrefills(result.Prefills);
    setUpdate(false);
}

const getClassName = (status, localNavState) => {

    if(status) {
        return 'disabled'
    }

    if(localNavState == 'PREFILL') {
        return 'active'; 
    }
    
}

const getMappingState = (nav) => {
    switch (nav) {
        case 'PREFILL':
            return <PreFillState />
            break;
        default:
            return <FieldConnectState />
            break;
    }
} 

const Navigation = styled.nav`

    .active {
        font-weight: 900;
    }

    .disabled {
        pointer-events: none;
        cursor: default;
    }

    .disabled a {
        color: ${Main.color.grey} !important;
    }

    ul {
        margin: 0; 
    }

    li {
        cursor: pointer;
        text-decoration: none !important;
        display: inline-block;
        padding-right: 2.5em;

        font-size: 1em;
        text-align: left;
    }

    li:hover {
        font-weight: 900;
    }
`;