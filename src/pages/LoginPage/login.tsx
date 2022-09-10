import React from "react"
import { ButtonLogin } from '../../components/buttons'
import { Container, ContainerLogin, Span, WrapInput, ContainerTitle } from './styles'
import { InputLogin } from '../../components/inputs'
import { TitleLogin, SubtitleLogin } from '../../components/typography'
import { mdiCashCheck } from '@mdi/js';
import Icon from '@mdi/react'
const Login = () => {
    return (
        <Container>
            <ContainerLogin>
                <ContainerTitle>
                    <TitleLogin>No Bolso</TitleLogin>
                    
                    <Icon path={mdiCashCheck}
                        title="User Profile"
                        size={2}
                        color="#fff"
                    />
                
                </ContainerTitle>
                <SubtitleLogin>Seu dinheiro bem organizado</SubtitleLogin>
                <WrapInput>
                    <InputLogin />
                    <Span data-placeholder="Email"></Span>
                </WrapInput>
                <WrapInput>
                    <InputLogin />
                    <Span data-placeholder="Password"></Span>
                </WrapInput>
                <ButtonLogin>Entrar</ButtonLogin>
            </ContainerLogin>
        </Container>

    )
}

export default Login