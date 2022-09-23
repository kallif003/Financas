import { createContext, useState } from "react"
import firebase from "../connection/firebaseConnection"
import { useRouter } from "next/router"
import { notification } from "antd"
import { CloseCircleOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';

export const AuthContext = createContext({})

function AuthProvider({ children }: any) {
    const [msg, setMsg] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState({})
    const router = useRouter()

    async function signUp(email: string, password: string) {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
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
                setEmail(value.user.email)
            })
            .catch((error) => {
                setMsg("Email ou senha invalidos")
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

    const handleCategories = (category: string, destinedValue: number, id: string) => {
        try {
            if (category === '') return;

            if (id !== undefined) {
                firebase.database().ref('Categories').child(user).child(id).update({
                    category: category,
                    destinedValue: destinedValue
                }).then(() => {
                    notification.open({
                        message: 'Sucesso',
                        description: 'Categoria editada!',
                        icon: <SmileOutlined style={{ color: "#00C897" }} />,
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }).catch((error) => {
                    console.log(error)
                })
            } else {

                let categories = firebase.database().ref('Categories').child(user);
                let key: any = categories.push().key;

                categories.child(key).set({
                    category,
                    destinedValue
                })
                    .then(() => {
                        notification.open({
                            message: 'Sucesso',
                            description: 'Categoria cadastrada!',
                            icon: <SmileOutlined style={{ color: "#00C897" }} />,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        } catch (error) {
            notification.open({
                message: 'Você foi deslogado',
                description: 'Por favor refaça o login',
                icon: <CloseCircleOutlined style={{ color: 'red' }} />,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            router.push("./LoginPage")
        }

    };

    return (
        <AuthContext.Provider
            value={{ user, msg, login, signUp, logout, email, passwordReset, handleCategories }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider