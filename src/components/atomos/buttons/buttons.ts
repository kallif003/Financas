import styled from "styled-components";

export const Button = styled.button.attrs(
	(props: {
		width: number,
		height: number,
		background: string,
		justify: string,
		align: string
		display: boolean
	}) => props
)`
display: flex;
background: ${(props) => props.background};
width: ${(props) => props.width}rem;
height: ${(props) => props.height}rem;
border-color: #ddd;
border-width: 1px;
border-radius:  0.5rem;
color: #fff;
font-weight: bold;
margin-bottom: 0.5rem;
justify-content: ${(props) => props.justify || "center"};
align-items: ${(props) => props.align || "center"};
display: ${({ display }) => display ? "block" : "none"};

:active {
		transform: scale(0.9);
	}
`
export const SecondaryButton = styled.button.attrs(
	(props: { color: string, size: number, margin: number }) => props
)`
font-size: ${(props) => props.size}rem;
margin-top: ${(props) => props.margin}rem;
color: ${(props) => props.color};
:active {
		transform: scale(0.9);
	}
`

export const ButtonRelease = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 3rem;
height: 3rem;
border-radius: 50rem;
background: #019267;
color: #fff;
font-size: 2rem;

:active {
		transform: scale(0.9);
	}
`