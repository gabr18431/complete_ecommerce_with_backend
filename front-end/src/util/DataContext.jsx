import { createContext, useState } from "react";
export const DataContextArray = createContext("");
export default function DataContext({children}) {
    const [itemInCart, setItemInCart] = useState([]);
    const [countOfCart, setCountOfCart] = useState(null);
    return(
    <DataContextArray.Provider 
        // @ts-ignore
        value={{
            itemInCart, setItemInCart,
            countOfCart, setCountOfCart, 
        }} >
            {children}
    </DataContextArray.Provider>)
}