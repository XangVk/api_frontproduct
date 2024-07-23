import * as React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Mainpage({ mains }) {


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("usernameId");
        localStorage.removeItem("names");
        window.location.reload();
    }

    return (
        <>
            <div className="w-100 h-100-vh  d-flex flex-direction-column ">
                <div className="d-flex justify-content-between px-4 py-2 bg-default">
                    <div>
                        <img src="http://164.92.69.177:3001/image/post/logo_2.png" className="h-50-px" />
                    </div>

                    <div className=" d-flex align-items-center cursor-pointer ">
                        <span className="font-20-px text-white " onClick={logout}> ອອກຈາກລະບົບ </span>
                    </div>
                </div>
                <div className="w-100 d-flex align-items-center h-100">

                    <div className="w-50 d-flex  justify-content-center m-auto justify-content-evenly">
                        <div className=" icon-page" onClick={() => mains({ mains: true })}>
                            <img src="http://164.92.69.177:3001/image/post/logo_store.png" className="w-150-px bg-page-icon border-radius-20-px cursor-pointer " />
                        </div>
                        <div className="icon-page" onClick={() => mains({ mains: true })}>
                            <img src="http://164.92.69.177:3001/image/post/logo_stock.png" className="w-150-px bg-page-icon border-radius-20-px cursor-pointer" />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}