import React from 'react';
import styled from 'styled-components';

import Main from '../Elements/Theme';

export const App = ({ children }) => {

    return (

        <Layout>

        { children }

    </Layout>
    )

}

const Layout = styled.div`
    padding: 2em;
`;
