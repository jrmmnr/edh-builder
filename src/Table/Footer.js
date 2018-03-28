import React, { Component } from 'react';
import styled from 'styled-components';

const Th = styled.div`
	flex: 1;
	font-weight: 700;
	border-top: 1px solid;
	position: sticky;
	bottom: 0;
	background: #fff;

	> div {
		border-top: 1px solid;
		padding: 2px;
	}
`;

export default class Footer extends Component {
	render() {
		return (
			<Th>
				<div>Total : {this.props.data.length}</div>
				<div title="At least 1 in starting hand">
					1+ : {atLeastOne(this.props.data.length)} %
				</div>
				<div title="At least 2 in starting hand">
					2+ : {atLeastTwo(this.props.data.length)} %
				</div>
			</Th>
		);
	}
}

const atLeastOne = nb => Math.round(1000 * (1 - hyp(0, 7, nb, 99))) / 10;
const atLeastTwo = nb => Math.round(1000 * (1 - hyp(1, 7, nb, 99))) / 10;

function hyp(x, n, m, nn) {
	var nz, mz;
	// best to have n<m
	if (m < n) {
		nz = m;
		mz = n;
	} else {
		nz = n;
		mz = m;
	}
	var h = 1;
	var s = 1;
	var k = 0;
	var i = 0;
	while (i < x) {
		while (s > 1 && k < nz) {
			h = h * (1 - mz / (nn - k));
			s = s * (1 - mz / (nn - k));
			k = k + 1;
		}
		h = h * (nz - i) * (mz - i) / (i + 1) / (nn - nz - mz + i + 1);
		s = s + h;
		i = i + 1;
	}
	while (k < nz) {
		s = s * (1 - mz / (nn - k));
		k = k + 1;
	}
	return s;
}
