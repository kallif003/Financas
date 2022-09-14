import styled from "styled-components";

export const InputLogin = styled.input`
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  border: none;
  display: block;
  width: 18rem;
  height: 45px;
  background-color: transparent;
  padding: 0 5px;
  font-family: Nunito, sans-serif;
  outline: 0;
  :focus + span::after{
    top: -0.7rem
  }
`