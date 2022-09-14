import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/auth";
import { DivHeader, DivIconUser, DivText } from '../header/styles'
import { Drawer } from "antd";
import Icon from "@mdi/react";
import { mdiMenu } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { mdiAccountCheckOutline } from '@mdi/js';
import { Text, Text2 } from "../../atomos/typography"
import { SecondaryButton } from "../../atomos/buttons"

const Header = () => {
    const [open, setOpen] = useState(false);
    const { email, logout }: any = useContext(AuthContext)

    const onClose = () => {
        setOpen(false)
    }

    return (
        <DivHeader>
            <button onClick={() => setOpen(!open)}>
                <Icon
                    path={mdiMenu}
                    size={2}
                    color={"#fff"}
                />
            </button>
            <Drawer
                title="Bem vindo ao SaveMoney"
                placement="left"
                closable={false}
                open={open}
                onClose={onClose}
                bodyStyle={{
                    background: "#00C897",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                contentWrapperStyle={{ width: '20rem' }}
                headerStyle={{ textAlign: "center" }}
            >
                <DivIconUser>
                    <Icon
                        path={mdiAccountCheckOutline}
                        size={4}
                        color={"#fff"}
                    />
                    <DivText>
                        <Text color="#FFD365" size={1}>Olá,</Text>
                        <Text2 color="#fff" size={1}>kallif</Text2>
                    </DivText>
                    <hr className="w-72 border-b-2" />
                </DivIconUser>
                <DivText>
                    <Icon
                        path={mdiLogout}
                        size={1}
                        color={"#fff"}
                    />
                    <SecondaryButton onClick={logout}>
                        <p className="mt-1 text-[#FFD365] font-bold text-[1rem]">Sair</p>
                    </SecondaryButton>
                </DivText>
            </Drawer>
        </DivHeader>
    )
}

export default Header;