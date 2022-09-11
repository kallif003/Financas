import styled from "styled-components";

export const Container = styled.div`
width: 100vw;
height: 100vh;
background: #019267;
display: flex;
justify-content: center;
align-items: center;
`

export const ContainerLogin = styled.div`
background: #00C897;
width: 20rem;
height: 30rem;
border-radius: 2rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.8);
`
export const WrapInput = styled.div`
  width: 80%;
  position: relative;
  border-bottom: 1px solid #FFD365;
  margin-bottom: 37px;

`
export const Span = styled.span`
  ::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
}
::after {
  font-family: Nunito, sans-serif;
  font-size: 15px;
  color: #ddd;
  line-height: 1.2;
  content: attr(data-placeholder);
  position: absolute;
  top: 16px;
  left: 0px;
  padding-left: 5px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
`
export const ContainerTitle = styled.div`
height: 3rem;
display: flex;
`
export const ContainerButtons = styled.div`
display: flex;
flex-direction: column;
`