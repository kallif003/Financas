import React, { useState, useContext } from "react";
import { Menu, Modal, Input, InputNumber, notification } from "antd";
import { Button, SecondaryButton } from "../../../atomos/buttons"
import { mdiLeadPencil } from '@mdi/js';
import Icon from "@mdi/react";
import { mdiDelete } from '@mdi/js';
import { AuthContext } from "../../../../contexts/auth";
import { SmileOutlined } from '@ant-design/icons';
import firebase from "../../../../connection/firebaseConnection"

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, handleCategories }: any = useContext(AuthContext)

    const getCategories = async () => {
        if (categories.length === 0) {
            await firebase
                .database()
                .ref("Categories")
                .child(user)
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

    const handleEdite = (key: any) => {
        handleCategories(category, destinedValue, key)
        setCategory("")
        setDestinedValue(0)
        setIsModalOpen(false)
    }

    const createCategories = () => {
        handleCategories(category, destinedValue);
        setCategory("")
        setDestinedValue(0)
        setIsModalOpen(false)
    }

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
                    onTitleClick={getCategories}
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
                                <SecondaryButton margin={-1} onClick={() => setIsModalOpen(true)} >
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
                                open={isModalOpen}
                                onCancel={() => setIsModalOpen(false)}
                                onOk={() => handleEdite(c.key)}
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
                            onClick={() => setIsModalOpen(true)}
                            className="hover:text-[#FFD365]"
                        >
                            Cadastrar
                        </Button>
                    </Menu.Item>
                </SubMenu>
                <Modal
                    title="Cadastrar Categorias"
                    open={isModalOpen}
                    onOk={createCategories}
                    onCancel={() => setIsModalOpen(false)}>
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