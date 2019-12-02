import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import { BuilderContext } from '../../Context';
import { Modal, Button } from 'antd';

const DesignNavigation = () => {

    const { navState, setNavState, dirtyState, setDirtyState, setNewQuestionNav } = useContext(BuilderContext);

    const [locSelected, setLocSelected] = useState(null); 

    const navigate = (loc) => {

        if(dirtyState.edited) {

            setDirtyState(dirty => {
                return { ...dirty, navigated: true  }
            });

            setLocSelected(loc);

            return;
        }

        setNavState(loc);

    }

    const handleSave = () => {

        dirtyState.save();
        
        setDirtyState(dirty => {
            return { navigated: false, edited: false, save: null }
        });

        setNavState(locSelected);

    }

    const handleCancel = () => {
        
        setDirtyState(dirty => {
            return { ...dirty, navigated: false }
        });

    }

    return [
        <Nav>

            <ul>
                <li className={ navState == 'QUESTIONS' ? 'active' : '' } onClick={() => navigate('QUESTIONS')}>
                    <span>Questions</span>
                </li>
                <li className={ (navState == 'CONNECT' || navState == 'MAPPING') ? 'active' : '' } onClick={() => navigate('CONNECT')}>
                    <span>Connect</span>
                </li>
                {/* <li className={ getDesignStates(navState) ? 'active' : '' } onClick={() => navigate('DESIGN')}>
                    <span>Design</span>
                </li> */}
                {/* <li className={ navState == 'ASSIGNMENTS' ? 'active' : '' } onClick={() => navigate('ASSIGNMENTS')}>
                    <span>Assignments</span>
                </li> */}
                <li className={ navState == 'SETTINGS' ? 'active' : '' } onClick={() => navigate('SETTINGS')}>
                    <span>Settings</span>
                </li>
                {/* <li className={ getDistributionStates(navState) ? 'active' : '' } onClick={() => navigate('DISTRIBUTE')}>
                    <span>Distribute</span>
                </li> */}
            </ul>

        </Nav>,
        <Modal
            visible={dirtyState.navigated}
            onOk={() => handleOk()}
            onCancel={() => handleCancel()}
            footer={[
                <Button key="back" onClick={() => handleCancel()}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => handleSave()}>
                  Save
                </Button>,
            ]}
        >
            <BuildDirtyStateMessage navState={navState} />
        </Modal>
    ];

}


const getDistributionStates = (nav) => {

    return nav == 'DISTRIBUTE' || nav == 'EMAIL' || nav == 'SALESFORCECOMMUNITY' || nav == 'LIGHTNING' || nav == 'MOBILE' || nav == 'SALESFORCECHAT' || nav == 'SALESFORCEPARDOT';

}

const getDesignStates = (nav) => {
    return nav == 'DESIGN' || nav == 'DESIGNEDIT';
}

const BuildDirtyStateMessage = ({ navState }) => {

    const buildMessage = (nav) => {

        switch (nav) {
            case 'DESIGNEDIT':
                return designEditMessage(); 
                break;
            default:
                return '';
                break;
        }
    }

    return buildMessage(navState);

}

const designEditMessage = () => {

    return <div>
        <h1>
            Do you want to save the changes to the theme you just made?
        </h1>
        <p>
            Click Cancel to continue editing your design
        </p>
    </div>
}

const Nav = styled.nav`
    background: ${Main.color.body};
    height: 100vh; 

    .active {
        font-weight: 900;
        border-left: 3px solid ${Main.color.bright}
    }

    ul {
        list-style: none;
        height: 96.5vh;
        display: flex;
        flex-direction: column;
    }

    li {
        color: ${Main.color.white};
        cursor: pointer;
        text-decoration: none !important;
        display: inline-block;
        padding: 1em;
        font-size: 1em;
        text-align: left;
    }
    
    li:hover {
        font-weight: 900;
    }

`;

export default DesignNavigation;