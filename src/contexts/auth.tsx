import { createContext, useState } from "react"
import firebase from "../connection/firebaseConnection"
import { useRouter } from "next/router"

export const AuthContext = createContext({})

function AuthProvider({ children }: any) {
    const [msg, setMsg] = useState("")
    const [user, setUser] = useState("")
    const [nameLists, setNameLists] = useState({})
    const router = useRouter()

    async function signUp(email: string, password: string) {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                router.push("./Home")
            })

    }

    async function login(email: string, password: string) {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((value: any) => {
                router.push("./Home")
                setUser(value.user.uid)
                console.log(user)
            })
            .catch((error) => {
                setMsg("Email ou senha invalidos")
                setTimeout(() => {
                    setMsg("")
                }, 20000)
                // router.push("./LoginPage")
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

            })
    }

    async function getUser() {
        await firebase
            .database()
            .ref("Listas")
            .child(user)
            .on("value", (snapshot) => {
                setNameLists([])

                snapshot.forEach((childItem) => {
                    const data = {
                        key: childItem.key,
                        lista: childItem.key,
                    }
                    setNameLists((old: never[]) => [...old, data])
                })
            })
    }

    return (
        <AuthContext.Provider
            value={{ user, msg, login, signUp, logout, nameLists, passwordReset }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider