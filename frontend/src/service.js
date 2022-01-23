import { deleteAsync, getAsync, postAsync, postFormAsync } from "./request"
import { generateRandomIntegerInRange } from "./ultil"

export const detectCarIn = async (options) => {
    let { idCard, type = 1 } = options?.params
    let { body } = options
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/detectCar_in?idCard=${idCard}&type=${type}`
    try {
        let { data } = await postFormAsync(url, body)
        return data

    }
    catch (e) {
        return  ""
    }
    

}


export const detectCarOut = async (options) => {
    let { idCard, type = 1 } = options?.params
    let { body } = options
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/detectCar_out?idCard=${idCard}&type=${type}`
    try {
        let { data } = await postFormAsync(url, body)
        return data

    }
    catch (e) {
        return  null
    }
    

}


export const getInforCarOut = async (idCard) => {
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/getCarOut?idCard=${idCard}`
    try {
        let { data } = await getAsync(url)
        return data

    }
    catch (e) {
        return  ""
    }
    

}


export const deleteVehicle = async (idCard) => {
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/deleteVehicle?id=${idCard}`
    try {
        let { data } = await deleteAsync(url)
        return data

    }
    catch (e) {
        return  ""
    }
    

}


export const getInforUser = async (idCard) => {
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/checkRegister?id=${idCard}`
    try {
        let { data } = await getAsync(url)
        return data

    }
    catch (e) {
        return  ""
    }
    

}


export const getlistAccount = async () => {
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/getListAccount`
    try {
        let { data } = await getAsync(url)
        return data

    }
    catch (e) {
        return  []
    }
    

}


export const getListVehicle = async () => {
    // let res = await postFormAsync("url", data)
    let urlCar = `http://localhost:8000/account/getListCar`
    let urlMoto = `http://localhost:8000/account/getListMotobike`
    try {
        let { data:listCar=[] } = await getAsync(urlCar)
        let { data:listMoto=[]} = await getAsync(urlMoto)
        let listVehicle = [...listCar, ...listMoto]
        console.log('listVehicle lấy server', listVehicle);
        return listVehicle

    }
    catch (e) {
        return  ""
    }
    

}


export const deleteAccount = async (id) => {
    // let res = await postFormAsync("url", data)
    let url = `http://localhost:8000/account/deleteReg?id=${id}`
    try {
       let check =  await deleteAsync(url)
       return check

    }
    catch (e) {
        return  ""
    }
    

}




export const addAccount = async (user) => {
    // let res = await postFormAsync("url", data)
    console.log('user', user);
    let url = `http://localhost:8000/account/Register`
    try {
       let checkadd =  await postAsync(url, user)
       return checkadd

    }
    catch (e) {
        return  ""
    }
    

}