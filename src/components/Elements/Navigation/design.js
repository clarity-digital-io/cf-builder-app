import React from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 

const DesignNavigation = () => {

    return (
        <Nav>

            <ul>
                <li>
                    <a>
                        <div><span>Questions</span></div>
                    </a>
                </li>
                <li>
                    <a>
                        <div><span>Design</span></div>
                    </a>
                </li>
                <li>
                    <a>
                        <div><span>Activity</span></div>
                    </a>
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
    }

    a {
        cursor: pointer;
        text-decoration: none !important;
        display: block;
        color: ${Main.color.body};
        padding: .5em;
        font-size: .95em;
        border-bottom: 1px solid ${Main.color.light};
        text-align: left;
    }

    div {
        padding: .5em; 
    }

    span {
        vertical-align: middle;
        margin-left: .5em;
    }

`;

export default DesignNavigation;