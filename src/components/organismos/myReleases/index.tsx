import React, { useEffect, useState } from "react";
import firebase from '../../../connection/firebaseConnection'
import { ContainerRelease } from "./styles";
import { getMonth, getYear } from 'date-fns'
import type { DatePickerProps } from 'antd';
import { DatePicker, Cascader, Collapse, Spin } from "antd";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { useRouter } from "next/router"

interface MonthOptions {
    value: number
    label: string
}

interface ListCategory {
    key: number
    category: string,
    value: number
}

const { Panel } = Collapse;

const Releases = () => {
    const [currentMonth, setCurrentMonth] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(String(getYear(new Date())))
    const [categories, setCategories] = useState<ListCategory[]>([])
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
                getCategories(user.uid)
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
                    snapshot.forEach((childItem) => {
                        const data = {
                            key: childItem.key,
                            category: childItem.val().category,
                            value: childItem.val().destinedValue,
                        }
                        setCategories((old: any[]) => [...old, data])
                        setLoading(false)
                    })
                })
        }
    }

    useEffect(() => {
        AuthStateChanged()
        setMonth(getMonth(new Date()))
        setCurrentMonth(currentDate(month))
    }, [])


    const selectMonth = (value: any) => {
        setCurrentMonth(currentDate(parseInt(value[0])))
    };

    const selectYear: DatePickerProps['onChange'] = async (item, dateString) => {
        setYear(await dateString.split(' ')[0])
    };

    return (
        <ContainerRelease>
            <Spin spinning={loading}>
                <h1 className="ml-3 mt-0 pr-2">LANÇAMENTOS</h1>
                <div className="flex flex-row mb-5">
                    <p className="ml-3 mt-3">Selecione mês e ano:</p>
                    <Cascader
                        options={options}
                        bordered={false}
                        onChange={selectMonth}
                        placeholder={currentMonth}
                        style={{ marginTop: '0.5rem' }}
                    />
                    <DatePicker
                        picker="year"
                        bordered={false}
                        defaultValue={moment(year, 'YYYY')}
                        onChange={selectYear}
                    />
                </div>
                <Collapse
                    defaultActiveKey={['1']}

                    style={{
                        background: '#00C897',
                        width: '40%',
                        borderRadius: '1rem'
                    }}
                >
                    <div className="w-screen flex flex-col items-start pl-5 pt-8 leading-3 text-[#d4d4d4] ">
                        <h1 className="font-bold text-[50px] pb-1 text-[#fff]">
                            {`${currentMonth}/${year}`}
                        </h1>
                        <div className="flex">
                            <p className="pr-1">Total de dispesas:</p>
                            <p>R$2.000</p>
                        </div>
                        <div className="flex">
                            <p className="pr-1">Sobrando:</p>
                            <p>R$1.000</p>
                        </div>
                    </div>
                    {categories.map((category) => (
                        <Panel header={category.category} key={category.key} style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                            <div >
                                <h1 className="text-[#3a3a3a]">Total destinado: R$</h1>
                                <h1 className="text-[#3a3a3a]">Sobrando: R$</h1>
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </Spin>
        </ContainerRelease>
    )
};

export default Releases;