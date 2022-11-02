import React, { useEffect, useState } from "react";
import firebase from '../../../connection/firebaseConnection'
import { ButtonRelease } from "../../atomos/buttons";
import { getMonth, getYear } from 'date-fns'
import type { DatePickerProps } from 'antd';
import { notification } from "antd"
import { CloseCircleOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';
import {
    DatePicker, Cascader, Collapse, Spin,
    Modal, Input, InputNumber, Popover, Divider, Menu
} from "antd";
import moment from "moment";
import Icon from '@mdi/react'
import { mdiArrowDownBold } from '@mdi/js';
import { mdiArrowUpBold } from '@mdi/js';
import { useRouter } from "next/router"
import { SubMenu } from './styles'
import ca from "date-fns/locale/ca/index";
import { SourceMap } from "module";
interface MonthOptions {
    value: number
    label: string
}

interface ListCategory {
    key: number
    category: string,
    value: number
}

interface ListRelease {
    key: number
    category: string
    description: string
    date: string
    value: number
    month: string
    year: string
    total: number
    id?: number

}


let mes: string
let ano: string
let destinedValue: any = []

const Releases = () => {
    const [currentMonth, setCurrentMonth] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(-1)
    const [description, setDescription] = useState("")
    const [value, setValue] = useState(0)
    const [user, setUser] = useState("")
    const [month, setMonth] = useState(0);
    const [salary, setSalary] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [year, setYear] = useState(String(getYear(new Date())))
    const [categories, setCategories] = useState<ListCategory[]>([])
    const [category, setCategory] = useState("")
    const [release, setRelease] = useState<ListRelease[]>([])
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [remaining, setRemaining] = useState(0)
    const [totalDestined, setTotalDestined] = useState(0)
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const options: Array<MonthOptions> = [
        { value: 0, label: 'Janeiro' },
        { value: 1, label: 'Fevereiro' },
        { value: 2, label: 'Março' },
        { value: 3, label: 'Abril' },
        { value: 4, label: 'Maio' },
        { value: 5, label: 'Junho' },
        { value: 6, label: 'Julho' },
        { value: 7, label: 'Agosto' },
        { value: 8, label: 'Setembro' },
        { value: 9, label: 'Outubro' },
        { value: 10, label: 'Novembro' },
        { value: 11, label: 'Dezembro' },
    ]

    const currentDate = (option: any) => {
        const month: any = {
            0: 'Janeiro',
            1: "Fevereiro",
            2: "Março",
            3: "Abril",
            4: "Maio",
            5: "Junho",
            6: "Julho",
            7: "Agosto",
            8: 'Setembro',
            9: "Outubro",
            10: "Novembro",
            11: "Dezembro"
        }
        return month[option]
    }

    const AuthStateChanged = async () => {
        setLoading(true)
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user.uid)
                getCategories(user.uid)
                getRelease(user.uid)
                getSalary(user.uid)
                router.push("./Home")
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
                    destinedValue = []
                    snapshot.forEach((childItem) => {
                        const data = {
                            key: childItem.key,
                            category: childItem.val().category,
                            value: childItem.val().destinedValue,
                        }
                        setCategories((old: any[]) => [...old, data])
                        setLoading(false)
                        destinedValue.push(data.value)
                    })
                })

        }

    }

    const soma = () => {
        const sum = destinedValue.reduce((total: any, value: any) => {
            let summation = total + value

            return summation
        }, 0)

        setExpenses(sum)
    }

    const getRelease = async (uid: string) => {
        await firebase
            .database()
            .ref("Release")
            .child(uid)
            .on("value", (snapshot) => {
                setRelease([])
                snapshot.forEach((childItem) => {
                    if (childItem.val().currentMonth === mes && childItem.val().year === ano) {
                        const data = {
                            key: childItem.key,
                            category: childItem.val().category,
                            description: childItem.val().description,
                            value: childItem.val().value,
                            date: childItem.val().date,
                            month: childItem.val().currentMonth,
                            year: childItem.val().year
                        }
                        setRelease((old: any[]) => [...old, data])
                    }
                })
            })
    }

    const getSalary = async (uid: string) => {
        await firebase
            .database()
            .ref("Salary")
            .child(uid)
            .on("value", (snapshot) => {
                snapshot.forEach((childItem) => {
                    setSalary(childItem.val().salary)
                })
            })
    }

    const addExpenses = (category: string) => {
        let summation = 0
        let subtracting = 0
        let totalValue = 0

        const sum = release.reduce((total, value) => {
            if (value.category === category) {
                summation = total + value.value
            }

            return summation
        }, 0)

        setTotalExpenses(sum)

        const leftovers = categories.reduce((total, value) => {
            if (value.category === category) {
                subtracting = value.value - summation
            }

            return subtracting
        }, 0)

        setRemaining(leftovers)

        const total = categories.reduce((t, value) => {
            if (value.category === category) {
                totalValue = value.value
            }
            return totalValue
        }, 0)

        setTotalDestined(total)

    }

    useEffect(() => {
        soma()
    }, [loading])

    useEffect(() => {
        AuthStateChanged()
        setMonth(getMonth(new Date()))
        setCurrentMonth(currentDate(month))
        mes = currentDate(month)
        ano = year
    }, [user])


    const selectMonth = (value: any) => {
        mes = currentDate(parseInt(value[0]))
        setCurrentMonth(currentDate(parseInt(value[0])))
        getRelease(user)
        addExpenses(category)
    };

    const selectYear: DatePickerProps['onChange'] = async (item, dateString) => {
        ano = await dateString.split(' ')[0]
        setYear(await dateString.split(' ')[0])
        getRelease(user)
        addExpenses(category)
    };

    const addNewRelease = async () => {
        const date = new Date().toLocaleString().split(" ")[0]

        let release = await firebase.database().ref('Release').child(user);
        let key: any = release.push().key;

        release.child(key).set({
            category,
            description,
            value,
            currentMonth,
            year,
            date,
        })
            .then(() => {
                notification.open({
                    message: 'Sucesso',
                    description: 'Lançamento efetuado!',
                    icon: <SmileOutlined style={{ color: "#00C897" }} />,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }).catch((error) => {
                console.log(error)
            })


        setIsModalOpen(false)
        setDescription("")
        setValue(0)
        getRelease(user)
        setIsOpen(-1)
    }

    const handleModal = (category: string) => {
        setCategory(category)
        setIsModalOpen(true)
    }

    return (
        <div className="px-3 pt-5 pb-5">
            <Spin spinning={loading}>
                <h1 className="ml-3 mt-0 pr-2">LANÇAMENTOS</h1>
                <div className="flex flex-row mb-5 sm:flex-col">
                    <p className="ml-3 mt-3">Selecione mês e ano:</p>
                    <Cascader
                        options={options}
                        bordered={false}
                        onChange={selectMonth}
                        onClick={() => setIsOpen(-1)}
                        placeholder={currentMonth}
                        style={{ marginTop: '0.5rem', width: '8rem' }}
                    />
                    <DatePicker
                        picker="year"
                        bordered={false}
                        defaultValue={moment(year, 'YYYY')}
                        onChange={selectYear}
                        onClick={() => setIsOpen(-1)}
                        className="sm:w-[8rem] w-24"
                    />
                </div>
                <div className="w-auto sm:mx-2 xl:w-[40%] bg-[#00C897] rounded-[1rem] mb-[2rem]">
                    <div className="w-screen flex flex-col items-start pl-5 pt-8 leading-3 text-[#d4d4d4] sm:w-auto">
                        <h1 className="font-bold text-[50px] pb-1 text-[#fff] sm:text-[25px]">
                            {`${currentMonth}/${year}`}
                        </h1>
                        <div className="flex">
                            <p className="pr-1">Sálario:</p>
                            <p>R${salary}</p>
                        </div>
                        <div className="flex">
                            <p className="pr-1">Total de dispesas:</p>
                            <p>R${expenses}</p>
                        </div>
                        <div className="flex">
                            <p className="pr-1">{expenses > salary ? "Negativo" : "Sobrando"}:</p>
                            <p>R${salary - expenses}</p>
                        </div>
                    </div>
                    <Menu
                        mode="inline"
                        style={
                            {
                                background: "#00C897",
                                borderRadius: "1rem",
                            }} theme="dark"
                    >
                        {categories.map((category, index) => (
                            <SubMenu key={category.key}>
                                <div className="flex justify-between items-center mt-5">
                                    <h1 className="text-white ml-5 text-xl mt-1">{category.category}</h1>
                                    <div className="flex">
                                        <button id={String(index)}
                                            onClick={() => { setIsOpen(index); addExpenses(category.category) }}
                                            className={isOpen !== index ? "block mr-7" : "hidden"}
                                        >
                                            <Icon path={mdiArrowUpBold}
                                                size={1}
                                                color="#fff"

                                            />
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(-1)}
                                            className={isOpen == index ? "block mr-7" : "hidden"}
                                        >
                                            <Icon path={mdiArrowDownBold}
                                                size={1}
                                                color="#fff"

                                            />
                                        </button>
                                    </div>
                                </div>


                                <Menu.Item
                                    className={isOpen === index ? "block" : "hidden"}
                                    style={
                                        {
                                            background: "#00C897",
                                            paddingLeft: 0,
                                            margin: 0,
                                            height: '100%',
                                            width: '100%',
                                        }}>
                                    <div className="mt-3 flex justify-between pl-5 text-lg leading-3 pb-3">
                                        <div >
                                            <h1 className="text-[#3a3a3a]">Total destinado: <span className="text-[#2a2a2a]">R${totalDestined}</span></h1>
                                            <h1 className="text-[#3a3a3a]">Total de gastos: <span className="text-[#2a2a2a]">R${totalExpenses}</span></h1>
                                            <h1 className="text-[#3a3a3a]">
                                                {totalExpenses > totalDestined ?
                                                    "Negativo" : "Sobrando"}:
                                                <span className="text-[#2a2a2a]"> R${remaining}
                                                </span>
                                            </h1>
                                        </div>
                                        <Popover title="Novo Lançamento">
                                            <ButtonRelease
                                                onClick={() => handleModal(category.category)}
                                            >
                                                +
                                            </ButtonRelease>
                                        </Popover>
                                    </div>
                                    {release.map((r) => (
                                        r.month === currentMonth && r.year === year && (
                                            r.category === category.category && (
                                                <div className="mt-5 pb-5 pl-5 text-lg leading-3" key={r.key}>
                                                    <h1>Descrição: <span className="text-[#fff] px-1 rounded-sm">{r.description}</span></h1>
                                                    <h1>Valor: <span className="text-[#fff] px-1 rounded-sm">R${r.value}</span></h1>
                                                    <h1>Data: <span className="text-[#fff] px-1 rounded-sm">{r.date}</span></h1>
                                                </div>

                                            )
                                        )
                                    ))}
                                    <Modal title="Novo lançamento"
                                        open={isModalOpen}
                                        onCancel={() => setIsModalOpen(false)}
                                        onOk={() => addNewRelease()}
                                    >
                                        <div className="flex flex-col justify-evenly">
                                            <h1>Descrição</h1>
                                            <Input
                                                placeholder="Informe"
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)}
                                                style={{ width: '28rem', marginBottom: "1rem" }}
                                            />
                                            <h1>Valor</h1>
                                            <InputNumber
                                                addonBefore="+"
                                                addonAfter="$"
                                                defaultValue={100}
                                                value={value}
                                                onChange={(value) => setValue(value)}
                                                style={{ width: '8rem' }}
                                            />
                                        </div>
                                    </Modal>
                                    <Divider style={{ borderColor: "#000", marginLeft: "1.25rem" }} />
                                </Menu.Item>

                            </SubMenu>
                        ))}
                    </Menu>
                </div>


            </Spin >
        </div >
    )
};

export default Releases;