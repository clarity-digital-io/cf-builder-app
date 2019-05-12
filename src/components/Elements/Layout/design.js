import React from 'react';
import styled from 'styled-components';
import Main from '../Theme'; 
import Box from '../Box';
import View from '../View';

import DesignNavigation from '../Navigation/design';

const Design = styled.div`
    background: ${Main.color.white};
`;

const DesignLayout = ({ children }) => {

    return (
        <Design>
            <View className="row" full>
                <View className="col-xs-12 col-sm-1 col-md-1 col-lg-1">
                    <Box padding='0'>
                        
                        <DesignNavigation />

                    </Box> 
                </View>

                { children }

            </View>
        </Design>
    );

};

export default DesignLayout;
