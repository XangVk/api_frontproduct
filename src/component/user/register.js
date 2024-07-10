import * as React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import "../../css/register.css";

import Edituser from "../../component/user/edituser";

export default function Register() {


    const [username, setusername] = useState(null);
    const [password, setpasword] = useState(null);
    const [firstname, setfirstname] = useState(null);
    const [lastname, setlastname] = useState(null);
    const [phone, setphone] = useState(null);

    const [images, setimages] = useState(null);
    const [imageurls, setimageurls] = useState(null);
    const [isedit, setisedit] = useState(false);
    const [dataedit, setdataedit] = useState(null);

    const [user, setuser] = useState([]);
    async function onregister() {
        try {
            // const data = {
            //     "username": username,
            //     "password": password,
            //     "firstname": firstname,
            //     "lastname": lastname,
            //     "phone": phone,
            //     "image": images
            // }
            const formdata = new FormData()

            formdata.append("username", username);
            formdata.append("password", password);
            formdata.append("firstname", firstname);
            formdata.append("lastname", lastname);
            formdata.append("phone", phone);
            formdata.append("image", images);

            const user = await axios.post("http://64.92.98.3:3001/user/createuser", formdata);
            if (user.status === 200) {
                console.log(user.data);
                cleardata();
                getuser();
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getuser() {
        try {

            const data = await axios.get("http://64.92.98.3:3001/user/getuser");
            if (data.status == 200) {

                setuser(data.data);
                console.log(data.data);
            }
        } catch (error) {
            console.log(error);
        }

    }
    async function deleteuser(id) {
        try {
            const data = await axios.delete(`http://64.92.98.3:3001/user/deleteuser/${id}`);
            if (data.status == 200) {
                getuser();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onchangimage = (e) => {
        const file = e.target.files[0];
        const renderimg = new FileReader();

        renderimg.onload = () => {
            setimages(file);
            setimageurls(renderimg.result);
        }
        renderimg.readAsDataURL(file);
    }

    const editdata = ({ data, isedits }, e) => {
        e.preventDefault();
        setisedit(isedits);
        setdataedit(data);
        console.log(data);
        console.log(isedits);
    }


    const cleardata = () => {
        setusername('');
        setpasword('');
        setfirstname('');
        setlastname('');
        setphone('');
    }


    useEffect(() => {
        getuser()
    }
        , [])



    return (
        <div className="w-100 h-100 position-relative">

            <div className="w-35 pt-17-px  text-center">
                <span className="font-20-px font-weight-bold">  ບັນທືຶກຂໍ້ມູນພະນັກງານ  </span>
            </div>
            <div className="w-100 d-flex ">
                <div className="w-40  h-95-vh px-3 d-flex ">

                    <div className="h-100 w-50  d-flex flex-direction-column px-3">
                        <span className="font-14-px"> ຊື່ເຂົ້າໃຊ້ລະບົບ </span>
                        <input type="text" className="font-18-px py-1 border-radius-3-px" value={username} onCompleted="off" onChange={(e) => setusername(e.target.value)} />
                        <span className="pt-1 font-14-px"> ລະຫັດຜ່ານ </span>
                        <input type="text" className="font-18-px py-1 border-radius-3-px" value={password} onCompleted="off" onChange={(e) => setpasword(e.target.value)} />
                        <span className="pt-1 font-14-px"> ຊື່ລົງທະບຽນ </span>
                        <input type="text" className="font-18-px py-1 border-radius-3-px" value={firstname} onCompleted="off" onChange={(e) => setfirstname(e.target.value)} />
                        <span className="pt-1 font-14-px"> ນາມສະກຸນ  </span>
                        <input type="text" className="font-18-px py-1 border-radius-3-px" value={lastname} onCompleted="off" onChange={(e) => setlastname(e.target.value)} />
                        <span className="pt-1 font-14-px"> ເບີໂທ </span>
                        <input type="text" className="font-18-px py-1 border-radius-3-px" value={phone} onCompleted="off" onChange={(e) => setphone(e.target.value)} />

                        <button className="mt-2 py-2 cursor-pointer bg-btn text-white border-radius-3-px bg-none" onClick={onregister}> ລົງທະບຽນ </button>
                        <button className="mt-2 py-2 cursor-pointer bg-gray-default-1 text-white  border-radius-3-px bg-none" onClick={cleardata}> ຍົກເລີກ </button>
                    </div>
                    <div className="w-40  px-3 d-flex flex-direction-column ">
                        <span className="font-14-px"> ເລືອກຮູບ </span>
                        <div className="w-100 d-flex flex-direction-column ">
                            <img src={`${imageurls == null ? `http://64.92.98.3:3001/image/posts/` : imageurls}`} className="w-100 border-1-solid-default h-150-px border-radius-3-px max-width-180-px" />
                            <label for="imageshows" className="w-100 border-1-solid-default h-40-px d-flex justify-content-center align-items-center mt-2 border-radius-3-px bg-btn-picture text-white max-width-180-px font-14-px" > ເລືອກຮູບ </label>
                            <input id="imageshows" type="file" onChange={onchangimage} />
                        </div>
                    </div>



                </div>
                <div className="w-55  px-3 h-500-px overflow-y-scroll" >
                    <table className="w-100 tables">
                        <thead>
                            <tr>
                                <th> ຮູບພະນັກງານ </th>
                                <th> ຊື່ເຂົ້າລະບົບ</th>
                                <th>ຊື່ລົງທະບຽນ</th>
                                <th>ນາມສະກຸນ</th>
                                <th>ເບີໂທ</th>
                                <th>ຕົວເລືອກ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user && user.length > 0 && user.map((item, index) =>
                                    <tr key={index}>
                                        <td> <img src={item.image != "false" ? `http://64.92.98.3:3001/image/post/${item.image}` : `http://64.92.98.3:3001/image/post/noimage.jpg`} className="w-30-px h-30-px border-radius-50" /> </td>
                                        <td >{item.username} </td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.phone}</td>
                                        <td className="">
                                            <button className="mr-1 bg-blue text-white border-radius-3-px" onClick={(e) => editdata({ data: item, isedits: true }, e)}> edit </button>
                                            <button className="ml-2 bg-red text-white border-radius-3-px" onClick={() => deleteuser(item._id)}> del </button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>


                    </table>

                </div>


            </div>
            {
                isedit ?
                    <div className="w-100 h-100-vh bg-backdrop position-absolute top-0 left-0 d-flex justify-content-center align-items-center">
                        <Edituser editdata={editdata} data={dataedit} />
                    </div> : ""
            }


        </div>

    )
}
