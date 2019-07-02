import React from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 

const BuilderLayout = ({children}) => {

    return [
        <App key={'BuilderApp'}>
            {children}
        </App>
    ];

}

const App = styled.div`
    min-height: 100vh;
    background: ${Main.color.light};

`;

export default BuilderLayout;