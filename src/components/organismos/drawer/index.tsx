import React, { useContext } from "react";
import { DivIconUser, DivText } from './styles'
import Icon from "@mdi/react";
import { mdiLogout } from '@mdi/js';
import { mdiAccountCheckOutline } from '@mdi/js';
import { Text } from "../../atomos/typography"
import MenuComponent from "../../organismos/menu";
import { SecondaryButton } from "../../atomos/buttons"
import { Drawer, Divider, Input, InputNumber } from "antd";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useRouter } from "next/router"


const DrawerComponent = (props: any) => {
    const { logout }: any = useContext(AuthContext)

    return (
        <Drawer
            title="Bem vindo ao SaveMoney"
            placement="left"
            closable={false}
            open={props.open}
            onClose={() => props.onClose()}
            bodyStyle={{
                background: "#00C897",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                    <Text color="#fff" size={1} className="ml-1">kallif</Text>
                </DivText>
                <Divider style={{ borderColor: "#fff", marginTop: "-0.5rem" }} />
            </DivIconUser>

            <MenuComponent />

            <Divider style={{ borderColor: "#fff", }} />
            <DivText className="mt-4">
                <Icon
                    path={mdiLogout}
                    size={1}
                    color={"#fff"}
                />
                <SecondaryButton onClick={logout}>
                    <Text color="#FFD365" size={1} className="mt-3">Sair</Text>
                </SecondaryButton>
            </DivText>

        </Drawer>
    )
}


export default DrawerComponent;