import React from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import BuilderNavigation from '../Navigation/builder';

const BuilderLayout = ({children}) => {

    return [
        <BuilderNavigation key={'BuilderNav'} />,
        <App key={'BuilderApp'}>
            {children}
        </App>
    ];

}

const App = styled.div`
    min-height: 94vh;
    background: ${Main.color.light};

`;

export default BuilderLayout;