import React, { useEffect, useState } from "react";
import { Menu, Modal, Input, InputNumber, notification } from "antd";
import { Button, SecondaryButton } from "../../../atomos/buttons"
import { mdiLeadPencil } from '@mdi/js';
import Icon from "@mdi/react";
import { mdiDelete } from '@mdi/js';
import firebase from "../../../../connection/firebaseConnection"
import { useRouter } from "next/router"
import { CloseCircleOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

interface ListCategory {
    key: number
    category: string,
    value: number
}

const MenuCategories = () => {
    const [categories, setCategories] = useState<ListCategory[]>([])
    const [category, setCategory] = useState('')
    const [destinedValue, setDestinedValue] = useState(0)
    const [registrationModal, setRegistrationModal] = useState(false);
    const [editeModal, setEditeModal] = useState(false)
    const [error, setError] = useState("")
    const [user, setUser] = useState("")
    const [id, setId] = useState('')
    const router = useRouter()

    const AuthStateChanged = async () => {
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user.uid)
                getCategories(user.uid)
            } else {
                router.push("./LoginPage")
            }
        })
    }

    const getCategories = async (uid: string) => {
        if (categories.length === 0) {
            await firebase
                .database()
                .ref("Categories")
                .child(uid)
                .on("value", (snapshot) => {
                    setCategories([])

                    snapshot.forEach((childItem) => {
                        const data = {
                            key: childItem.key,
                            category: childItem.val().category,
                            value: childItem.val().destinedValue,
                        }
                        setCategories((old: any[]) => [...old, data])
                    })
                })
        }
    }

    const handleDelete = (key: any) => {
        firebase.database().ref('Categories')
            .child(user).child(key).remove()
            .then(() => {
                notification.open({
                    message: 'Sucesso',
                    description: 'Categoria deletada!',
                    icon: <SmileOutlined style={{ color: "#00C897" }} />,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }).catch((error) => {
                console.log(error)
            })
    }

    const isModalOpen = (key: any) => {
        setEditeModal(true)
        setId(key)

    }

    const handleEdite = () => {
        handleCategories(category, destinedValue, id)
        setCategory("")
        setDestinedValue(0)
        setEditeModal(false)
    }

    const handleCategories = (category: string, destinedValue: number, id?: string) => {
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

    const createCategories = () => {
        if (category !== "" && destinedValue !== 0) {
            handleCategories(category, destinedValue);
            setCategory("")
            setDestinedValue(0)
            setRegistrationModal(false)
        } else {
            setError("Os campos categoria e valor estão vazios")
        }
    }

    useEffect(() => {
        AuthStateChanged()
    }, [user])

    return (
        <div>
            <Menu
                mode="inline"
                style={
                    {
                        background: "#00C897",
                    }} theme="dark">

                <SubMenu
                    key={1}
                    title="Categorias"
                    onTitleClick={() => getCategories(user)}
                    style={
                        {
                            fontWeight: 'bold',
                            marginBottom: '2rem',
                            color: '#fff'
                        }
                    }
                >
                    {categories.map((c) => (
                        <Menu.Item
                            style={
                                {
                                    background: "#00C897",
                                    margin: '0px'
                                }}>

                            <div className="flex flex-row justify-between">
                                <p>{c.category}</p>
                                <p>{`R$${c.value}`}</p>
                                <SecondaryButton margin={-1}
                                    onClick={() => {
                                        isModalOpen(c.key);
                                        setCategory(c.category);
                                        setDestinedValue(c.value)
                                    }}
                                >
                                    <Icon
                                        path={mdiLeadPencil}
                                        size={1}
                                    />
                                </SecondaryButton>
                                <SecondaryButton margin={-1} onClick={() => handleDelete(c.key)}>
                                    <Icon
                                        path={mdiDelete}
                                        size={1}
                                    />
                                </SecondaryButton>
                            </div>

                            <Modal title="Editar Categorias"
                                open={editeModal}
                                onCancel={() => setEditeModal(false)}
                                onOk={() => handleEdite()}
                            >
                                <div className="">
                                    <h1>Categoria</h1>
                                    <Input
                                        placeholder="Informe"
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        className="w-[8rem]"
                                    />
                                    <h1 className="mt-5">Valor destinado</h1>
                                    <InputNumber
                                        addonBefore="+"
                                        addonAfter="$"
                                        defaultValue={100}
                                        value={destinedValue}
                                        onChange={(value) => setDestinedValue(value)}
                                        className="w-[10rem]"
                                    />
                                </div>
                            </Modal>

                        </Menu.Item>
                    ))}
                    <Menu.Item
                        style={
                            {
                                background: "#00C897",
                                margin: '0px'
                            }}
                    >
                        <Button
                            width={5}
                            height={1.5}
                            onClick={() => setRegistrationModal(true)}
                            className="hover:text-[#FFD365]"
                        >
                            Cadastrar
                        </Button>
                    </Menu.Item>
                </SubMenu>
                <Modal
                    title="Cadastrar Categorias"
                    open={registrationModal}
                    onOk={createCategories}
                    onCancel={() => { setRegistrationModal(false); setError("") }}>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-red-600">{error}</h1>
                        <h1>Categoria</h1>
                        <Input
                            placeholder="Informe"
                            value={category}
                            onChange={(event) => { setCategory(event.target.value); setError("") }}
                            className="w-[28rem] sm:w-60"

                        />
                        <h1 className="mt-5">Valor destinado</h1>
                        <InputNumber
                            addonBefore="+"
                            addonAfter="$"
                            defaultValue={100}
                            value={destinedValue}
                            onChange={(value) => { setDestinedValue(value); setError("") }}
                            style={{ width: '8rem' }}
                        />
                    </div>
                </Modal>
            </Menu>
        </div>
    )
}

export default MenuCategories;