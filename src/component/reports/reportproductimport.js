import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../css/style.css";
import "../../css/prints.css";

export default function ReportProductimport() {


    const [productimport, setproductimport] = useState([]);

    const [amounts, setamount] = useState(0);
    const [keys, setkeys] = useState(null);
    const [dateStart, setdateStart] = useState(null);
    const [dateEnd, setdateEnd] = useState(null);
    const [issearch, setissearch] = useState(true);

    async function getproductimport() {

        try {

            const key = { key: keys };
            const token = localStorage.getItem("token");

            const data = await axios.get("http://164.92.69.177:3001/productimport/getproductimport", { params: key, headers: { Authorization: token } });
            if (data.status == 200) {

                setproductimport(data.data);
                let newamount = 0;
                productimport.forEach((item) => {
                    newamount += parseInt(item.quantity) + parseInt(item.price);
                    console.log(newamount)
                })
                setamount(newamount);
            }

        } catch (error) {
            console.log(error)
        }
    }
    async function getproductimportbydate() {
        try {


            const date = { dateStart: dateStart, dateEnd: dateEnd };

            const token = localStorage.getItem("token");
            const data = await axios.get("http://164.92.69.177:3001/productimport/getproductimportbydate", { params: date, headers: { Authorization: token } });
            console.log(data.data)
            if (data.status == 200) {
                setproductimport(data.data);
                let newamount = 0;
                productimport.forEach((item) => {
                    newamount += parseInt(item.quantity) * parseInt(item.price);
                })
                setamount(newamount);
            }

        } catch (error) {
            console.log(error)
        }

    }


    const totals = ({ quantity, price }) => {
        try {

            const total = parseInt(quantity) * parseInt(price);

            return total;
        } catch (error) {

        }
    }
    const newamounts = () => {
        try {

            return productimport.reduce((acc, current) => Number(acc) + (current.quantity * Number(current.price)), 0);

        } catch (error) {

        }
    }

    const print = () => {
        try {

            const contentprint = document.querySelector(".container-print").innerHTML;




            const originhtml = contentprint;
            document.body.innerHTML = contentprint;
            window.print();
            document.body.innerHTML = originhtml;
            window.location.reload();

        } catch (error) {
            console.log(error)
        }


    }


    useEffect(() => {

        getproductimport();



    }, [])


    return (

        <>
            <div className="w-100 ">
                <div className="w-100 text-center pt-5">
                    <span className="font-16-px font-weight-bold"> ລາຍງານສິນຄ້ານຳເຂົ້າ</span>
                </div>
                <div className="w-100 px-3">
                    <span> ລາຍງານສິນຄ້ານຳເຂົ້າທັງໝົດ </span>
                </div>
                <div className="px-3 d-flex justify-content-between ">
                    <div className="btn-print">

                        <button onClick={() => setissearch(true)} className="py-1 bg-blue-01 text-white border-radius-3-px cursor-pointer"> ຄົ້ນຫາຈາກຊື່ສິນຄ້າ </button>
                        <button onClick={() => setissearch(false)} className="py-1 bg-blue-01 text-white border-radius-3-px ml-2 cursor-pointer"> ຄົ້ນຫາຈາກວັນທີນຳເຂົ້າ </button>
                        <button onClick={print} className="py-1 bg-blue-01 text-white border-radius-3-px ml-2 cursor-pointer font-14-px"> ພິມ export </button>

                    </div>
                    <div className="d-flex align-items-center">

                        {
                            issearch ? <div>
                                <input type="text" onChange={(e) => setkeys(e.target.value)} onKeyUp={(e) => {
                                    console.log(e.target.value);
                                    getproductimport();
                                }} className="py-1 w-200-px" />
                                <button onClick={getproductimport} className="py-1 bg-blue-01 text-white border-radius-3-px ml-2 cursor-pointer"> ຄົ້ນຫາ </button>

                            </div> :
                                <div className="d-flex align-items-center">
                                    <span className="mr-1 font-14-px"> ເລີ່ມວັນທີ </span> <input type="date" onChange={(e) => setdateStart(e.target.value)} /> <span className="mx-1 font-14-px"> ຫາ</span> <input type="date" onChange={(e) => setdateEnd(e.target.value)} /> <button onClick={getproductimportbydate} className="py-1 bg-blue-01 text-white ml-2">  ຄົ້ນຫາ </button>

                                </div>
                        }

                    </div>

                </div>
                <div className=" px-3 container-print">
                    <div className="w-100 text-center">
                        <span> ລາຍງານສິນຄ້ານຳເຂົ້າ </span>
                    </div>
                    <table className="w-100 tableprint">
                        <thead>
                            <tr>

                                <th className="no_"> ລຳດັບ </th>
                                <th className=""> ຊື່ສິນຄ້າ </th>
                                <th className=""> ຈຳນວນ </th>
                                <th>  ສິນຄ້າທີ່ຂາຍ   </th>


                                <th className=""> ລວມລາຄາ </th>
                                <th className=""> ສະຖານະສິນຄ້າ </th>
                                <th> ວັນທີນຳເຂົ້າ </th>
                                <th className=""> ລາຄາສິນຄ້າ </th>


                            </tr>
                        </thead>
                        <tbody>
                            {productimport.length > 0 && productimport.map((item, index) =>
                                <tr key={index}>
                                    <td> {index + 1}</td>
                                    <td>{item.nameProduct}</td>
                                    <td> {item.quantity} </td>
                                    <td> {item.quantitysell} </td>
                                    <td>{item.price}</td>
                                    <td> {totals({ quantity: item.quantity, price: item.price })} </td>
                                    <td> {item.dateimport.slice(0, 10)} </td>
                                    <td>{item.productstatus == false ? "ສິນຄ້າໝົດ" : "ສິນຄ້າຍັງ"}</td>

                                </tr>


                            )}


                        </tbody>

                    </table>
                    <div className="d-flex align-items-center  justify-content-end border-column">
                        <span className="font-14-px"> ລວມຈຳນວນທັງໝົດ :  </span>
                        <span className="mr-3 font-14-px">{newamounts()}</span>
                    </div>
                </div>

            </div>



        </>
    )
}