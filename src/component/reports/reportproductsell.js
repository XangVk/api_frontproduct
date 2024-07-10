import * as React from "react";

import { useEffect, useState } from "react";
import axios from "axios";

import "../../css/style.css";
import "../../css/prints.css";
export default function Reportproductsell() {

    const [productsell, setproductsell] = useState([]);
    const [keys, setkeys] = useState(null);
    async function getproductsell() {

        try {
            const keyss = { key: keys };

            const token = localStorage.getItem("token");
            const data = await axios.get("http://127.0.0.1:3001/productsell/getproductsell", { params: keyss, headers: { Authorization: token } });
            if (data.status == 200) {
                setproductsell(data.data);
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

    useEffect(() => {
        getproductsell();


    }, [])
    const print = () => {

        const contenthtml = document.querySelector(".container-print").innerHTML;

        const originhtml = contenthtml;

        document.body.innerHTML = contenthtml;
        window.print();
        document.body.innerHTML = originhtml;
        window.location.reload();
    }

    const numbers = ({ number }) => {
        try {
            const num = new Intl.NumberFormat();

            return num.format(number);


        } catch (error) {

        }

    }

    return (
        <>
            <div className="w-100 h-93-vh overflow-y-scroll">
                <div className="d-flex justify-content-end pt-3 pr-3 align-items-center">
                    <span className="font-14-px mr-2"> ຄົ້ນຫາສິນຄ້າ </span>
                    <input type="text" onChange={(e) => setkeys(e.target.value)} />
                    <button className="ml-2" onClick={getproductsell}> ຄົ້ນຫາ </button>
                    <button className="ml-2" onClick={print}> ພິມບິນ </button>
                </div>

                <div className="w-90 m-auto container-print">
                    <div className="text-center pt-3">
                        <span className="font-14-px"> ລາຍງານສິນຄ້າຂາຍໜ້າຮ້ານ </span>
                    </div>
                    <div>
                        <table className="w-100 tableprint">
                            <thead>
                                <tr>
                                    <th>ລຳດັບ</th>
                                    <th>ຊື່ສິນຄ້າ</th>
                                    <th> ຈຳນວນສິນຄ້າ</th>
                                    <th> ລາຄາສິນຄ້າ</th>
                                    <th>ລວມລາຄາ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {productsell.length > 0 && productsell.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nameProduct}</td>
                                        <td>{numbers({ number: item.quantity })}</td>
                                        <td>{numbers({ number: item.amount })}</td>
                                        <td> {numbers({ number: totals({ quantity: item.quantity, price: item.amount }) })} </td>
                                    </tr>

                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
}