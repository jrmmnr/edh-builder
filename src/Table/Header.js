import styled from 'styled-components';

export default styled.div`
	display: flex;
	overflow: hidden;

	padding: 2px;
	border-bottom: 1px solid;
	text-transform: capitalize;

	font-weight: 700;
	padding: 10px 2px;
	position: sticky;
	top: 0;
	z-index: 1;
	background: #fff;
	border-bottom: 2px solid;
	border-top: 1px solid;

	span {
		flex: 1;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
