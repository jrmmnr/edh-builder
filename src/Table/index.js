import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import loadCard from '../loadCard';

import Column from './Column';

const Body = styled.div`
	overflow: hidden;
	overflow-y: auto;
	display: grid;
	grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
`;

export default class Table extends Component {
	state = {};

	componentWillMount() {
		this.load(this.props);
	}

	componentWillReceiveProps(newProps) {
		this.load(newProps);
	}

	render() {
		return (
			<Fragment>
				<Body cols={Object.keys(this.props.data).length}>
					{Object.keys(this.props.data).map(col => (
						<Column
							key={col}
							onRemoveGroup={this.props.onRemoveGroup}
							onRemoveCard={this.props.onRemoveCard}
							onMoveCard={this.props.onMoveCard}
							col={col}
							cards={this.state}
							data={this.props.data[col]}
						/>
					))}
				</Body>
			</Fragment>
		);
	}

	load = async ({ data }) => {
		let state = {};
		for (let group in data) {
			for (let i in data[group]) {
				state = await loadCard(data[group][i]);
			}
		}
		this.setState(state);
	};
}
