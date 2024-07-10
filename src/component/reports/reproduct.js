import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


import "../../css/style.css";
import "../../css/prints.css";

import Exportproduct from "../../component/reports/exportproductimport";


export default function ProductReport() {


    const [product, setproduct] = useState([]);
    const [dates, setdate] = useState(null)

    async function getproduct() {
        try {
            const token = localStorage.getItem("token");
            const data = await axios.get("http://64.92.98.3:3001/product/getproduct", { headers: { Authorization: token } })
            console.log(data.data)
            if (data.status == 200) {
                setproduct(data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getproduct();
        date();
    }, [])

    const print = () => {
        try {

            const btnprint = document.querySelector(".print-btn");
            const print = document.querySelector(".print-report");

            // btnprint.addEventListener("click", () => {
            //     btnprint.style.display = 'none';
            //     const contentprint = document.querySelector(".print-report").innerHTML;
            //     const origincotnents = document.body.innerHTML;

            //     document.body.innerHTML = contentprint;
            //     window.print();
            //     document.body.innerHTML = origincotnents;

            // });
            btnprint.style.display = 'none';
            const contentprint = document.querySelector(".print-report").innerHTML;
            const origincotnents = document.body.innerHTML;
            document.body.innerHTML = contentprint;

            window.print();
            document.body.innerHTML = origincotnents;
            window.location.reload();
        } catch (error) {

        }
    }
    const date = () => {
        try {

            const dates = new Date().getDate().toString().length == 1 ? "0" + new Date().getDate().toString() : new Date().getDate().toString();

            const month = new Date().getMonth() ? (new Date().getMonth() + 1).toString().length == 1 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth().toString() + 1) : (new Date().getMonth().toString() + 1);

            const year = new Date().getFullYear().toString().length == 1 ? "0" + new Date().getFullYear().toString() : new Date().getFullYear().toString();
            const datetime = dates + "/" + month + "/" + year
            setdate(datetime)
            // return datetime;
        } catch (error) {
            console.log(error)
        }
    }
 const numbers = ({number}) => {
try {
  var nf = new Intl.NumberFormat();
  return nf.format(number);

} catch (error) {
    
}

 }


    return (
        <>
            <div className="w-100 h-100-vh bg-white pt-6 overflow-y-scroll pb-10">
                <div className="d-flex">
                    <button className="ml-10 print-btn bg-btn text-white mr-2" onClick={print}> print </button>
                    <Exportproduct data={product} />

                </div>
                <div className="print-report">
                    <div className="w-100 text-center ">
                        <span className="font-20-px font-weight-700 "> ລາຍງານສິນຄ້າ </span>
                    </div>
                    <div className="d-flex flex-direction-column pl-7 pr-3">
                        <span className="font-14-px"> ລາຍງານສິນຄ້າທັງໝົດ  </span>
                        <span className="font-14-px"> ວັນທີ : {dates} </span>
                    </div>
                    <div className="w-95 d-flex justify-content-center  m-auto">
                        <div className="w-100 d-flex flex-direction-column">
                            <table className="tableprint w-100">
                                <thead>

                                    <tr>
                                        <th className="no_ bg-gray" >ລຳດັບ</th>
                                        <th>ຊື່ສິນຄ້າ</th>
                                        <th>ຈຳນວນ</th>
                                        <th>ລາຄາສິນຄ້າ</th>
                                        <th>ລວມລາຄາ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.length > 0 && product.map((item, index) =>
                                        <tr key={index}>
                                            <td> {index + 1}</td>
                                            <td>{item.nameProduct}</td>
                                            <td>{numbers({number :item.quantity})}</td>
                                            <td>{item.amount}</td>
                                            <td> { item.amount} </td>
                                        </tr>

                                    )}
                                </tbody>
                            </table>
                            <div className="w-100 d-flex justify-content-end mt-2">
                                <span className="font-14-px"> ລວມຈຳນວນລາຍການ : { product.length}</span>
                            </div>
                            {/* <div className="w-100 d-flex justify-content-end">
                                <span className="font-14-px"> ລວມລາຄາທັງໝົດ : </span>
                            </div> */}


                        </div>

                    </div>
                </div>
            </div>


        </>
    )

}