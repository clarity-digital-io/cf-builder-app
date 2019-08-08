import React, { useContext } from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import { BuilderContext } from '../../Context';

const DesignNavigation = () => {

    const { navState, setNavState } = useContext(BuilderContext);

    const getDistributionStates = (nav) => {

        return nav == 'DISTRIBUTE' || nav == 'EMAIL' || nav == 'SALESFORCECOMMUNITY' || nav == 'LIGHTNING' || nav == 'MOBILE' || nav == 'SALESFORCECHAT' || nav == 'SALESFORCEPARDOT';
    
    }

    return (
        <Nav>

            <ul>
                <li className={ navState == 'QUESTIONS' ? 'active' : '' } onClick={() => setNavState('QUESTIONS')}>
                    <span>Questions</span>
                </li>
                <li className={ (navState == 'CONNECT' || navState == 'MAPPING') ? 'active' : '' } onClick={() => setNavState('CONNECT')}>
                    <span>Connect</span>
                </li>
                <li className={ navState == 'DESIGN' ? 'active' : '' } onClick={() => setNavState('DESIGN')}>
                    <span>Design</span>
                </li>
                <li className={ navState == 'ASSIGNMENTS' ? 'active' : '' } onClick={() => setNavState('ASSIGNMENTS')}>
                    <span>Assignments</span>
                </li>
                <li className={ navState == 'SETTINGS' ? 'active' : '' } onClick={() => setNavState('SETTINGS')}>
                    <span>Settings</span>
                </li>
                <li className={ getDistributionStates(navState) ? 'active' : '' } onClick={() => setNavState('DISTRIBUTE')}>
                    <span>Distribute</span>
                </li>
            </ul>

        </Nav>
    );

}

const Nav = styled.nav`
    background: ${Main.color.white};
    height: 100vh; 

    .active {
        font-weight: 900;
        border-left: 3px solid ${Main.color.body}
    }

    ul {
        list-style: none;
        height: 96.5vh;
        display: flex;
        flex-direction: column;
    }

    li {
        color: ${Main.color.body};
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