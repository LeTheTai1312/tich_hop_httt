import React, { useState } from 'react'
import { Check, X } from 'react-feather'
import { useGlobal } from '../context'
import { deleteVehicle, detectCarIn, detectCarOut, getInforCarOut } from '../service'
import { generateRandomIntegerInRange, getFileFromDataUrl, getScreenshot, toggleVideo } from '../ultil'







export default function ControlInput() {

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
            document.getElementById('file1').value = ""
        }
        catch(err){
            
        }
    };



    const [state, setState] = useState(0)  // 0 là chưa hoạt động, 1 là checking, 3 là show lỗi
    const [bienso, setBienso] = useState("")
    const [idCard, setIdCard] = useState(generateRandomIntegerInRange(10000, 99999))
    const [type, setType] = useState(2)
    const { setListVehicle } = useGlobal()
    const [err, setErr] = useState("")

    const reset = () => {
        setBienso("")
        setIdCard(generateRandomIntegerInRange(10000, 99999))
        setType(2)
        setErr("")
        setState(0)
        removeSelectedImage()
    }
    const detectNumber = async () => {
        try {
            setState(1)
            // let imageDetect = await getScreenshot('video');
            let imageDetect = selectedImage

            let bienso = await detectCarIn({ params: { idCard, type }, body: { image: imageDetect } })
            if (bienso) {
                setBienso(bienso);
                setState(2) // show bien so
            }
            else {
                setErr("Không thể nhận diện biển số")
                setState(3)
            }




        }
        catch (e) {
            setState(0)
        }

    }

    const passNumber = async () => {
        let getVehicle = await getInforCarOut(idCard)
        console.log('getVehicle', getVehicle);
        let newVeheicle = {}
        if (getVehicle) {
            newVeheicle = {
                idCard: getVehicle[0],
                number: getVehicle[1],
                type: getVehicle[2],
                time_in: getVehicle[3]?.replace(`/2022`, '')
            }
        }

        setListVehicle(x => [...x, newVeheicle])
        setState(0)
        reset()

    }

    const ignoreNumber = async () => {
        try {
            let imageDetect = await getScreenshot('video');
            await detectCarOut({ params: { idCard, type }, body: { image: imageDetect } })
            await deleteVehicle(idCard)
        }
        catch (e) {

        }
        setState(0);
        reset()
    }
    return (
        <>
            <div className="camera-block">
                {/* <video id="video" width="100%" height="100%" controls crossOrigin="anonymous">
                <source src="input.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video> */}

                <>
                    <div>
                        <div className="d-flex justify-content-between">
                          
                            <button className="btn btn-info btn-sm"><label style={{whiteSpace: 'nowrap'}} for="file1" id="lable_file">Select file</label></button>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={imageChange}
                                id="file1"
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


            <div>
                <div className="info-model d-flex justify-content-center align-items-center">
                    {state === 2
                        && <div>
                            <div className="text-number text-center">
                                {bienso}
                            </div>


                            <div className="decision d-flex justify-content-center mt-2">
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
                        </div>
                    }

                    {state === 1
                        &&
                        <div>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                </div>
                            </div>

                        </div>
                    }

                    {state === 0
                        &&
                        // <div>
                        //     <div class="d-flex justify-content-center">
                        //         <div>Khung hiển thị kết quả</div>
                        //     </div>
                        // </div>

                        <div className="input-car-in form-group">
                            <label htmlFor="idCard">Id Card</label>
                            <input type="text" value="" className="form-control" id="idCard" placeholder="idcard" value={idCard} onChange={(e) => setIdCard(e.target.value)} />

                            <label htmlFor="type">type</label>
                            <select className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                {/* <option value="">Chọn loại xe</option> */}
                                <option value="2"  >Motobike</option>
                                <option value="1">Car</option>
                            </select>
                        </div>
                    }

                    {state === 3
                        &&
                        <div>
                            <div className="d-flex justify-content-center">
                                <div>{err}</div>
                            </div>

                        </div>
                    }


                </div>
                <div className="menu-button mx-4 d-flex justify-content-center">
                    {(state === 0 && selectedImage) ? <button onClick={() => detectNumber()} className="btn btn-primary mx-1">Detect_In</button>
                        : <button className="btn mx-1 disable-button" style={{ background: "gray" }}>Detect_In</button>}
                    <button onClick={reset} className="btn btn-primary mx-1">Reset</button>
                </div>
            </div>
        </>

    )
}
