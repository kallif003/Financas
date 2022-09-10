import React from "react"
import { ButtonLogin, SecondaryButton } from '../../components/buttons'
import {
    Container, ContainerLogin, Span,
    WrapInput, ContainerTitle, ContainerButtons
} from './styles'
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
                <ContainerButtons>
                    <ButtonLogin>Entrar</ButtonLogin>
                    <SecondaryButton color={'#fff'} size={0.8}>Criar Conta Gratuita</SecondaryButton>
                    <SecondaryButton color={'#FDFFA9'} size={0.6}>Esqueceu a senha?</SecondaryButton>
                </ContainerButtons>

            </ContainerLogin>
        </Container>

    )
}

export default Login