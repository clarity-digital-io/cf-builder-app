import React, { useState, useEffect, createContext } from 'react';
import { BuilderContext } from '../Context';
import styled from 'styled-components';
import Main from '../Elements/Theme';

const App = ({ children }) => {

    return (
        <Layout>
            <BuilderProvider>
                { children }
            </BuilderProvider>
        </Layout>
    )

}


const BuilderProvider = ({ children }) => {

    return (
        <BuilderContext.Provider>
            { children }
        </BuilderContext.Provider>
    )
}


const Layout = styled.div`
    background: ${Main.color.white};
    border: 1px solid ${Main.color.light};
    margin: 0em; 
    border-radius: 2px;
`;

export default App; 