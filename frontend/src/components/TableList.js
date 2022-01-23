import React from 'react'
import { Trash } from 'react-feather'
import { useGlobal } from '../context'
import { deleteVehicle } from '../service'
import { iDate } from '../ultil'

export default function TableList() {
    const { listVehicle, deleteVehicle: deleteVehicleList, amountCar, amountMoto } = useGlobal()
    const handleDelte = async (idCard) => {
        await deleteVehicleList(idCard)
        await deleteVehicle(idCard)
    }
    return (
        <div className="table-list">
            <span>total cars: {amountCar}</span>
            <br />
            <span>total motorbikes: {amountMoto}</span>
            <table className="table table-bordered  table-striped">
                <thead>
                    <tr>
                        <th scope="col" className=" text-center">ID Card</th>
                        <th scope="col" className="  text-center">License plates</th>
                        <th scope="col" className="  text-center">Type</th>
                        <th scope="col" className="  text-center">Time in</th>
                        <th scope="col" className="  text-center">Time out</th>
                        <th scope="col" className="  text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(listVehicle || []).map((item, index) => {
                        return <tr key={index}>
                            <td className="text-center">{item?.idCard}</td>
                            <td className="text-center">{item?.number}</td>
                            <td className="text-center">{item?.type}</td>
                            <td className="text-center">{item?.time_in}</td>
                            <td className="text-center">{item?.time_out}</td>
                            <td className="text-center"><Trash color="red" onClick={() => handleDelte(item?.idCard)} /></td>

                        </tr>
                    })}

                </tbody>
            </table>
        </div>

    )
}
//   idCard: getVehicle[0],
// number: getVehicle[1],
// type: getVehicle[2],
// time_in: getVehicle[3]?.replace(`/2022`, '')