import React, { useContext } from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import { BuilderContext } from '../../Context';

const DesignNavigation = () => {

    const { form, setForm } = useContext(BuilderContext);

    const select = (nav) => {

        setForm(form => {
            return { ...form, NavState: nav }
        });

    }

    return (
        <Nav>

            <ul>
                <li className={ form.NavState == 'QUESTIONS' ? 'active' : '' } onClick={() => select('QUESTIONS')}>
                    <div><span>Questions</span></div>
                </li>
                <li className={ form.NavState == 'DESIGN' ? 'active' : '' } onClick={() => select('DESIGN')}>
                    <div><span>Design</span></div>
                </li>
                <li className={ form.NavState == 'ASSIGNMENTS' ? 'active' : '' } onClick={() => select('ASSIGNMENTS')}>
                    <div><span>Assignments</span></div>
                </li>
                <li className={ form.NavState == 'SETTINGS' ? 'active' : '' } onClick={() => select('SETTINGS')}>
                    <div><span>Settings</span></div>
                </li>
                <li className={ form.NavState == 'HELP' ? 'active' : '' } onClick={() => select('HELP')}>
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