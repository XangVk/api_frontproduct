import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../../css/style.css";
import { jwtDecode } from "jwt-decode";
export default function Login() {


    const [username, setusername] = useState("admin");
    const [password, setpassword] = useState("admin");

    async function onlogin() {

        try {
            const data = {
                "username": username,
                "password": password
            }
            const datas = await axios.post("http://164.92.98.3:3001/user/login", data);
            console.log(datas.data);
            if (datas.status == 200) {

                localStorage.setItem("token", datas.data);
                const decode = jwtDecode(datas.data);
                if (decode !== null) {
                    localStorage.setItem("usernameId", decode._id);
                    localStorage.setItem("username", decode.username);
                    localStorage.setItem("names", decode.firstname);
                    
                }
                console.log(datas)
                document.location.href = "/"
                document.location.reload();
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="w-100 h-100-vh bg-blue">
            <div className="w-100 text-center pt-5">
                <span className="font-14-px"> ລົງຊື່ເຂົ້າໃຊ້ລະບົບ </span>
            </div>
            <div className="w-50 d-flex flex-direction-column m-auto ">
                <span className="font-14-px"> ຊື່ຜູ້ໃຊ້ລະບົບ </span>
                <input type="text" className="py-1 border-radius-3-px" value={username} onChange={(e) => setusername(e.target.value)} readOnly={ true} />
                <span className="font-14-px mt-1"> ລະຫັດຜ່ານ </span>
                <input type="text" className="py-1 border-radius-3-px" value={password} onChange={(e) => setpassword(e.target.value)} readOnly={ true} />
                <button className="h-35-px w-100 mt-3 " onClick={onlogin}> ລົງຊື່ເຂົ້າໃຊ້ </button>
                <div className="text-center pt-3">
                    <span className="text-white font-14-px"> ລືມລະຫັດຜ່ານ </span>

                </div>

            </div>

        </div>
    )

}