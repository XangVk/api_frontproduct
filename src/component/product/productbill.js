import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Productbill({ data, btnbills }) {


    const amounts = () => {

        try {

            return data.reduce((acc, current) => Number(acc) + (current.quantity * Number(current.amount)), 0)

        } catch (error) {
            console.log(error)
        }
    }

    const number = ({ nums }) => {
        try {

            const num = new Intl.NumberFormat();

            return num.format(nums);

        } catch (error) {

        }


    }

    return (
        <>
            <div className="w-400-px border-1-solid-default bg-white border-radius-3-px px-2 pb-5 position-relative z-index-5">

                <div className="text-center mt-2">
                    <span className="font-12-px"> ໃບບິນສິນຄ້າ </span>
                </div>
                <div className="d-flex justify-content-between px-3 border-bottom-1-solid mt-3 mb-2">
                    <span className="font-12-px w-33 text-start"> ຊື່ສິນຄ້າ </span>
                    <span className="font-12-px w-33 text-center"> ຈຳນວນສິນຄ້າ </span>
                    <span className="font-12-px w-33 text-end"> ລາຄາສິນຄ້າ </span>
                </div>
                <div className="">

                    {data.length > 0 && data.map((item, index) =>
                        <div className="w-100 d-flex justify-content-between py-1">

                            <span className=" w-33 font-12-px text-overflow-ellipsis overflow-hidden w-130-px   min-width-116-px white-space-nowrap">  {item.nameProduct}  </span>
                            <span className=" w-33 text-center font-12-px text-overflow-ellipsis overflow-hidden">  {number({ nums: item.quantity })}  </span>
                            <span className=" w-33 text-end font-12-px text-overflow-ellipsis overflow-hidden">  {number({ nums: item.amount })}  </span>
                        </div>



                    )}

                </div>
                <div className="d-flex justify-content-end border-top-1-solid py-2">
                    <span className="font-12-px w-33 text-end"> ລວມລາຄາ :  {number({ nums: amounts() })}</span>
                </div>
                <div className="bg-white h-50 mt-5">

                    <button className="w-100 font-14-px bg-btn text-white" onClick={(e) => btnbills({ e: e, status: false })}> ປິດ </button>

                </div>
            </div>


        </>
    )

}