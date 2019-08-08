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


// <li className={ navState == 'LIGHTNING' ? 'active' : '' } onClick={() => setNavState('LIGHTNING')}>
// <span>Lightning</span>
// </li>
// <li className={ navState == 'SALESFORCECOMMUNITY' ? 'active' : '' } onClick={() => setNavState('SALESFORCECOMMUNITY')}>
// <span>Salesforce Community</span>
// </li>
// <li className={ navState == 'SALESFORCECHAT' ? 'active' : '' } onClick={() => setNavState('SALESFORCECHAT')}>
// <span>Salesforce Chat</span>
// </li>
// <li className={ navState == 'SALESFORCEPARDOT' ? 'active' : '' } onClick={() => setNavState('SALESFORCEPARDOT')}>
// <span>Salesforce Pardot</span>
// </li>
// <li className={ navState == 'EMAIL' ? 'active' : '' } onClick={() => setNavState('EMAIL')}>
// <span>Email</span>
// </li>
// <li className={ navState == 'MOBILE' ? 'active' : '' } onClick={() => setNavState('MOBILE')}>
// <span>iOS and Android</span>
// </li>
// </ul>