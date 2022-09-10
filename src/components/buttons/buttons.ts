import styled from "styled-components";

export const ButtonLogin = styled.button`
background: #FFD365;
width: 10rem;
height: 2rem;
border-color: #ddd;
border-width: 1px;
border-radius:  0.5rem;
color: #fff;
font-weight: bold;
margin-bottom: 0.5rem;
`
export const SecondaryButton = styled.button.attrs(
	(props: { color: string, size: number }) => props
)`
font-size: ${(props) => props.size}rem;
margin-top: 0.5rem;
color: ${(props) => props.color}
`