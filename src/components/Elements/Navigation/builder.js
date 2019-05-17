import React from 'react';
import styled from 'styled-components';
import LCC from 'lightning-container';

import Main from '../Theme'; 
import View from '../View';
import Box from '../Box';

const BuilderNavigation = () => {

    const preview = () => {
        LCC.sendMessage({name: "Preview", value: 'formId'});
    }

    return (
        <Nav>
            <View className="row">
                <View className="col-xs-12 col-sm-12 col-md-11 col-lg-11">
                    <Box padding='0'>
                        <ul>
                            <li>
                                Design
                            </li>
                            <li id="preview" onClick={() => preview()}>
                                Preview
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
    border-bottom: 1px solid ${Main.color.greyBorder};
    background: ${Main.color.white};

    ul {
        list-style: none;
    }

    li {
        display: inline-block;
        border-right: 1px solid ${Main.color.greyBorder};
        text-decoration: none !important;
        color: ${Main.color.body};
        padding: 1em 6em 1em 6em;
        cursor: pointer;
    }

    li:hover {
        text-decoration: none !important; 
        background: ${Main.color.light};
        font-weight: 900;
    }

    li#preview {
        display: inline-block;
        color: ${Main.color.body};
    }
`;

export default BuilderNavigation;