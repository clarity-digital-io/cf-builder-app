import React, { useContext } from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import { BuilderContext } from '../../Context';

const DesignNavigation = () => {

    const { navState, setNavState } = useContext(BuilderContext);

    return (
        <Nav>

            <ul>
                <li className={ navState == 'QUESTIONS' ? 'active' : '' } onClick={() => setNavState('QUESTIONS')}>
                    <div><span>Questions</span></div>
                </li>
                <li className={ navState == 'DESIGN' ? 'active' : '' } onClick={() => setNavState('DESIGN')}>
                    <div><span>Design</span></div>
                </li>
                <li className={ navState == 'ASSIGNMENTS' ? 'active' : '' } onClick={() => setNavState('ASSIGNMENTS')}>
                    <div><span>Assignments</span></div>
                </li>
                <li className={ navState == 'SETTINGS' ? 'active' : '' } onClick={() => setNavState('SETTINGS')}>
                    <div><span>Settings</span></div>
                </li>
                <li className={ navState == 'HELP' ? 'active' : '' } onClick={() => setNavState('HELP')}>
                    <div><span>Help</span></div>
                </li>
            </ul>

        </Nav>
    );

}

const Nav = styled.nav`
    border-right: 1px solid ${Main.color.light};
    background: ${Main.color.white};
    height: 94vh; 

    .active {
        font-weight: 900;
    }

    ul {
        list-style: none;
        height: 94vh;
        display: flex;
        flex-direction: column;
    }

    div {
        cursor: pointer;
        text-decoration: none !important;
        display: block;
        color: ${Main.color.body};
        padding: 1em;
        font-size: .95em;
        text-align: left;
    }

    div:hover {
        font-weight: 900;
    }

`;

export default DesignNavigation;