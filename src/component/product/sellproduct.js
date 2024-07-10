
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../css/style.css";
import "../../css/product.css"
import Productbill from "./productbill";

export default function SellProduct() {

    //s
    const [product, setproduct] = useState([]);
    const [productsell, setproductsell] = useState([]);

    const [productadd, setproductadd] = useState([]);
    const [keyword, setkeyword] = useState(null);
 
    const [btnbill , setbtnbill] = useState(false);

    const addproduct = ({ item }) => {
        try {
            if (item.quantity == 0) {
                return;
            }

            const data = {
                "nameProduct": item.nameProduct,
                "productnumber": item.productnumber,
                "quantity": 1,
                "amount": item.amount,
                "status": false,
                "bills": 0
            }
            if (productadd.length > 0) {

                var index = productadd.findIndex(x => x.productnumber == data.productnumber);
                if (index != -1) {
                    productadd[index].quantity = parseInt(productadd[index].quantity) + 1;
                    const check = checkquantity({ item: data });
                    if (check == true) {
                        return;
                    }
                    setproductadd([...productadd])
                } else {
                    const check = checkquantity({ item: data });
                    if (check == true) {
                        return;
                    }
                    productadd.push(data);
                    setproductadd([...productadd]);
                }
            } else {
                productadd.push(data);
                setproductadd([...productadd]);
            }
            console.log(productadd)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteproduct = ({ item }) => {

        try {

            if (productadd.length > 0) {

                const products = productadd.filter(x => x.productnumber != item.productnumber);
                setproductadd([...products]);

            }

        } catch (error) {
            console.log(error)
        }

    }

    const checkquantity = ({ item }) => {
        try {

            const index = productsell.findIndex(x => x.productnumber == item.productnumber);
            if (index != -1) {
                const indexs = productadd.findIndex(x => x.productnumber == item.productnumber);

                if (indexs != -1) {
                    const quantity = parseInt(productadd[indexs].quantity) + 1;
                    if (parseInt(quantity) > parseInt(productsell[index].quantity)) {

                        return true;
                    }
                }
            }
            return false;

        } catch (error) {
            console.log(error)
        }

    }

    // async function onaddsell() {
    //     try {

    //         const token = localStorage.getItem("token");

    //         const data = await axios.post("http://164.92.98.3:3001/productsell/createproductsell", productadd, { headers: { Authorization: token } });

    //         if (data.status == 200) {
    //             console.log(data.data);
    //         }


    //     } catch (error) {
    //         console.log(error)
    //     }


    // }

    async function getproduct() {
        try {

            const token = localStorage.getItem("token");
            const data = await axios.get("http://164.92.98.3:3001/product/getproduct", { headers: { Authorization: token } });

            if (data.status == 200) {
                setproduct(data.data);
                console.log(data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function getproductsell() {
        try {

            let key = { key: keyword }
            const token = localStorage.getItem("token");

            const data = await axios.get("http://164.92.98.3:3001/productsell/getproductsellbysell", { params: key, headers: { Authorization: token } });
            if (data.status == 200) {
                setproductsell(data.data);
                console.log(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function onaddsell() {
        try {
if(productadd.length == 0){
return;
}
            const token = localStorage.getItem("token");
            console.log(productadd)
            const data = await axios.post("http://164.92.98.3:3001/sellproduct/createsellproduct", productadd, { headers: { Authorization: token } });
            console.log(data.data)
            if (data.status = 200) {
                console.log(data.data)
               
               setbtnbill(true);
                // setproductadd([]);
                // setkeyword("");
                // getproductsell();
                
            }

        } catch (error) {
            console.log(error);
        }
    }
    const totals = ({ quantity, price }) => {
        try {

            const total = parseInt(quantity) * parseInt(price);
            return total;
        } catch (error) {
            console.log(error)
        }
    }

    const amounts = () => {
        try {

            return productadd.reduce((acc, current) => Number(acc) + (parseInt(current.quantity) * parseInt(current.amount)), 0)


        } catch (error) {
            console.log(error)
        }

    }

 const btnbills = ({e , status}) => {
try {
    
    if(status == false){
        setproductadd([]);
             setkeyword("");
                getproductsell();
    }
setbtnbill(status);

} catch (error) {
    
}

 }

    useEffect(() => {
        getproductsell();
        getproduct();
    }, [])


    return (

        <>
            <div className="w-100 h-93-vh overflow-y-scroll position-relative ">

                <div className="pt-5 text-center">
                    <span className="font-18-px font-weight-bold "> ຈັດການການຂາຍສິນຄ້າ </span>
                </div>
                <div className="w-100 d-flex  pl-2  ">

                    <div className="w-55 h-100  ">
                        <div className="w-50 d-flex flex-direction-column pl-6 pb-1">
                            <span className="font-14-px">ຄົ້ນຫາສິນຄ້າ</span>
                            <div className="position-relative ">

                                <input type="text" className="w-100 pr-8 py-1" onChange={(e) => setkeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            getproductsell()
                                            console.log("enter")
                                        }
                                    }}
                                    onKeyUp={(e) => { if (e.key != null) { getproductsell() } }}
                                />
                                <img src="http://164.92.98.3:3001/image/post/icon_search.png" className="h-30-px position-absolute top-0  right-42-l cursor-pointer" />
                            </div>
                        </div>
                        <div className=" d-flex max-height-77-vh flex-wrap-wrap overflow-y-scroll scroll pb-10 scroll-width-none ml-3 pt-5 ">
                            {
                                productsell.length > 0 && productsell.map((item, index) =>
                                    <div className="w-30 max-height-213-px mx-3 max-width-180-px  position-relative z-index-1 mb-4">
                                        <div className=" d-flex flex-direction-column  box-shadow-default overflow-hidden position-relative z-index-1" onClick={() => addproduct({ item: item })}>
                                            <img src={`http://164.92.98.3:3001/image/post/${item.image != "false" ? item.image : "noimage.jpg"}`} className="w-100 h-110-px min-h-110-px position-relative z-index-1" />
                                            <div className="d-flex flex-direction-column justify-content-between h-100">
                                                <div className="d-flex flex-direction-column">

                                                    <span className="font-12-px ml-1 text-overflow-ellipsis overflow-hidden white-space-nowrap"> {item.nameProduct} </span>
                                                    <span className="font-12-px ml-1 py-1"> ຈຳນວນສິນຄ້າ: {item.quantity} </span>
                                                    <span className="font-12-px ml-1"> ລາຄາສິນຄ້າ: {item.amount} </span>


                                                </div>
                                                <button className="bg-gray-btn text-white border-none cursor-pointer py-1"> ເລືອກ </button>

                                            </div>
                                        </div>
                                        {item.quantity == 0 ? <span className="font-14-px text-white position-absolute top-7-l right-5-l px-1 border-radius-5-px bg-red z-index-2"> ສິນຄ້າໝົດ </span> : ""}

                                    </div>


                                )}

                        </div>

                    </div>
                    <div className="w-45 h-92-vh  position-relative pr-2">
                        <div className="w-100 h-428-px  overflow-y-auto p">
                            <table className="w-100 position-relative border-collapse-collapse tables ">
                                <thead>
                                    <tr>
                                        <th className="no_"> ລຳດັບ </th>
                                        <th> ຊື່ສິນຄ້າ </th>
                                        <th> ຈຳນວນ </th>
                                        <th> ລາຄາສິນຄ້າ </th>
                                        <th> ລວມລາຄາ </th>
                                        <th> ຕົວເລືອກ </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productadd.length > 0 && productadd.map((item, index) =>

                                        <tr>
                                            <td> {index + 1} </td>
                                            <td className="max-width-100-px text-overflow-ellipsis overflow-hidden px-2"> {item.nameProduct} </td>
                                            <td> {item.quantity} </td>
                                            <td> {item.amount} </td>
                                            <td> {totals({ quantity: item.quantity, price: item.amount })} </td>
                                            <td>
                                                <button onClick={() => deleteproduct({ item: item })}> ລົບ </button>
                                            </td>

                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-100 h-50 pt-2">
                            <div className="w-100 d-flex flex-direction-column">
                                <div className="d-flex justify-content-end px-2">
                                    <span> ລວມລາຄາ:  </span> &nbsp;
                                    <span> {amounts()} </span>
                                </div>
                                {/* <div className="d-flex justify-content-end px-2">
                                    <span> ລວມລາຄາ:  </span> &nbsp;
                                    <span> 0.0000 </span>
                                </div>
                                <div className="d-flex justify-content-end px-2">
                                    <span> ລວມລາຄາ:  </span> &nbsp;
                                    <span> 0.0000 </span>
                                </div> */}
                                <div className="pt-5">

                                    <button onClick={onaddsell} className="w-100 py-3 bg-blue-01 text-white cursor-pointer border-none"> ຊຳລະເງິນ </button>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className={`w-100 h-100-vh bg-backdrop position-absolute top-0 left-0 z-index-3 d-flex justify-content-center aligm-items-center ${btnbill ? "display-block" : "display-none"} }`}>
                   <div className="w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                    <Productbill data={productadd} btnbills={btnbills} />

                   </div>
                </div>
            </div>


        </>
    )
}
