import React, { useContext } from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import { BuilderContext } from '../../Context';

const DesignNavigation = () => {

    const { navState, setNavState, form } = useContext(BuilderContext);

    const preview = () => {
        LCC.sendMessage({name: "Preview", value: form.Id });
    }

    return (
        <Nav>

            <ul>
                <li id="logo">
                    Clarity Forms
                </li>
                <li id="preview" onClick={() => preview()}>
                    Preview
                </li>
                <li className={ navState == 'QUESTIONS' ? 'active' : '' } onClick={() => setNavState('QUESTIONS')}>
                    <span>Questions</span>
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
                <li className={ navState == 'HELP' ? 'active' : '' } onClick={() => setNavState('HELP')}>
                    <span>Help</span>
                </li>
            </ul>

        </Nav>
    );

}

const Nav = styled.nav`
    border-right: 1px solid ${Main.color.light};
    background: ${Main.color.body};
    height: 100vh; 

    .active {
        font-weight: 900;
        border-left: 3px solid ${Main.color.light}
    }

    ul {
        list-style: none;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    li {
        color: ${Main.color.light};
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

    li#preview {
        display: inline-block;
        color: ${Main.color.light};
    }

    li#logo {
        display: inline-block;
        font-size: 1em;
    }

`;

export default DesignNavigation;