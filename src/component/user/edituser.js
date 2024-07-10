import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import "../../css/style.css";

export default function EditUser({ data, editdata }) {


    const [username, setusername] = useState(data.username);
    const [firstname, setfirstname] = useState(data.firstname);
    const [lastname, setlastname] = useState(data.lastname);
    const [phone, setphone] = useState(data.phone);
    const [image, setimage] = useState(null);
    const [images, setimages] = useState(null);

    const valuefirtsname = async (e) => {
        try {
            e.preventDefault();

            const formdata = new FormData();

            formdata.append("username", username);
            formdata.append("password", '');
            formdata.append("firstname", firstname);
            formdata.append("lastname", lastname);
            formdata.append("image", image);
            formdata.append("phone", phone);
            
            const token = localStorage.getItem("token");
            const datass = await axios.put(`http://127.0.0.1:3001/user/updateuser/${data._id}`, formdata);
            if (datass.status == 200) {
                editdata({ data: {}, isedits: false }, e);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateimage = (e) => {
        try {
            const file = e.target.files[0];
            const renderimg = new FileReader();

            renderimg.onload = () => {
                setimage(file);
                setimages(renderimg.result);
            }
            renderimg.readAsDataURL(file);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

    }, [])


    return (
        <div className="w-40 pb-5 pt-3 position bg-white border-radius-3-px ">
            <div className="d-flex flex-direction-column px-3">
                <span className="font-14-px m-auto">ແກ້ໄຂຂໍ້ມູນພະນັກງານ </span>

                <img src={images != null ? images : `http://127.0.0.1:3001/image/post/noimage.jpg`} className="w-100-px h-100-px border-radius-50 m-auto" />
                <label for="image" className="w-100-px h-30-px font-14-px bg-blue-01 text-white d-flex align-items-center justify-content-center border-radius-3-px" > ເລືອກຮູບ </label>
                <input id="image" type="file" onChange={updateimage} />
                <span className="font-14-px mt-2"> ຊື່ເຂົ້າໃຊ້ລະບົບ  </span>
                <input type="text" className="py-1 " value={username} onChange={(e) => setusername(e.target.value)} />

                <span className="font-14-px mt-2"  > ຊື່ລົງທະບຽນ  </span>
                <input type="text" className="py-1 " value={firstname} onChange={(e) => setfirstname(e.target.value)} />

                <span className="font-14-px mt-2"> ນາມສະກຸນ  </span>
                <input type="text" className="py-1 " value={lastname} onChange={(e) => setlastname(e.target.value)} />

                <span className="font-14-px mt-2"> ເບີໂທ </span>
                <input type="text" className="py-1 " value={phone} onChange={(e) => setphone(e.target.value)} />

                <button onClick={(e) => valuefirtsname(e)} className="mt-3 py-2 border-radius-3-px bg-blue-01 text-white cursor-pointer"> ແກ້ໄຂຂໍ້ມູນພະນັກງານ  </button>

                <button onClick={(e) => editdata({ data: {}, isedits: false }, e)} className="mt-3 py-2 border-radius-3-px bg-blue-01 text-white cursor-pointer"> ຍົກເລີກ  </button>



            </div>


        </div>

    )
}