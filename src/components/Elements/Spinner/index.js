import React from 'react';
import styled, { css } from 'styled-components';
import { Spin } from 'antd';

export const Spinner = () => {
    return (
			<SpinHolder>
					<Spin size="large" />
			</SpinHolder>
    )
}

export const SmallSpinner = () => {
    return (
			<SpinHolder>
					<Spin size="small" />
			</SpinHolder>
    )
}


const SpinHolder = styled.div`
	position: relative;
	left: 50%;
	top: 50%;
`


export const CenterSpinner = () => {
	return (
		<CenterHolder>
				<Spin size="large" />
		</CenterHolder>
	)
}

const CenterHolder = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
`
