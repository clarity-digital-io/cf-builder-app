import React, { useContext, useEffect, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import { BuilderContext } from '../../../Context';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';

export const DesignState = () => {

    const { styles, setStyle } = useContext(BuilderContext);

    return [
        <View silver full className="row">
            <View className="col-xs-12">
                <View className="Box">
                
                    <View border className="row middle-xs">
                        <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Box>

                                <ViewStyle space>

                                    <h1>Design</h1>
                                    <p>Select from a public theme, or create a theme with your branding.</p>
                                </ViewStyle>


                            </Box>  
                        </View>
                    </View>

                    <View className="row middle-xs">
                        <View className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Box>

                                <ViewStyle space>
                                <View className="row middle-xs">

                                {
                                    styles.map(style => {
                                        return <View className="col-xs-4">
                                            <Style style={style} setStyle={setStyle} />
                                        </View>
                                    })
                                }    
                                </View>
                                </ViewStyle>

                            </Box>  
                        </View>
                    </View>
                
                </View>
            </View>
        </View>
    ]

}

const Style = ({ style, setStyle }) => {

    const theme = {
        background: style.Background_Color__c,
        questionColor: style.Color__c, 
        buttonColor: style.Button_Color__c, 
        backgroundImage: style.Background_Image__c
    }

    return <ThemeProvider theme={theme}>
        <BackgroundView onClick={() => setStyle(style)}>
            <QuestionView>
                Question
            </QuestionView>
            <ButtonColorView />
        </BackgroundView>
    </ThemeProvider>
}

const QuestionView = styled.div`
    padding: 1em
    color: ${props => props.theme.questionColor} !important;
`

const ButtonColorView = styled.div`
    padding: .5em;
    width: 40%; 
    margin: 1em; 
    border-radius: 4px; 
    background: ${props => props.theme.buttonColor} !important;
`

const BackgroundView = styled.div`
    padding: .5em 2em 5em .5em; 
    margin: 1em; 
    border-radius: 4px; 
    background: ${props => props.theme.background} !important;
    background-image: url(${props => props.theme.backgroundImage}) !important;
    box-shadow: 3px 0 6px #ccc;
    cursor: pointer; 
`;