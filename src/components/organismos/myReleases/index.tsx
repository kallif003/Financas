import React from "react";
import { Button } from "../../atomos/buttons";
import { ContainerRelease, ContainerReleaseButton } from "./styles";
import { DatePicker } from "antd";

const list = [
    { id: 1, item: 'Janeiro' },
    { id: 2, item: 'Fevereiro' },
    { id: 3, item: 'Março' },
    { id: 4, item: 'Abril' },
    { id: 5, item: 'Maio' },
    { id: 6, item: 'Junho' },
    { id: 7, item: 'Julho' },
    { id: 8, item: 'Agosto' },
    { id: 9, item: 'Setembro' },
    { id: 10, item: 'Outubro' },
    { id: 11, item: 'Novembro' },
    { id: 12, item: 'Dezembro' }
]


const Releases = () => {
    return (
        <ContainerRelease>
                  <h1 className="ml-3 mt-3 pr-2">LANÇAMENTOS</h1>
            <div className="flex flex-row mb-5">
          
                <p className="ml-3 mt-3">Selecione o ano:</p>
                <DatePicker picker="year" bordered={false} />
            </div>
            <ContainerReleaseButton>
                {list.map((e) => (
                    <Button
                        width={15}
                        height={5}
                        background={"#00C897"}
                        key={e.id}
                    >
                        {e.item}
                    </Button>
                ))}
            </ContainerReleaseButton>
        </ContainerRelease>
    )
};

export default Releases;