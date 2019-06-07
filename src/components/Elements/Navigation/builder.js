import React, { useContext } from 'react';
import styled from 'styled-components';
import LCC from 'lightning-container';

import Main from '../Theme'; 
import View from '../View';
import Box from '../Box';
import { BuilderContext } from '../../Context';

const BuilderNavigation = () => {

    const { form } = useContext(BuilderContext);

    const preview = () => {
        LCC.sendMessage({name: "Preview", value: form.Id });
    }

    return (
        <Nav>
            <View className="row">
                <View className="col-xs-12 col-sm-12 col-md-11 col-lg-11">
                    <Box padding='0'>
                        <ul>
                            <li>
                                Clarity Forms
                            </li>
                            <li id="preview" onClick={() => preview()}>
                                Preview
                            </li>
                            <li id="preview" onClick={() => preview()}>
                                PDF Preview
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
    border-bottom: 1px solid ${Main.color.grey};
    background: ${Main.color.body};

    ul {
        list-style: none;
    }

    ul > :first-child {
        font-weight: 100;
        font-size: 1em;
    }

    li {
        display: inline-block;
        border-right: 1px solid ${Main.color.grey};
        text-decoration: none !important;
        color: ${Main.color.light};
        padding: 1em 6em 1em 6em;
        cursor: pointer;
    }

    li#preview {
        display: inline-block;
        color: ${Main.color.light};
    }
`;

export default BuilderNavigation;