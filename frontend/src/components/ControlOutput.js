import { Button, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { Check, X } from 'react-feather'
import { useGlobal } from '../context'
import { deleteVehicle, detectCarOut, getInforCarOut, getInforUser } from '../service'
import { generateRandomIntegerInRange, getFileFromDataUrl, getScreenshot, toggleVideo } from '../ultil'







export default function ControlOutput() {

    const [selectedImage, setSelectedImage] = useState();
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
        try {
            document.getElementById('file2').value = ""
        }
        catch (err) {

        }
    };



    const [state, setState] = useState(0)  // 0 là chưa nhập cardid, 1 là đã có thông tin cardid, 2 là đã checking
    const [loading, setLoading] = useState(false)
    const [bienso, setBienso] = useState("")
    const [idCard, setIdCard] = useState("")
    const [type, setType] = useState(2)
    const { deleteVehicle: deleteVehicleList } = useGlobal()
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState(false)
    const [info, setInfo] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const hadleCloseModal = () => {
        setShowModal(false)
    }


    const reset = () => {
        setInfo(null)
        setIdCard("")
        setErr("")
        setSuccess(false)
    }
    const detectNumber = async () => {
        try {
            
            // let imageDetect = await getScreenshot('video-out');
            let imageDetect = selectedImage
            setLoading(true)
            let bienso = await detectCarOut({ params: { idCard, type }, body: { image: imageDetect } })
            console.log(`bienso`, typeof bienso)
            setErr("")
            setSuccess(false)

            if (bienso === false) {
                setErr("Biển số không khớp")
            }
            else if (bienso == null) {
                setErr("Không thể nhận diện biển số")
            }
            else if (bienso) {
                setSuccess(true)
            }





        }
        catch (e) {
            setState(0)
        }
        setLoading(false)

    }

    const passNumber = async () => {
        deleteVehicleList(idCard);
        // await deleteVehicle(idCard)

        // let newVeheicle = {
        //     number: bienso?.number,
        //     time_in: new Date(),
        //     imageIn: bienso?.image
        // }
        // setListVehicle(x => [...x, newVeheicle])
        // setState(0)
        // reset()

    }

    const ignoreNumber = async () => {
        setSuccess(false);
        removeSelectedImage()
    }

    const searchInforCard = async () => {
        setErr("")
        setSuccess(false)
        if (!idCard) return;
        let inforCard = await getInforCarOut(idCard)
        if (inforCard) {
            let checkUserInfo = await getInforUser(idCard)
            if (checkUserInfo) inforCard.push("monthly ticket")
            else inforCard.push("daily tiket")
        }
        setInfo(inforCard)
    }

    const clearInfor = () => {
        reset()
        // setInfo(null)
    }
    return (
        <>
            <div className="camera-block">
                {/* <video id="video-out" width="100%" height="100%" controls crossOrigin="anonymous">
                    <source src="output.mp4" type="video/mp4" />
                    Your browser does not support HTML video.
                </video> */}

                <div className="camera-block">
                    {/* <video id="video" width="100%" height="100%" controls crossOrigin="anonymous">
                <source src="input.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video> */}

                    <>
                        <div>
                            <div className="d-flex justify-content-between">
                            <button className="btn btn-info btn-sm"><label style={{whiteSpace: 'nowrap'}} for="file2" id="lable_file">Select file</label></button>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={imageChange}
                                id="file2"
                                style={{visibility: 'hidden'}}
                                
                            />
                            <button className="btn btn-danger  btn-sm" onClick={removeSelectedImage}>
                                Remove
                            </button>
                            </div>


                            {selectedImage && (
                                <div >
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        width="100%"
                                        height="100%"
                                        alt="Thumb"
                                    />

                                </div>
                            )}
                        </div>
                    </>
                </div>
            </div>
            <div>
                <div className="info-model p-2">
                    {true
                        && <div>
                            <div className="input-car-in form-group">
                                <input type="text" value="" className="form-control" id="idCard" placeholder="idcard" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                                <button onClick={() => searchInforCard()} className="bra10">search</button>
                                <button onClick={() => clearInfor()} className="mx-1 bra10">clear</button>
                            </div>
                            <div className="infor-card">
                                {
                                    info && info?.length > 0
                                    && <>
                                        <table className="table-bordered table-info-car-out ">
                                            <tr>
                                                <td>License plates</td>
                                                <td>{info[1]}</td>
                                            </tr>
                                            <tr>
                                                <td>Type</td>
                                                <td>{info[2]}</td>
                                            </tr>
                                            <tr>
                                                <td >Time in </td>
                                                <td className="text-center"><span style={{ fontSize: 14 }}>{info[3]?.replace(`/2022`, '')}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Ticket</td>
                                                <td>{info[5]}</td>
                                            </tr>

                                            <tr>
                                                <td>Image car in</td>
                                                <td>
                                                    <div className="detail-car-out">
                                                        <span className="mb-0 cursor-pointer text-underline">detail</span>
                                                        <div className="tooltip-image">
                                                            <img alt="ảnh xe ra" src={`http://localhost:8000/account/getImageCarIn?idCard=${info[0]}`} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        {/* <p>biển số: {info[1]}</p>
                                    <p>loại xe: {info[2]}</p>
                                    <p className="text-small">thời gian vào: <span style={{ fontSize: 14 }}>{info[3]}</span></p>
                                    <p>loại vé: {info[5]}</p> */}
                                        {/* <div className="detail-car-out">
                                        <p className="mb-0 cursor-pointer text-underline">ảnh xe vào</p>
                                        <div className="tooltip-image">
                                            <img alt="ảnh xe ra" src="http://localhost:8000/account/getImageCarIn?idCard=10590" />
                                        </div>
                                    </div> */}
                                    </>
                                }
                            </div>
                            {loading &&
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                    </div>
                                </div>
                            }
                            {err && !loading && <p className="text-danger">{err}</p>}
                            {success && !loading &&
                                <>
                                    <p className="text-success mb-0">Verified license plates!</p>

                                    <div className="decision d-flex justify-content-center mb-3">
                                        {(idCard && type) ?
                                            <div className="button-decision mx-2">
                                                <Check color="green" onClick={passNumber} />
                                            </div>
                                            :
                                            <div className="button-decision mx-2">
                                                <Check color="green" color="gray" className="disable-button" />
                                            </div>}

                                        <div className="button-decision  mx-2">
                                            <X color="red" onClick={ignoreNumber} />
                                        </div>

                                    </div>
                                </>
                            }


                        </div>
                    }


                </div>
                <div className="menu-button mx-4 d-flex justify-content-center">
                    {(info && selectedImage )?<button onClick={() => detectNumber()} className="btn btn-primary mx-1">Detect_out</button>
                    :<button className="btn mx-1 disable-button" style={{ background: "gray" }}>Detect_out</button>}
                    <button onClick={()=>{reset();removeSelectedImage() }} className="btn btn-primary mx-1">Reset</button>
                </div>



            </div>
        </>
    )
}
