import { createContext, useState, useEffect } from "react"
import firebase from "../connection/firebaseConnection"
import { useRouter } from "next/router"

export const AuthContext = createContext({})

function AuthProvider({ children }: any) {
    const [msg, setMsg] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState({})
    const router = useRouter()



    async function signUp(email: string, password: string, setLoading: any) {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                router.push("./Home")
            })

    }

    async function login(email: string, password: string, setLoading: any) {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((value: any) => {
                router.push("./Home")
                setUser(value.user.uid)
                setEmail(value.user.email)
                setLoading(false)
            })
            .catch((error) => {
                setMsg("Email ou senha invalidos")
                setLoading(false)
                setTimeout(() => {
                    setMsg("")
                }, 20000)
            })

    }

    async function passwordReset(email: string) {
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then((value: any) => {
                setMsg("Email enviado com sucesso")
                setTimeout(() => {
                    setMsg("")
                }, 20000)
            })
            .catch((error) => {
                setMsg("Email inválido")
                setTimeout(() => {
                    setMsg("")
                }, 2000)
            })
    }
    async function logout() {
        await firebase
            .auth()
            .signOut()
            .then(() => {
                router.push("./LoginPage")
            })
    }



    return (
        <AuthContext.Provider
            value={{ user, msg, login, signUp, logout, email, passwordReset }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider