import React, { useState, useContext } from 'react';
import View from '../../../../Elements/View';
import Box from '../../../../Elements/Box';
import ViewStyle from '../../../../Elements/View/style';
import { DesignContext } from '../../../../Context';

export const Email = () => {

    const { activeQuestion, setActiveQuestion } = useContext(DesignContext);

    return (
        <ViewStyle>
            <h1>Email Settings</h1>

            <ViewStyle>


            </ViewStyle>

        </ViewStyle>
    )

}