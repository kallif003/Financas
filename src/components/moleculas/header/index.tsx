import React, { useState } from "react";
import { DivHeader } from "./styles";
import { mdiMenu } from '@mdi/js';
import Icon from "@mdi/react";
import DrawerComponent from "../../organismos/drawer";

const Header = () => {
    const [open, setOpen] = useState(false);

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
            <DrawerComponent open={open} onClose={onClose} />

        </DivHeader >
    )
}

export default Header;