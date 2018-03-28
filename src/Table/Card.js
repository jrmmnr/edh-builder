import React, { Component } from 'react';
import styled from 'styled-components';

import Cell from './Cell';

const Btn = styled.button`
	border: none;
	background: #0000;
	cursor: pointer;

	&:hover {
		background: red;
	}
`;

const Img = styled.img`
	position: fixed;
	max-width: 200px;
	top: 150px;
`;

export default class Card extends Component {
	state = {
		hover: false
	};

	render() {
		const { cards, card, col, onRemoveCard, type } = this.props;

		return (
			<Cell
				type={type}
				name={card}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				onDragStart={this.onDragStart}
				draggable={true}
			>
				<div>
					<Btn onClick={() => onRemoveCard(col, card)}>&times;</Btn>
					{card}
				</div>
				{this.state.hover &&
					cards[card] && (
						<Img src={cards[card].img} alt={cards[card].name} />
					)}
			</Cell>
		);
	}

	onMouseEnter = () => {
		this.setState({
			hover: true
		});
	};

	onMouseLeave = () => {
		this.setState({
			hover: false
		});
	};

	onDragStart = e => {
		e.dataTransfer.setData('card', this.props.card);
		e.dataTransfer.setData('col', this.props.col);
	};
}
