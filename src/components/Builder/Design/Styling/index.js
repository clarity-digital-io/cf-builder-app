import React, { useContext, useEffect, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import Main from '../../../Elements/Theme';

import { BuilderContext } from '../../../Context';

import View from '../../../Elements/View';
import ViewStyle from '../../../Elements/View/style';
import Box from '../../../Elements/Box';
import {Button} from '../../../Elements/Button';

export const DesignState = () => {

    const { style, styles, setStyle, setNavState } = useContext(BuilderContext);

    const setAddStyle = () => {
        setNavState('DESIGNEDIT')
        setStyle({ Background_Color__c: '#FFFFFF', Color__c: '#333333', Button_Color__c: '#333333', Background_Image__c: '', Multi_Page__c: true })
    }

    const setEditStyle = (style) => {
        setNavState('DESIGNEDIT')
        setStyle(style); 
    }

    return [
        <View silver body className="row">
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
                                            styles.map(newStyle => {

                                                return (
                                                    <View className="col-xs-4">
                                                        <Style setEditStyle={setEditStyle} active={style.Id == newStyle.Id ? true : false} style={newStyle} setStyle={setStyle} />
                                                    </View>
                                                )

                                            })
                                        }    

                                    </View>
                                </ViewStyle>

                            </Box>  
                        </View>
                    </View>
                
                </View>
            </View>
        </View>, 
        <View footer className="row middle-xs end-xs" key={'Header'}>
            <View className="col-xs-12">
                <ViewStyle middle>
                    <Button neutral onClick={() => setAddStyle()}>
                        Add New Style
                    </Button>
                    <Button cta onClick={() => console.log(true)}>
                        Save Changes
                    </Button>
                </ViewStyle>
            </View>
        </View>
    ]

}

const Style = ({ setEditStyle, active, style, setStyle }) => {

    const theme = {
        background: style.Background_Color__c,
        questionColor: style.Color__c, 
        buttonColor: style.Button_Color__c, 
        backgroundImage: style.Background_Image__c 
    }

    return <ThemeProvider theme={theme}>
        <StyleView active={active}>
            <BackgroundView onClick={() => setStyle(style)}>
                <QuestionView>
                    Question
                </QuestionView>
                <ButtonColorView />
            </BackgroundView>
            <OptionView>
                <Button add small onClick={() => setEditStyle(style)}>Edit</Button>
            </OptionView>
        </StyleView>
    </ThemeProvider>
}

const StyleView = styled.div`
    box-shadow: 3px 0 6px #ccc;
    margin: 1em 1em 0 1em; 
    border-radius: 4px; 
    background: none;
    border: ${props => props.active == true ? `2px solid ${Main.color.body}` : ''};
`;

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

const OptionView = styled.div`
    padding: .5em 1em .5em 1em; 
    border-bottom-left-radius: 2px; 
    border-bottom-right-radius: 2px; 
    border-top: 1px solid ${Main.color.silver};  
    background: ${Main.color.white}
`;

const BackgroundView = styled.div`
    padding: .5em 2em 2em .5em; 
    border-top-left-radius: 2px; 
    border-top-right-radius: 2px; 
    background: ${props => props.theme.background} !important;
    background-image: url(${props => props.theme.backgroundImage}) !important;
    cursor: pointer; 
`;