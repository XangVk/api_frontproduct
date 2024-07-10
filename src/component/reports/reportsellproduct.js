
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../css/style.css";

export default function Sellproductreport() {

    const [productsell, setproductsell] = useState([])

    const [datestart, setdatestart] = useState(null);
    const [dateend, setdateend] = useState(null);

    async function getproductsell() {
        try {


            const token = localStorage.getItem("token");

            const data = await axios.get("http://147.182.204.175:3001/sellproduct/getsellproduct", { headers: { Authorization: token } });
            if (data.status == 200) {

                setproductsell(data.data);
            }
        } catch (error) {

        }
    }
    async function getproductselldate() {
        try {

            const datesell = { dateStart: datestart, dateEnd: dateend };
            const token = localStorage.getItem("token");

            const data = await axios.get("http://147.182.204.175:3001/sellproduct/getsellproductdate", { params: datesell, headers: { Authorization: token } });
            if (data.status == 200) {

                setproductsell(data.data);
            }
        } catch (error) {

        }
    }
    const totals = ({ quantity, price }) => {
        try {
            const total = parseInt(quantity) * parseInt(price);
            return total;
        } catch (error) {
        }
    }

    const amouns = () => {
        try {
            return productsell.reduce((acc, current) => Number(acc) + (current.quantity * Number(current.amount)), 0)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        getproductsell();
    }, [])
    // print 
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


    return (
        <>
            <div className="w-100 ">
                <div className="d-flex justify-content-end align-items-center pr-3 pt-3">
                    <span className="font-14-px mr-2"> ເລີ່ມວັນທີ </span>
                    <input type="date" onChange={(e) => setdatestart(e.target.value)} /> <span className="px-3 font-14-px">  ຫາ </span>
                    <input type="date" onChange={(e) => setdateend(e.target.value)} />
                    <button className="bg-btn text-white ml-2" onClick={getproductselldate}> ຄົ້ນຫາ </button>
                    <button className="bg-btn text-white ml-2" onClick={print} > ພິມບິນ </button>
                </div>
                <div>


                    <div className="container-print">
                        <div className="text-center w-100 mb-2">
                            <span className="font-14-px"> ລາຍງານການຂາຍສິນຄ້າ </span>
                        </div>
                        <div className="px-3  m-auto ">
                            <table className="w-100 tableprint">
                                <thead>
                                    <tr>
                                        <th> ລຳດັບ </th>
                                        <th> ຊື່ສິນຄ້າ </th>
                                        <th> ຈຳນວນສິນຄ້າ </th>
                                        <th> ລາຄາສິນຄ້າ </th>
                                        <th> ລວມລາຄາ </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {productsell.length > 0 && productsell.map((item, index) =>

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.nameProduct}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.amount}</td>
                                            <td>{totals({ quantity: item.quantity, price: item.amount })}  </td>

                                        </tr>
                                    )}


                                </tbody>

                            </table>

                        </div>
                        <div className="d-flex justify-content-end pt-2 px-3">
                        <span className="font-14-px"> ລວມລາຄາ :</span> &nbsp;
                            <span className="font-14-px">{amouns()} </span>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}