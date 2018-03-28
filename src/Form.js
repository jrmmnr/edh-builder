import React, { Component } from 'react';
import styled from 'styled-components';

import loadCard from './loadCard';

const Ctn = styled.div`
	display: flex;
	> div,
	> form {
		flex: 1;
	}

	label {
		display: flex;
		padding: 5px;

		span {
			flex: 1;
		}
	}

	form > div {
		position: absolute;
		background: red;
		z-index: 5;
	}
`;

const Dialog = styled.div`
	background: #0007;
	position: fixed;
	text-align: center;

	top: 0;
	bottom: 0;
	width: 100%;
	z-index: 10;

	padding-top: 5%;
	div {
		background: #fff;
		margin: 0 auto;
		width: 80%;
	}

	button {
		padding: 10px;
	}
`;

const Textarea = styled.textarea`
	display: block;
	margin: 0 auto 10px;
	width: 80%;
	height: 80%;
`;

export default class Form extends Component {
	state = {
		card: '',
		group: '',
		error: '',
		imp: ''
	};

	render() {
		let total = 0;

		Object.keys(this.props.data).forEach(
			group => (total += this.props.data[group].length)
		);

		return (
			<Ctn onChange={this.onChange}>
				<form onSubmit={this.onAddCard}>
					<label>
						<span>Add a card (exact name)</span>
						<input name="card" value={this.state.card} />
					</label>
					<label>
						<span>In group</span>
						<select name="dgroup" value={this.state.dgroup}>
							<option>---</option>
							{Object.keys(this.props.data).map(group => (
								<option key={group} value={group}>
									{group}
								</option>
							))}
						</select>
					</label>
					{this.state.error && <div>{this.state.error}</div>}
				</form>
				<form onSubmit={this.onAddGroup}>
					<label>
						<span>Add a group</span>
						<input name="group" value={this.state.group} />
					</label>
				</form>

				<button onClick={this.props.onSave}>
					Save ({total} cards)
				</button>

				<button onClick={this.props.onExport}>Export</button>
				<button
					onClick={() =>
						this.setState({
							importVisible: !this.state.importVisible
						})
					}
				>
					Import
				</button>

				{this.state.importVisible && (
					<Dialog>
						<div>Paste your deck list.</div>
						<div>
							(supported formats : TappedOut, Deckstat, MTGO,
							.dec)
						</div>
						<Textarea
							name="imp"
							value={this.state.imp}
							autoFocus={true}
						/>

						<button onClick={this.onImport}>Import</button>
					</Dialog>
				)}
			</Ctn>
		);
	}

	onChange = async e => {
		const { target } = e;
		await this.setState({
			[target.name]: target.value,
			error: ''
		});

		if (target.name === 'dgroup' && this.state.card !== '') {
			this.onAddCard(e);
		}
	};

	onAddCard = async e => {
		e.preventDefault();

		if (this.state.dgroup) {
			try {
				await loadCard(this.state.card);
				this.props.onAddCard(this.state.card, this.state.dgroup);
			} catch (e) {
				this.setState({
					error: 'Card not found.'
				});
			}
		}
	};

	onAddGroup = e => {
		e.preventDefault();
		this.props.onAddGroup(this.state.group);
	};

	onImport = () => {
		this.setState({
			importVisible: false
		});
		this.props.onImport(this.state.imp);
	};
}
