import styled from 'styled-components';

export default styled.div`
	flex: 1;
	padding: 2px;
	border-bottom: 1px solid;
	text-transform: capitalize;
	overflow: hidden;

	div {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	img {
		display: none;
		pointer-events: none;
		margin: 0 auto;
		width: 100%;
	}

	&:hover img {
		display: block;
	}
	&:hover div {
		white-space: normal;
	}
	button {
		margin-right: 2px;
	}

	background: ${props => getBg(props.type)};
`;

function getBg(type) {
	if (/.*Sorcery.*/.test(type)) {
		return '#4a86e8';
	}
	if (/.*Instant.*/.test(type)) {
		return '#00ffff';
	}
	if (/.*Creature.*/.test(type)) {
		return '#ffff00';
	}
	if (/.*Enchantment.*/.test(type)) {
		return '#ff9900';
	}
	if (/.*Artifact.*/.test(type)) {
		return '#cc4125';
	}
	if (/.*Planeswalker.*/.test(type)) {
		return '#9900ff';
	}
	if (/.*Land.*/.test(type)) {
		return '#00ff00';
	}
}
