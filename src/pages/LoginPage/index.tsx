import React, { useState, useContext } from "react"
import { Button, SecondaryButton } from '../../components/atomos/buttons'
import { InputLogin } from '../../components/atomos/inputs'
import { TitleLogin, SubtitleLogin, Message } from '../../components/atomos/typography'
import { mdiCashCheck } from '@mdi/js';
import { AuthContext } from "../../contexts/auth"
import Icon from '@mdi/react'
import {
    Container, ContainerLogin, Span,
    WrapInput, ContainerTitle, ContainerButtons
} from './styles'
import { off } from "process";


const Login = () => {
    const [type, setType] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [recoverPassword, setRecoverPassword] = useState(false)
    const { login, signUp, passwordReset, msg }: any = useContext(AuthContext)

    function access() {
        if (type === "login") {
            login(email, password)
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
            <ContainerLogin>
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
                        className={recoverPassword === false ? "block" : "hidden"}>
                        {type === 'login' ? "Entrar" : "Cadastrar"}
                    </Button>
                    <Button onClick={recover}
                        width={10}
                        height={2}
                        background={"#FFD365"}
                        className={recoverPassword === true ? "block" : "hidden"}>
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