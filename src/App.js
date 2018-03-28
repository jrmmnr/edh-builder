import React, { Component, Fragment } from 'react';

import Table from './Table';
import Form from './Form';

class App extends Component {
	state = {
		deck: JSON.parse(localStorage.getItem('deck')) || {}
	};

	render() {
		return (
			<Fragment>
				<Form
					onAddCard={this.onAddCard}
					onAddGroup={this.onAddGroup}
					onExport={this.onExport}
					onImport={this.onImport}
					onSave={this.onSave}
					data={this.state.deck}
				/>
				<Table
					data={this.state.deck}
					onRemoveGroup={this.onRemoveGroup}
					onRemoveCard={this.onRemoveCard}
					onMoveCard={this.onMoveCard}
				/>
			</Fragment>
		);
	}

	onAddCard = (card, group) => {
		this.setState({
			deck: {
				...this.state.deck,
				[group]: this.state.deck[group].concat(card)
			}
		});
	};

	onAddGroup = group => {
		this.setState({
			deck: {
				...this.state.deck,
				[group]: []
			}
		});
	};

	onRemoveCard = (group, card) => {
		const deck = this.state.deck;
		let done = false;
		deck[group] = deck[group].filter(name => {
			if (!done && card === name) {
				done = true;
				return false;
			}

			return true;
		});

		this.setState({
			deck: {
				...deck
			}
		});
	};

	onMoveCard = async (card, target) => {
		for (let grp in this.state.deck) {
			if (grp !== target) {
				await this.onRemoveCard(grp, card);
			}
		}

		this.onAddCard(card, target);
	};

	onRemoveGroup = group => {
		const deck = this.state.deck;
		delete deck[group];

		this.setState({
			deck: {
				...deck
			}
		});
	};

	onSave = () => {
		localStorage.setItem('deck', JSON.stringify(this.state.deck));
	};

	onExport = () => {
		const { deck } = this.state;
		let exp = Object.keys(deck).map(group => {
			return `// ${group}
1 ${deck[group].join('\r\n1 ')}`;
		});
		console.log(exp.join('\r\n\r\n'));

		const win = window.open('_blank');
		win.document.write('<pre>' + exp.join('\r\n\r\n'));
	};

	onImport = str => {
		const deck = {};
		let lastGroup = 'Default Group';
		str.split('\n').forEach(row => {
			if (row !== '') {
				if (/^\/\/NAME:.*/.test(row)) {
					return;
				}

				if (/^\/\/.*/.test(row)) {
					lastGroup = row.replace('//', '').trim();
					deck[lastGroup] = [];
				} else if (/^[A-Z][a-z]+.*/.test(row)) {
					lastGroup = row.trim();
					deck[lastGroup] = [];
				} else if (/^\d+.*/.test(row)) {
					const match = row.match(/^(\d+)x?([^#*]*).*/);

					if (!deck[lastGroup]) {
						deck[lastGroup] = [];
					}

					for (let i = 0; i < match[1]; i++) {
						deck[lastGroup].push(match[2].trim());
					}
				}
			}
		});

		this.setState({
			deck: deck
		});
	};
}

export default App;
