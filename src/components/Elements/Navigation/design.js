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
                <li onClick={() => select('QUESTIONS')}>
                    <div><span>Questions</span></div>
                </li>
                <li onClick={() => select('DESIGN')}>
                    <div><span>Design</span></div>
                </li>
                <li onClick={() => select('SETTINGS')}>
                    <div><span>Settings</span></div>
                </li>
            </ul>

        </Nav>
    );

}

const Nav = styled.nav`
    border-right: 1px solid ${Main.color.light};
    background: ${Main.color.white};
    height: 94vh; 

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