import React, { useState, useEffect } from "react";
import { Menu, Modal, InputNumber } from "antd";
import { Button, SecondaryButton } from "../../../atomos/buttons"
import firebase from "../../../../connection/firebaseConnection"
import { useRouter } from "next/router"
import { notification } from "antd"
import { CloseCircleOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';
import { mdiLeadPencil } from '@mdi/js';
import Icon from "@mdi/react";
import useAuth from "../../../../hooks/useAuth";


const { SubMenu } = Menu;

interface listSalary {
    key: string
    salary: number
}

const MenuInformations = () => {
    const [registrationModal, setRegistrationModal] = useState(false);
    const [editeModal, setEditeModal] = useState(false)
    const { user }: any = useAuth()
    const [salary, setSalary] = useState(0)
    const [mySalary, setMySalary] = useState<listSalary[]>([])
    const [visible, setVisible] = useState(false)
    const router = useRouter()


    const showRegistrationModal = () => {
        setRegistrationModal(true);
    };

    const addSalary = (id = "") => {
        try {
            if (salary === 0) return;

            if (id !== "") {
                firebase.database().ref('Salary').child(user).child(id).update({
                    salary: salary,

                }).then(() => {
                    setEditeModal(false)
                    notification.open({
                        message: 'Sucesso',
                        description: 'Salário editada!',
                        icon: <SmileOutlined style={{ color: "#00C897" }} />,
                    });
                }).catch((error) => {
                    console.log(error)
                })

            } else {
                let mySalary = firebase.database().ref('Salary').child(user);
                let key: any = mySalary.push().key;

                mySalary.child(key).set({
                    salary,
                })
                    .then(() => {
                        setRegistrationModal(false)
                        notification.open({
                            message: 'Sucesso',
                            description: 'Salário cadastrada!',
                            icon: <SmileOutlined style={{ color: "#00C897" }} />,
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
            });
            router.push("./LoginPage")
        }

    };

    const setDisabledButton = () => {
        console.log(mySalary)
        if (mySalary.length > 0) setVisible(true)
    }

    useEffect(() => {
        const getSalary = async () => {
            console.log(user)
            if (user !== '') {
                await firebase
                    .database()
                    .ref("Salary")
                    .child(user)
                    .on("value", (snapshot) => {
                        setMySalary([])

                        snapshot.forEach((childItem) => {
                            const data = {
                                key: childItem.key,
                                salary: childItem.val().salary,
                            }
                            setMySalary((old: any[]) => [...old, data])
                        })
                    })
            }

        }

        getSalary()


    }, [user])

    return (
        <div>
            <Menu
                mode="inline"
                style={
                    {
                        background: "#00C897",
                    }} theme="dark"
            >
                <SubMenu
                    key={1}
                    title="Informações"
                    onTitleClick={setDisabledButton}
                    style={
                        {
                            fontWeight: 'bold',
                            marginBottom: '2rem',
                            color: '#fff'
                        }
                    }
                >
                    {mySalary.map((s) => (
                        <Menu.Item
                            style={
                                {
                                    background: "#00C897",
                                    margin: '0px'
                                }}>
                            <div className="flex flex-row justify-between">
                                <p>Salario</p>
                                <p>{`R$${s.salary}`}</p>
                                <SecondaryButton margin={-1} onClick={() => setEditeModal(true)}>
                                    <Icon
                                        path={mdiLeadPencil}
                                        size={1}
                                    />
                                </SecondaryButton>
                            </div>
                            <Modal title="Editar Salário"
                                open={editeModal}
                                onCancel={() => setEditeModal(false)}
                                onOk={() => addSalary(s.key)}
                            >
                                <div className="flex flex-row justify-evenly">
                                    <h1>Salário</h1>
                                    <InputNumber
                                        addonBefore="+"
                                        addonAfter="$"
                                        defaultValue={100}
                                        value={salary}
                                        onChange={(value) => setSalary(value)}
                                        style={{ width: '8rem' }}
                                    />
                                </div>
                            </Modal>

                        </Menu.Item>
                    ))}
                    <div className={mySalary.length > 0 ? "block" : "hidden"}>
                        <Menu.Item
                            style={
                                {
                                    background: "#00C897",
                                    margin: '0px'
                                }}
                        >
                            <Button
                                disabled={visible}
                                width={5}
                                height={1.5}
                                onClick={() => setRegistrationModal(true)}
                                className="hover:text-[#FFD365]"
                            >
                                Cadastrar
                            </Button>
                        </Menu.Item>
                    </div>
                    <Modal
                        title="Cadastrar Salário"
                        open={registrationModal}
                        onOk={() => addSalary()}
                        onCancel={() => setRegistrationModal(false)}
                    >
                        <div className="flex flex-row justify-evenly">
                            <h1>Salário</h1>
                            <InputNumber
                                addonBefore="+"
                                addonAfter="$"
                                defaultValue={0}
                                value={salary}
                                onChange={(value) => setSalary(value)}
                                style={{ width: '8rem' }}
                            />
                        </div>
                    </Modal>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default MenuInformations;