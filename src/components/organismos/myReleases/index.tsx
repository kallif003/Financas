import React from "react";
import { Button } from "../../atomos/buttons";
import { ContainerRelease, ContainerReleaseButton } from "./styles";
import { getMonth } from 'date-fns'
import type { DatePickerProps } from 'antd';
import { DatePicker, Cascader, Collapse } from "antd";
import moment from "moment";


const { Panel } = Collapse;

const listReleases = [
    {
        id: 1,
        month: 'Janeiro',
        year: 2022,
        categoria: 'Farmacia',
        compra: 'remedio coração',
        descrição: '',
        valor: 10.5,
        data: new Date().getDate()
    },

]

const listCategory = [
    {
        id: 1,
        category: 'Farmacia',
        valorDestinado: 200
    }
]

const options = [
    {
        value: 0,
        label: 'Janeiro'
    }
]


const month = getMonth(new Date())
const mesAtual = (month: any) => {
    const mes: any = {
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
    return mes[month]
}

let dataAtual = mesAtual(month)
const cu = (value: any) => {
    dataAtual = mesAtual(parseInt(value[0]))
};


const year = String(new Date().getFullYear())

const onChange: DatePickerProps['onChange'] = async (date, dateString) => {
    const dateee = await dateString.split(' ')
    console.log(dateString);
};

const Releases = () => {
    return (
        <ContainerRelease>
            <h1 className="ml-3 mt-3 pr-2">LANÇAMENTOS</h1>
            <div className="flex flex-row mb-5">
                <p className="ml-3 mt-3">Selecione mês e ano:</p>
                <Cascader
                    options={options}
                    bordered={false}
                    onChange={cu}
                    placeholder={dataAtual}
                    style={{ marginTop: '0.5rem', }}
                />
                <DatePicker
                    picker="year"
                    bordered={false}
                    defaultValue={moment(year, 'YYYY')}
                    onChange={onChange}
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
                        {`${dataAtual}/${year}`}
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
                <Panel header="Farmacia" key="1" >
                    Farmacia
                </Panel>
                <Panel header="Diversão" key="2"  >
                    Farmacia
                </Panel>
                <Panel header="Mercado" key="3"  >
                    Farmacia
                </Panel>
            </Collapse>


        </ContainerRelease>
    )
};

export default Releases;