import React, { useContext, useEffect, useState } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';

import { BuilderContext, DesignContext } from '../../../Context';
import { StatusHandler } from '../../../Elements/Notification';

import { Input as SalesforceInput, Checkbox} from '@salesforce/design-system-react';

export const SettingsState = () => {

		const { form, setForm, setError } = useContext(BuilderContext);
	
    const [update, setUpdate] = useState(false);

    useEffect(() => {

        if(update) {

					form.forms__Multi_Page_Info__c = form.forms__Multi_Page_Info__c != null ? JSON.stringify(form.forms__Multi_Page_Info__c) : '';

					StatusHandler(
							form.forms__Status__c,
							() => setUpdate(false),
							() => call(
									setError,
									"FormBuilder.updateForm", 
									[JSON.stringify(form)], 
									(result, e) => resultHandler(result, e, setForm, setUpdate),
							),
							null,
							setError
					)
        }
        
    }, [update]);

    const updateName = (e) => {

        let value = e.target.value; 

        setForm(form => {
            return { ...form, Name: value }
        })
    }

    const updateLimit = (value) => {
        setForm(form => {
            return { ...form, forms__Limit__c: value }
        })
		}

		const updateToMulti = (e) => {

			let checked = e.target.checked;

				setForm(form => {
						return { ...form, forms__Multi_Page__c: checked }
				})
		}
			
		const updateIsFlow = (e) => {

			let checked = e.target.checked;

				setForm(form => {
						return { ...form, forms__Is_Flow__c: checked }
				})
		}

		const updateHasThankYou = (e) => {

			let checked = e.target.checked;

				setForm(form => {
						return { ...form, forms__Has_Thank_You__c: checked }
				})
		}

		const updateRedirect = (e) => {

			let value = e.target.value; 

			setForm(form => {
					return { ...form, forms__Thank_You_Redirect__c: value }
			})
		}

    return [
				<View borderRight className="row middle-xs end-xs" key={'Header'}>
					<View className="col-xs-12">
							<ViewStyle border>
									<Button cta onClick={() => setUpdate(true)}>
											{ update ? 'Saving...' : 'Save Changes' }
									</Button>
							</ViewStyle>
					</View>
				</View>,
        <View borderRight body  key={'Body'}>


                <Box padding='0'>

                    <ViewStyle space border>
                    
                        <h1>Form Settings</h1>

                        <p>Update Form information and set limits on responses.</p>

                    </ViewStyle>


                    <ViewStyle space border>

                        <h1>Form Information</h1>

                        <ViewStyle>

                            <View className="row" >
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

																		<SalesforceInput
																			aria-describedby={form.Name}
																			defaultValue={form.Name}
																			id={form.Name}
																			onChange={(e) => updateName(e)}
																		/>

                                </Box>
                            </View>
                            </View>

                        </ViewStyle>

                    </ViewStyle>


                    <ViewStyle space border>

                        <h1>Form Response Limits</h1>

                        <View className="row">
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

																		<SalesforceInput
																			aria-describedby={form.Name}
																			min={0}
																			defaultValue={form.forms__Limit__c}
																			id={form.Name}
																			onChange={(e, data) => updateLimit(data.number)}
																			variant="counter"
																		/>

                                </Box>
                            </View>
                        </View>

                    </ViewStyle>


                    <ViewStyle space border>

                        <h1>Multi Page Form</h1>

                        <View className="row">
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

																	<Checkbox
																		id={form.Name + 'Flow'}
																		variant="toggle"
																		defaultChecked={form.forms__Multi_Page__c} 
																		onChange={(e, {checked}) => updateToMulti(e)}
																	/>

                                </Box>
                            </View>
                        </View>

                    </ViewStyle>

                    <ViewStyle space border>

                        <h1>For use Inside Lightning Flows</h1>
												<p>Forms for Lightning Flows will ignore the multi page setting.</p>

                        <View className="row">
                            <View className="col-xs-12">
                                <Box padding='1em 0 0 0'>

																	<Checkbox
																		id={form.Name + 'Flow'}
																		variant="toggle"
																		defaultChecked={form.forms__Is_Flow__c} 
																		onChange={(e, {checked}) => updateIsFlow(e)}
																	/>

                                </Box>
                            </View>
                        </View>

                    </ViewStyle>

										<ViewStyle space border>

											<h1>Use a Thank You Page</h1>

											<View className="row">
													<View className="col-xs-12">
															<Box padding='1em 0 0 0'>

																<Checkbox
																	id={form.Name + 'ThankYou'}
																	variant="toggle"
																	defaultChecked={form.forms__Has_Thank_You__c} 
																	onChange={(e, {checked}) => updateHasThankYou(e)}
																/>

															</Box>
													</View>
											</View>

										</ViewStyle>

										{
											form.forms__Has_Thank_You__c ? 
											<ViewStyle space border>

												<h1>Redirect URL</h1>

												<ViewStyle>

													<View className="row" >
														<View className="col-xs-12">
																<Box padding='1em 0 0 0'>

																		<SalesforceInput
																			aria-describedby={form.forms__Thank_You_Redirect__c}
																			defaultValue={form.forms__Thank_You_Redirect__c}
																			id={form.Name}
																			onChange={(e) => updateRedirect(e)}
																		/>

																</Box>
														</View>
													</View>

												</ViewStyle>

											</ViewStyle>
											: 
											null
										}


                </Box>

        </View>
    ]
}

const resultHandler = (result, e, setForm, setUpdate) => {
    
		setUpdate(false);
		
		let multiPageInfo = []; 
		if(result.forms__Multi_Page__c) {
			multiPageInfo = JSON.parse(result.forms__Multi_Page_Info__c);
			if(multiPageInfo.length == 0) {
				multiPageInfo = [{ page: 0, title: 'Page 1', icon: '' }];
			}
		}
    
    setForm(form => {
        return { 
					...form, 
					Name: result.Name, 
					forms__Limit__c: result.forms__Limit__c,
					forms__Multi_Page__c: result.forms__Multi_Page__c,
					forms__Multi_Page_Info__c: multiPageInfo
				}
		}); 
			
}