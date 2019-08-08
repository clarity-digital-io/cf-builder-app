import React, { useContext } from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import { BuilderContext } from '../../Context';

const DistributionNavigation = () => {

    const { navState, setNavState } = useContext(BuilderContext);

    return (
        <Nav>

            <ul>
                <li className={ navState == 'LIGHTNING' ? 'active' : '' } onClick={() => setNavState('LIGHTNING')}>
                    <span>Lightning</span>
                </li>
                <li className={ navState == 'SALESFORCECOMMUNITY' ? 'active' : '' } onClick={() => setNavState('SALESFORCECOMMUNITY')}>
                    <span>Salesforce Community</span>
                </li>
                <li className={ navState == 'SALESFORCECHAT' ? 'active' : '' } onClick={() => setNavState('SALESFORCECHAT')}>
                    <span>Salesforce Chat</span>
                </li>
                <li className={ navState == 'SALESFORCEPARDOT' ? 'active' : '' } onClick={() => setNavState('SALESFORCEPARDOT')}>
                    <span>Salesforce Pardot</span>
                </li>
                <li className={ navState == 'EMAIL' ? 'active' : '' } onClick={() => setNavState('EMAIL')}>
                    <span>Email</span>
                </li>
                <li className={ navState == 'MOBILE' ? 'active' : '' } onClick={() => setNavState('MOBILE')}>
                    <span>iOS and Android</span>
                </li>
            </ul>

        </Nav>
    );

}

const Nav = styled.nav`
    height: 50vh;

    .active {
        font-weight: 900;
        border-left: 3px solid ${Main.color.body}
    }

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
    }

    li {
        background: ${Main.color.light};
        color: ${Main.color.body};
        border-bottom: 1px solid ${Main.color.greyBorder};
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

export default DistributionNavigation;