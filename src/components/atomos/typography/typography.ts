import styled from "styled-components";

export const TitleLogin = styled.h1`
font-weight: bold;
font-size: 1.8rem;
color: #fff;
`
export const SubtitleLogin = styled.h3`
font-size: 0.7rem;
color: #ddd;
margin-bottom: 1.5rem
`
export const Message = styled.h3`
font-size: 0.7rem;
color: red;
margin-bottom: 1.5rem;
font-weight: bold;
`
export const Text = styled.p.attrs(
    (props: { color: string, size: number }) => props
)`
color: ${(props) => props.color};
font-size: ${(props) => props.size}rem;
font-weight: bold;

`
