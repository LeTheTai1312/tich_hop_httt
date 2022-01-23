import React, { useState } from 'react';
import { Trash } from 'react-feather';
import { useGlobal } from '../context';
import { addAccount, deleteAccount } from '../service';
import { generateRandomIntegerInRange, iDate } from '../ultil';

export default function Account() {
  const { listAccount, updateListAccount } = useGlobal()
  const [name, setName] = useState()
  const [IDnumber, setIDnumber] = useState()
  const [month, setMonth] = useState(1)
  const [start, setStart] = useState(new Date())
  const [vehicle, setVehicle] = useState("Motobike")
  console.log('listAccount', listAccount);

  const deleteUser = async (id) => {
    let checkDelete = await deleteAccount(id)
    if (checkDelete) {
      updateListAccount()
    }
  }

  const reset= ()=>{
    setName("")
    setIDnumber(null)
    setMonth(1)
    setStart(new Date())
    setVehicle("Motobike")
  }

  const addUser = async (e)=>{
    e.preventDefault();
    let Id= generateRandomIntegerInRange(10000,99999)
    let startDate = iDate(start, "{f}-{n}-{j}")
    let newUser={
      Id,
      name,
      IDnumber,
      start:startDate,
      month,
      vehicle,
      outOfDate: ""
    }
    let checkAdd = await addAccount(newUser)
    updateListAccount();
  }
  return <div className="account">
    <h1 className="text-center mb-4">User management</h1>
    <div className="row d-flex justify-content-center">
      <div className="col-7">
        <table className="table-acc table table-bordered  table-striped">
          <thead>
            <tr>
              <th scope="col" className=" text-center">ID</th>
              <th scope="col" className="  text-center">Name</th>
              <th scope="col" className="  text-center">ID card</th>
              <th scope="col" className="  text-center">Type</th>
              <th scope="col" className="  text-center">Start</th>
              <th scope="col" className="  text-center">End</th>
              <th scope="col" className="  text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {(listAccount || []).map((item, index) => {
              return <tr key={index}>
                <td className="text-center">{item?.id}</td>
                <td className="text-center">{item?.name}</td>
                <td className="text-center">{item?.IDnumber}</td>
                <td className="text-center">{item?.vehicle}</td>
                <td className="text-center">{item?.start}</td>
                <td className="text-center">{item?.outOfDate}</td>
                <td className="text-center"><Trash color="red" onClick={() => deleteUser(item?.id)} /></td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
      <div className="form-add-acc mx-2 col-4 form-add-user">
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="email" class="form-control" value={name} onChange={(e)=>setName(e.target.value)} id="name" placeholder="Name" />
          </div>

          <div class="form-group">
            <label for="idcard">ID Card</label>
            <input type="email" class="form-control"  value={IDnumber} onChange={(e)=>setIDnumber(e.target.value)}  id="idcard" placeholder="ID Card" />
          </div>

          <div class="form-group">
            <label for="vehicle">Vehicle</label>
            <select className="form-control" id="type"  value={vehicle} onChange={(e)=>setVehicle(e.target.value)}>
              {/* <option value="">Chọn loại xe</option> */}
              <option value="Motobike"  >Motobike</option>
              <option value="Car">Car</option>
            </select>
          </div>

          <div class="form-group">
            <label for="vehicle">Start Date</label>
            <input type="date" class="form-control" value={start} onChange={(e)=>setStart(e.target.value)}  id="vehicle" placeholder="Vehicle" />
          </div>



          <div class="form-group">
            <label for="month">Month</label>
            <input type="number" class="form-control" value={month} onChange={(e)=>setMonth(e.target.value)}  id="month" defaultValue={1} placeholder="month" />
          </div>


          <button type="submit" class="btn btn-primary" onClick={addUser}>Add</button>
        </form>
      </div>
    </div>
  </div>;
}
