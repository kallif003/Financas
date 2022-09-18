import React from "react";
import { Menu } from "antd";
import { Button } from "../../atomos/buttons"
import { Text } from "../../atomos/typography"
import PropTypes from 'prop-types';

const topicos = [
    { id: 1, item: 'Categorias' },
    { id: 2, item: 'Lançamentos' },
    { id: 3, item: 'Informações' }
]

const list = [
    { id: 1, item: 'Farmacia', type: 'Categorias' },
    { id: 2, item: 'Diversão', type: 'Categorias' },
    { id: 3, item: 'Mercado', type: 'Categorias' },
    { id: 4, item: 'Janeiro', type: 'Lançamentos' },
    { id: 4, item: 'Fevereiro', type: 'Lançamentos' },
    { id: 4, item: 'Março', type: 'Lançamentos' },
    { id: 4, item: 'Abril', type: 'Lançamentos' },
    { id: 4, item: 'Maio', type: 'Lançamentos' },
    { id: 4, item: 'Junho', type: 'Lançamentos' },
    { id: 4, item: 'Julho', type: 'Lançamentos' },
    { id: 4, item: 'Agosto', type: 'Lançamentos' },
    { id: 4, item: 'Setembro', type: 'Lançamentos' },
    { id: 4, item: 'Outubro', type: 'Lançamentos' },
    { id: 4, item: 'Novembro', type: 'Lançamentos' },
    { id: 4, item: 'Dezembro', type: 'Lançamentos' },
    { id: 5, item: 'Salario', type: 'Informações' }
]
const { SubMenu } = Menu;

const MenuComponent = (props: any) => {
    return (
        <div className="w-full mt-8">
            <Menu
                mode="inline"
                style={
                    {
                        background: "#00C897",
                    }} theme="dark">
                {topicos.map((e) => (
                    <SubMenu
                        key={e.id}
                        title={e.item}
                        style={
                            {
                                fontWeight: 'bold',
                                marginBottom: '2rem',
                                color: '#fff'
                            }
                        }
                    >
                        {list.map((i) => (
                            i.type === e.item ? (

                                <Menu.Item
                                    style={
                                        {
                                            background: "#00C897",
                                            margin: '0px'
                                        }}>
                                    {i.type === 'Lançamentos' ? (
                                        <Button
                                            width={5}
                                            height={1.5}
                                            className="hover:text-[#FFD365]"
                                        >
                                            {i.item}
                                        </Button>
                                    ) : (
                                        <Text color="#fff" size={1}>
                                            {i.item}
                                        </Text>
                                    )}

                                </Menu.Item>
                            ) : (null)
                        ))}
                        {e.item === "Categorias" ? (
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
                                    onClick={() => props.showModal()}
                                    className="hover:text-[#FFD365]"
                                >
                                    Cadastrar
                                </Button>
                            </Menu.Item>
                        ) : null
                        }
                        {e.item === "Informações" ? (
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
                                    onClick={() => props.showModal()}
                                    className="hover:text-[#FFD365]"
                                >
                                    Cadastrar
                                </Button>
                            </Menu.Item>
                        ) : null
                        }
                    </SubMenu>
                ))}

            </Menu>
        </div>
    )
}

MenuComponent.prototype = {
    showModal: PropTypes.func
}
export default MenuComponent;