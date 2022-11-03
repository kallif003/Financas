import React, { useState } from "react"
import { Button, SecondaryButton } from '../../components/atomos/buttons'
import { InputLogin } from '../../components/atomos/inputs'
import { TitleLogin, SubtitleLogin, Message } from '../../components/atomos/typography'
import { mdiCashCheck } from '@mdi/js';
import { Spin } from "antd";
import Head from "next/head";
import useAuth from '../../hooks/useAuth'

import Icon from '@mdi/react'
import {
    Container, ContainerLogin, Span,
    WrapInput, ContainerTitle, ContainerButtons
} from '../../components/pagesStyles/styles'

const Login = () => {
    const [type, setType] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [recoverPassword, setRecoverPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const { login, signUp, passwordReset, msg }: any = useAuth()

    function access() {
        if (type === "login") {
            setLoading(true)
            login(email, password, setLoading)
        } else {
            signUp(email, password)
            setEmail("")
            setPassword("")
        }
    }

    function recover() {
        passwordReset(email)
        setEmail("")
    }
    return (
        <Container>
            <Head>
                <title>SaveMoney</title>
                <link rel="icon" href="/dolars.ico" />
            </Head>
            <ContainerLogin>
                <Spin spinning={loading}></Spin>
                <ContainerTitle>
                    <TitleLogin>SaveMoney</TitleLogin>
                    <Icon path={mdiCashCheck}
                        title="User Profile"
                        size={2}
                        color="#fff"
                    />
                </ContainerTitle>
                <SubtitleLogin>Seu dinheiro bem organizado</SubtitleLogin>
                <WrapInput>
                    <InputLogin
                        type={"email"}
                        autoComplete="off"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Span data-placeholder="Email"
                        className={email !== "" ? "hidden" : "block"}>
                    </Span>
                </WrapInput>
                <WrapInput className={recoverPassword === true ? "hidden" : "block"}>
                    <InputLogin
                        type={"password"}
                        autoComplete="off"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Span data-placeholder="Password"
                        className={password !== "" ? "hidden" : "block"}>
                    </Span>
                </WrapInput>
                <Message className={msg === "" ? "hidden" : "block"}>{msg}</Message>
                <ContainerButtons>
                    <Button onClick={access}
                        width={10}
                        height={2}
                        background={"#FFD365"}
                        style={recoverPassword === false ? { display: "block" } : { display: "none" }}
                    >
                        {type === 'login' ? "Entrar" : "Cadastrar"}
                    </Button>
                    <Button onClick={recover}
                        width={10}
                        height={2}
                        background={"#FFD365"}
                        style={recoverPassword === true ? { display: "block" } : { display: "none" }}>
                        Recuperar
                    </Button>
                    <SecondaryButton color={'#fff'} size={0.8}
                        onClick={() => setType((type) =>
                            (type === "login" ? "cadastrar" : "login"))}
                        className={recoverPassword === true ? "hidden" : "block"}>
                        Criar Conta Gratuita
                    </SecondaryButton>
                    <SecondaryButton color={'#FDFFA9'} size={0.6}
                        onClick={() => setRecoverPassword(!recoverPassword)}>
                        {recoverPassword === false ? "Esqueceu a senha?" : "Faça o login"}
                    </SecondaryButton>
                </ContainerButtons>

            </ContainerLogin>
        </Container>

    )
}

export default Login