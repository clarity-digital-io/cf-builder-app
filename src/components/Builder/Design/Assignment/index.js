import React, { useContext, useState } from 'react';

import { call } from '../../../RemoteActions'; 
import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';

import {Button} from '../../../Elements/Button';
import UserIcon from '../../../Elements/Icons/user';
import QueueIcon from '../../../Elements/Icons/queue';

import CloseIcon from '../../../Elements/Icons/close';
import SearchIcon from '../../../Elements/Icons/search';

import { BuilderContext } from '../../../Context';

export const AssignmentState = () => {

    const { form, setForm } = useContext(BuilderContext);

    const updateFormDesign = () => {

    }

    return [
        
        <View className="row end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle top border>
                    <Button cta onClick={() => updateFormDesign(true)}>
                    Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>,
        <View className="row" key={'Body'}>
            <View className="col-xs-12">
                <Box padding='0'>

                    <ViewStyle space border>
                    
                    <h1>Form Response Assignment Rule</h1>

                    <p>A simple version of the Case Assignment Rules but for Clarity Form Responses.</p>

                    </ViewStyle>

                    <ViewStyle space top border>

                    <h2>Step 1: <span>Select the criteria for this rule</span></h2>

                    <View className="row">
                        <View className="col-xs-1">
                            <Box padding='.5em'>
                                
                            </Box>
                        </View>
                        <View className="col-xs-4">
                            <Box padding='.5em'>
                                Question
                            </Box>
                        </View>
                        <View className="col-xs-3">
                            <Box padding='.5em'>
                                Operator
                            </Box>
                        </View>
                        <View className="col-xs-4">
                            <Box padding='.5em'>
                                Value
                            </Box>
                        </View>
                    </View>


                    </ViewStyle>

                    <ViewStyle space top border>

                    <h2>Step 2: <span>Select the user or queue to assign the form response to</span></h2>

                    <Lookup />
                    </ViewStyle>

                </Box>
            </View>
        </View>

    ]
}

const Lookup = () => {

    const [selectedUser, setSelectedUser] = useState(null)

    const [users, setUsers] = useState([]);

    const [triggered, setTriggered] = useState(false);

    const [searchKey, setSearchKey] = useState(''); 

    const searchKeyChange = () => {

        let searchKey = event.target.value;
        setSearchKey(searchKey);
        setTriggered(true);
        call("ClarityFormBuilder.getUsers", [searchKey], (result, e) => searchFetchHandler(result, e))

    }

    const searchFetchHandler = (result) => {

        setUsers(result);

    }

    const remove = () => {
        setSelectedUser(null);
        setSearchKey('');
    }

    const hasSelectionClass = selectedUser == null ? '' : 'slds-has-selection';

    const hasLeftRightIcon = selectedUser == null ? 'slds-input-has-icon_right' : 'slds-input-has-icon_left-right';

    return (

        <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="combobox-id-1">Assign to</label>
            <div className="slds-form-element__control">
            <div className={`slds-combobox_container ${hasSelectionClass}`}>
                <div className="slds-combobox slds-dropdown-trigger" aria-expanded="false" aria-haspopup="listbox" role="combobox" onBlur={() => setTriggered(false)}>             

                    <div className={`slds-combobox__form-element slds-input-has-icon ${hasLeftRightIcon}`} role="none">
                        
                        {
                            selectedUser == null ? 
                            null :
                            <span className="slds-icon_container slds-icon-standard-account slds-combobox__input-entity-icon" title="User">
                                <svg className="slds-icon slds-icon_small" aria-hidden="true">
                                    <UserIcon />
                                </svg>
                                <span className="slds-assistive-text">User</span>
                            </span>
                        }

                        <input type="text" value={selectedUser == null ? searchKey : selectedUser.Name } onChange={(e) => searchKeyChange(e.target.value)} className="slds-input slds-combobox__input slds-combobox__input-value" id="combobox-id-1" aria-autocomplete="list" aria-controls="listbox-id-1" autoComplete="off" role="textbox" placeholder="Search..." />

                        {
                            selectedUser == null ? 
                            <span className={`slds-icon_container slds-icon-utility-search slds-input__icon`}>
                                <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                    <SearchIcon />
                                </svg>
                            </span> :
                            <button className="slds-button slds-button_icon slds-input__icon slds-input__icon_right" title="Remove selected option" onClick={() => remove()}>
                                <svg className="slds-button__icon" aria-hidden="true">
                                    <CloseIcon />
                                </svg>
                                <span className="slds-assistive-text">Remove selected option</span>
                            </button>
                        }

                    </div>

                    {
                        triggered && selectedUser == null ? 
                        <div id="listbox-id-1" className="slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid" role="listbox">
                            <ul className="slds-listbox slds-listbox_vertical" role="presentation">
                            
                                {
                                    users.map((user, order) => {

                                        return <LookupItem user={user} order={order} key={order} setSelectedUser={setSelectedUser} />

                                    })
                                }

                            </ul>
                        </div> :
                        null
                    }

                </div>
                </div>
            </div>
        </div>
    )
}

const LookupItem = ({ user, order, setSelectedUser }) => {

    return (
        <li role="presentation" className="slds-listbox__item" key={user.Id} onMouseDown={(e) => setSelectedUser(user)} >
            <div onSelect={(e) => test(e, user)} id={`option${order}`} className="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                <span className="slds-media__figure slds-listbox__option-icon">
                    { 
                        user.Username ?
                            <span className="slds-icon_container slds-icon-standard-user">
                                <svg className="slds-icon slds-icon_small" aria-hidden="true">
                                    <UserIcon />
                                </svg>
                            </span> :
                            <span className="slds-icon_container slds-icon-standard-queue">
                                <svg className="slds-icon slds-icon_small" aria-hidden="true">
                                    <QueueIcon />
                                </svg>
                            </span> 
                    }
                </span>
                <span className="slds-media__body">
                    <span className="slds-listbox__option-text slds-listbox__option-text_entity">{ user.Name }</span>
                    <span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{ user.Username != null ? 'User' : 'Queue' }</span> 
                </span>
            </div>
        </li>
    )
}