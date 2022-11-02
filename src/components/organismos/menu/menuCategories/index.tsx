import React, { useEffect, useState } from "react";
import { Menu, Modal, Input, InputNumber, notification } from "antd";
import { Button, SecondaryButton } from "../../../atomos/buttons"
import { mdiLeadPencil } from '@mdi/js';
import Icon from "@mdi/react";
import { mdiDelete } from '@mdi/js';
import { SmileOutlined } from '@ant-design/icons';
import firebase from "../../../../connection/firebaseConnection"
import useAuth from "../../../../hooks/useAuth";
import { useRouter } from "next/router"

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
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('')
    const { handleCategories }: any = useAuth()
    const router = useRouter()

    const AuthStateChanged = async () => {
        setLoading(true)
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

    const createCategories = () => {
        handleCategories(category, destinedValue);
        setCategory("")
        setDestinedValue(0)
        setRegistrationModal(false)
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
                                <SecondaryButton margin={-1} onClick={() => isModalOpen(c.key)} >
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
                                <div className="flex flex-row justify-between">
                                    <h1>Categoria</h1>
                                    <Input
                                        placeholder="Informe"
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        style={{ width: '8rem' }}
                                    />
                                    <h1>Valor destinado</h1>
                                    <InputNumber
                                        addonBefore="+"
                                        addonAfter="$"
                                        defaultValue={100}
                                        value={destinedValue}
                                        onChange={(value) => setDestinedValue(value)}
                                        style={{ width: '8rem' }}
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
                    onCancel={() => setRegistrationModal(false)}>
                    <div className="flex flex-row justify-between">
                        <h1>Categoria</h1>
                        <Input
                            placeholder="Informe"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            style={{ width: '8rem' }}
                        />
                        <h1>Valor destinado</h1>
                        <InputNumber
                            addonBefore="+"
                            addonAfter="$"
                            defaultValue={100}
                            value={destinedValue}
                            onChange={(value) => setDestinedValue(value)}
                            style={{ width: '8rem' }}
                        />
                    </div>
                </Modal>
            </Menu>
        </div>
    )
}

export default MenuCategories;