import * as React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/product.css";

export default function EditProducts({ datas, editdata }) {

    const [name, setname] = useState(null)
    const [values, setvalues] = useState(datas)

    const [imageedit, setimageedit] = useState(null);
    const [imageurledit, setimageurledit] = useState(null);

    async function onedit(e) {
        try {


            const formdata = new FormData();
            formdata.append("nameProduct", values.nameProduct);
            formdata.append("productnumber", values.productnumber);
            formdata.append("image", imageedit);

            const datas = await axios.put(`http://147.182.204.175:3001/product/updateproduct/${values._id}`, formdata);
            if (datas.status == 200) {
                console.log(datas.data)
                editdata({ isedit: false, datas: null }, e)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const editvalue = (e) => {
        try {
            const { name, value } = e.target;
            const data = { ...values };
            data[name] = value;
            setvalues(data)
        } catch (error) {

        }
    }

    const uploadimage = (e) => {
        const file = e.target.files[0];
        const renderIMG = new FileReader();
        renderIMG.onload = () => {
            setimageedit(file);
            setimageurledit(renderIMG.result);
        }
        renderIMG.readAsDataURL(file);
    }

    useEffect(() => {


    }, [name])
    return (
        <>

            <div className="w-350-px bg-blue pb-7 pt-5 border-radius-3-px">

                <div className="text-center position-relative w-100-px m-auto">
                    <img src={imageurledit == null ? `http://147.182.204.175:3001/image/post/${values.image}` : imageurledit != null ? imageurledit : `http://147.182.204.175:3001/image/post/${values.image}`} className="w-100-px h-100-px border-radius-50" />
                    <label for="imagess" className="w-100-px h-100-px border-radius-50 position-absolute top-0 left-0">  </label>
                    <input type="file" id="imagess" onChange={uploadimage} />
                </div>
                <div className="d-flex flex-direction-column px-4">
                    <span className="mt-1 font-14-px"> ຊື່ສິນຄ້າ</span>
                    <input type="text" className="py-1" name="nameProduct" value={values.nameProduct} onChange={editvalue} onCompleted="off" />

                    <span className="mt-1 font-14-px"> ລະຫັດສິນຄ້າ </span>
                    <input type="text" className="py-1" name="productnumber" value={values.productnumber} onChange={editvalue} onCompleted="off" />

                    <button className="mt-3 py-1 cursor-pointer" onClick={(e) => onedit(e)}> ແກ້ໄຂ </button>
                    <button className="mt-3 py-1 cursor-pointer" onClick={(e) => editdata({ isedit: false, datas: null }, e)}> ຍົກເລີກ </button>
                </div>


            </div>



        </>

    )


}