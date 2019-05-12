import React from 'react';
import styled from 'styled-components';

import Main from '../Theme'; 
import View from '../View';
import Box from '../Box';

const BuilderNavigation = () => {

    return (
        <Nav>
            <View className="row">
                <View className="col-xs-12 col-sm-12 col-md-11 col-lg-11">
                    <Box padding='0'>
                        <ul>
                            <li>
                                <a>Design</a>
                            </li>
                            <li>
                                <a>Collect</a>
                            </li>
                            <li>
                                <a>Responses</a>
                            </li>
                            <li>
                                <a id="preview">Preview</a>
                            </li>
                        </ul>
                    </Box>
                </View>

            </View>

        </Nav>
    );

}

const Nav = styled.nav`
    font-size: .95em;
    font-weight: 100;
    border-bottom: 1px solid ${Main.color.silver};
    background: ${Main.color.white};

    ul {
        list-style: none;
    }

    li {
        display: inline-block;
        border-right: 1px solid ${Main.color.silver};
    }

    #preview {
        font-weight: 900; 
        display: inline-block;
        border: none;
    }

    a {
        text-decoration: none !important;
        display: inline-block;
        color: ${Main.color.body};
        padding: 1em 4em 1em 4em;
    }


    #preview {
        font-weight: 900;
        color: ${Main.color.body};
    }

    a:hover {
        text-decoration: none !important; 
        color: ${Main.color.body};
        font-weight: 900;
    }
`;

export default BuilderNavigation;