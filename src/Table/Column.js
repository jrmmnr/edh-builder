import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Card from './Card';

const Col = styled.div`
	min-width: 150px;
	border-left: 1px solid;
	border-right: 1px solid;
	display: grid;
	grid-template-rows: auto 1fr auto;
`;

const Body = styled.div`
	overflow: hidden;
`;

const Btn = styled.button`
	border: none;
	background: #0000;
	cursor: pointer;

	&:hover {
		background: red;
	}
`;

export default class Column extends Component {
	render() {
		const { data, cards, col, onRemoveGroup } = this.props;

		return (
			<Col>
				<Header>
					<span>{col}</span>
					<Btn onClick={() => onRemoveGroup(col)}>&times;</Btn>
				</Header>
				<Body onDragOver={e => e.preventDefault()} onDrop={this.onDrop}>
					{[...data]
						.sort()
						.map((card, index) => (
							<Card
								key={index}
								{...this.props}
								type={cards[card] && cards[card].type}
								card={card}
							/>
						))}
				</Body>
				<Footer {...this.props} />
			</Col>
		);
	}

	onDrop = e => {
		var card = e.dataTransfer.getData('card');
		var col = e.dataTransfer.getData('col');

		if (col !== this.props.col) {
			this.props.onMoveCard(card, this.props.col);
		}
	};
}
