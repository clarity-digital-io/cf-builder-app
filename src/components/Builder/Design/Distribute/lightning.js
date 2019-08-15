import React, { useContext, useEffect, useState } from 'react';

import ViewStyle from '../../../Elements/View/style';

import { BuilderContext } from '../../../Context';

export const LightningState = () => {

    const { form, setForm } = useContext(BuilderContext);

    return (

        <ViewStyle space>
                    
            <h1>Lightning Component</h1>

        </ViewStyle>

    )
}