import React from "react";
import MenuCategories from "./menuCategories";
import MenuInformations from "./menuInformations"

const MenuComponent = () => {

    return (
        <div className="w-full mt-8">
            <MenuCategories />
            <MenuInformations />
        </div>
    )
}

export default MenuComponent;