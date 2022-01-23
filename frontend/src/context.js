import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getlistAccount, getListVehicle } from "./service";

export const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
const listVehicleFake = [
    {
        number: "29y 32132",
        time_in: new Date()
    }
]

//   idCard: getVehicle[0],
// number: getVehicle[1],
// type: getVehicle[2],
// time_in: getVehicle[3]?.replace(`/2022`, '')


export const Provider = ({ children }) => {
    const [listVehicle, setListVehicle] = useState([]);
    const [listAccount, setListAccount] = useState([]);
    const [amountMoto, setAmountMoto] = useState(0);
    const [amountCar, setAmountCar] = useState(0);

    const deleteVehicle = (idCard) => {
        console.log('idCard', idCard);

        let listVehicleNew = [...listVehicle].filter(e => e?.idCard != idCard);
        console.log('listVehicleNew', listVehicleNew);

        setListVehicle(listVehicleNew)
    }
    
    const updateListVehicle = async () => {
        let listVehicle = await getListVehicle()
        if (listVehicle && listVehicle?.length > 0) {
            listVehicle = listVehicle.map(e => {
                return ({
                    idCard: e[0],
                    number: e[1],
                    type: e[2],
                    time_in: e[3]?.replace(`/2022`, ''),
                    time_out: e[4]?.replace(`/2022`, ''),
                    
                }

                )
            })
        }
        console.log('listVehicle', listVehicle);
        setListVehicle(listVehicle)
    }


    const updateListAccount = async () => {
        let listAccount = await getlistAccount()
        if (listAccount && listAccount?.length > 0) {
            listAccount = listAccount.map(e => {
                return ({
                    id: e[0],
                    name: e[1],
                    IDnumber: e[2],
                    vehicle: e[3],
                    start: e[4],
                    outOfDate: e[5],
                    month: e[6],
                }

                )
            }).filter(e=>!e.time_out)
        }
        console.log('listAccount', listAccount);
        setListAccount(listAccount)
    }


    useEffect(() => {
        updateListVehicle()
        updateListAccount()
    }, [])

    useEffect(() => {
        let moto=0;
        let car=0;
        if(listVehicle){
            listVehicle.forEach((e, i)=>{
                if(e?.type==="motobike") moto++;
                else if(e?.type==="car") car++
            })
        }

        setAmountCar(car)
        setAmountMoto(moto)
    }, [listVehicle])





    const value = useMemo(
        () => ({
            listVehicle, setListVehicle, deleteVehicle,
            listAccount, setListAccount,updateListAccount,
            amountMoto, amountCar
        }),
        [listVehicle, listAccount, amountMoto, amountCar]
    );


    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
