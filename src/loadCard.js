const state = JSON.parse(localStorage.getItem('cards')) || {};

export default async card => {
	if (!state[card]) {
		const response = await fetch(
			`https://api.scryfall.com/cards/named?exact=${card}`
		);

		let data = await response.json();

		if (!data.image_uris && data.card_faces) {
			data = data.card_faces[0];
		}

		state[card] = {
			name: data.name,
			type: data.type_line,
			img: data.image_uris.png
		};

		localStorage.setItem('cards', JSON.stringify(state));
	}

	return state;
};
