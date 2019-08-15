import React from 'react';

import { Slider as AntSlider } from 'antd';

export const Slider = ({ min, max, defaultValue, onChange }) => {

    return <AntSlider defaultValue={defaultValue} min={min} max={max} onChange={(e) => onChange(e)}  />

}
