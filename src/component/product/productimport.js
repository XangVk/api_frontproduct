import * as React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import '../../css/style.css';
import "../../css/productimport.css";

import ProductAdds from "./productadds";


export default function ProductImport() {


    const [product, setproduct] = useState([]);
    const [productadd, setproductadd] = useState([])


    const [nameProduct, setnameProduct] = useState('');
    const [productnumber, setproductnumber] = useState('');
    const [quantity, setquantity] = useState('');
    const [price, setprice] = useState('');

    const [nameProductadd, setnameProductadd] = useState(null);
    const [productnumberadd, setproductnumberadd] = useState(null);
    const [isproduct, setisproduct] = useState(false);

    const [isquantity, setisquantity] = useState(null);
    const isfocusquantityref = React.createRef();
    const isfocusprice = React.createRef();

    const addproduct = () => {
        try {

            const data = {
                "nameProduct": nameProduct,
                "productnumber": productnumber,
                "quantity": quantity,
                "price": price
            }
            const checkproduct = oncheckproduct(data);
            if (checkproduct == true) {
                console.log("not found")
                return;
            }
            //
            if (productadd != null) {

                const index = productadd.findIndex(x => x.nameProduct == data.nameProduct && x.productnumber == data.productnumber);
                if (index != -1) {
                    const quantitys = parseInt(productadd[index].quantity) == NaN ? 0 : parseInt(productadd[index].quantity);
                    const dataquantity = parseInt(data.quantity) == NaN ? 0 : parseInt(data.quantity);
                    productadd[index].quantity = parseInt(quantitys) + parseInt(dataquantity);

                } else {
                    productadd.push(data);
                    setproductadd([...productadd]);
                    console.log(productadd);

                }
            }
            cleardata();

        } catch (error) {
            console.log(error)
        }
    }
    const onaddproduct = () => {
        try {

            const index = product.findIndex(x => x.productnumber == productnumber);
            if (index != -1) {

                setnameProduct(product[index].nameProduct);
                setisproduct(false);
            }

            if (index == -1) {
                setnameProduct('');
                setisproduct(true);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const oncheckproduct = (datas) => {
        try {

            if (datas != null) {

                const index = product.findIndex(x => x.nameProduct == datas.nameProduct);
                if (index == -1) {
                    setisproduct(true);
                    return true;
                }
                const indexs = product.findIndex(x => x.productnumber == datas.productnumber);
                if (indexs == -1) {
                    setisproduct(true);
                    return true;
                }
                if (datas.quantity == "") {

                    setisquantity("ກະລຸນາປ້ອນຈຳນວນສິນຄ້າ")
                    setisproduct(true);
                    isfocusquantityref.current.focus();
                    return true;
                } else if (datas.price == "") {
                    setisquantity("ກະລຸນາປ້ອນລາຄາສິນຄ້າ")
                    setisproduct(true);
                    isfocusprice.current.focus();
                    return true;
                }

                setisproduct(false);
            }
        } catch (error) {

        }
    }


    async function onaddproductimport() {

        try {
            if (productadd.length == 0) return;
            const token = localStorage.getItem("token");
            const data = await axios.post("http://164.92.98.3:3001/productimport/createproductimport", productadd, { headers: { Authorization: token } });
            console.log(data.data)
            if (data.status == 200) {
                console.log(data.data)
                setproductadd([]);
                cleardata();
                getproduct();
            }


        } catch (error) {

            console.log(error)
        }
    }
    async function onaddproducts() {
        try {

            let datas = {
                "nameProduct": nameProductadd,
                "productnumber": productnumberadd,
                "quantity": 0
            }
            if (datas.nameProduct <= 0 || datas.productnumber.length <= 0) {
                console.log(datas);
                return;
            }
            const token = localStorage.getItem("token");

            const data = await axios.post("http://164.92.98.3:3001/product/createproductimage", datas, { headers: { Authorization: token } });

            if (data.status == 200) {
                console.log(data);
                setnameProductadd("");
                setproductnumberadd("");
                getproduct();
            }

        } catch (error) {
            console.log(error)
        }

    }



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

    const deletes = (datas) => {

        try {

            const models = productadd.filter(x => x.productnumber !== datas.productnumber);
            setproductadd(models);
            console.log(productadd);


        } catch (error) {
            console.log(error)
        }

    }


    const cleardata = () => {
        try {

            setnameProduct('');
            setproductnumber('');
            setquantity(0);
            setprice(0);
            setisquantity("");
        } catch (error) {
            console.log(error)
        }

    }

    const [height, setheight] = useState("")
    const addheight = () => {
        try {

            if (height == "") {
                setheight("show")
            } else {
                setheight("");
                setnameProductadd("");
                setproductnumberadd("");
            }

        } catch (error) {

        }
    }
    const [showproducts, setshowproducts] = useState("");
    const showproduct = () => {
        try {

            if (showproducts == "") {
                setshowproducts("show")
            } else {
                setshowproducts("")
            }


        } catch (error) {

        }

    }


    const valueamount = (e) => {

        try {
            if (!Number(e.target.value)) {
                return;
            }
            setprice(e.target.value)
        } catch (error) {
            console.log(error)
        }
    }

    const valuequantity = (e) => {
        try {
            if (!Number(e.target.value)) {
                return;
            }
            setquantity(e.target.value)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        getproduct();

    }, [])


    return (


        <div className="w-100 h-100-vh ">

            <div className="text-center pt-5 ">
                <span className="font-18-px font-weight-bold"> ສິນຄ້ານຳເຂົ້າ </span>
            </div>
            <div className="d-flex">

                <div className="w-100   ">
                    <div className="w-90   d-flex m-auto">

                        <div className="w-25  ">
                            <span className="font-14-px">
                                ຊື່ສິນຄ້າ
                            </span>
                            <div className="w-100  d-flex">
                                <input className="w-100 py-1" onChange={(e) => setnameProduct(e.target.value)} value={nameProduct} onCompleted="off" />
                                <button onClick={(e) => setnameProduct('')} className="ml-1"> ຍົກເລີກ</button>
                            </div>
                        </div>

                        <div className="w-25  ">
                            <span className="font-14-px">
                                ລະຫັດສິນຄ້າ
                            </span>
                            <div className="w-100  d-flex">
                                <input className="w-100 py-1 ml-1" onChange={(e) => setproductnumber(e.target.value)} value={productnumber} onCompleted="off" onKeyDown={(e) => {
                                    onaddproduct()
                                }} onKeyUp={(e) => {
                                    onaddproduct();
                                }} />
                                <button onClick={() => setproductnumber('')} className="ml-1"> ຍົກເລີກ</button>
                            </div>
                        </div>

                        <div className="w-25  ">
                            <span className="font-14-px">
                                ຈຳນວນ
                            </span>
                            <div className="w-100  d-flex">
                                <input className="w-100 py-1 ml-1" onChange={valuequantity} value={quantity} onCompleted="off" ref={isfocusquantityref} />
                                <button onClick={() => setquantity('')} className="ml-1"> ຍົກເລີກ</button>
                            </div>
                        </div>

                        <div className="w-25  ">
                            <span className="font-14-px">
                                ລາຄາສິນຄ້າ
                            </span>
                            <div className="w-100  d-flex">
                                <input className="w-100 py-1 ml-1" onChange={valueamount} value={price} onCompleted="off" ref={isfocusprice} />
                                <button onClick={() => setprice('')} className="ml-1"> ຍົກເລີກ</button>
                            </div>
                        </div>


                    </div>
                    <div className="w-90 m-auto">
                        {isproduct == true && isquantity === null ? <span className="text-red font-12-px"> ບໍ່ມີສິນຄ້າທີ່ປ້ອນ </span> : ""}
                        {isproduct == true && isquantity != "" ? <span className="text-red font-12-px"> {isquantity} </span> : ""}
                    </div>
                    <div className="w-90 m-auto d-flex justify-content-between pt-2">
                        <button className="cursor-pointer bg-btn text-white" onClick={onaddproductimport}> ບັນທຶກສິນຄ້ານຳເຂົ້າທັ້ງໝົດ </button>
                        <button onClick={addproduct} className="bg-gray-default-1 text-white"> ເພີ່ມສິນຄ້າ </button>

                    </div>
                    <div className="w-90 m-auto pt-3 d-flex flex-direction-column h-auto">

                        <div className="d-flex justify-content-between">
                            <button className="w-150-px " onClick={addheight}> ເພີ່ມບັນທຶກເຂົ້າສາງສິນຄ້າ </button>
                            <button className="w-100-px" onClick={showproduct}> ສະແດງສິນຄ້າ </button>

                        </div>

                        <div className={`w-100  h-addproduct overflow-hidden  ${height}`}>
                            <div className="w-100 pt-3">
                                <div className="flex-direction-column d-flex px-3">
                                    <span className="font-12-px "> ຊື່ສິນຄ້າ  </span>
                                    <input type="text" className="py-1 " onChange={(e) => setnameProductadd(e.target.value)} value={nameProductadd} onCompleted="off" />
                                </div>
                                <div className="flex-direction-column d-flex px-3">
                                    <span className="font-12-px "> ລະຫັດສິນຄ້າ  </span>
                                    <input type="text" className="py-1 " onChange={(e) => setproductnumberadd(e.target.value)} value={productnumberadd} onCompleted="off" />
                                </div>
                                <div className="px-3 pt-2">
                                    <button className="bg-blue-01 text-white cursor-pointer" onClick={onaddproducts}> ບັນທຶກ </button>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="w-90 m-auto  max-height-400-px overflow-y-scroll">

                        <table className="tableimport w-100">
                            <thead>
                                <tr>
                                    <th> ລຳດັບ  </th>
                                    <th> ຊື່ສິນຄ້າ  </th>
                                    <th> ລະຫັດສິນຄ້າ  </th>
                                    <th> ຈຳນວນ  </th>
                                    <th> ລາຄາສິນຄ້າ  </th>

                                    <th> ຕົວເລືອກ  </th>
                                </tr>

                            </thead>

                            <tbody>
                                {
                                    productadd.length > 0 && productadd.map((item, index) =>
                                        <tr>
                                            <td> {index + 1} </td>
                                            <td> {item.nameProduct} </td>
                                            <td> {item.productnumber} </td>
                                            <td> {item.quantity}</td>
                                            <td> {item.price} </td>
                                            <td>
                                                <button onClick={() => deletes(item)} className="bg-red text-white"> ລົບ </button>

                                            </td>

                                        </tr>

                                    )


                                }

                            </tbody>

                        </table>
                        <div className="w-90 text-center pt-2">
                            {productadd.length == 0 ? <span className="font-14-px"> ບໍ່ມີຂໍ້ມູນ </span> : ""}
                        </div>
                    </div>


                </div>
                <div className={` h-100-px showproduct  ${showproducts}`}>
                    <table className="tableimport w-100 ">
                        <thead>
                            <tr>
                                <th>  ລຳດັບ </th>
                                <th>  ຊື່ສິນຄ້າ </th>
                                <th>  ລະຫັດສິນຄ້າ </th>
                                <th>  ຈຳນວນ </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length > 0 && product.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td> {item.nameProduct}</td>
                                        <td>{item.productnumber} </td>
                                        <td>{item.quantity}</td>


                                    </tr>
                                )

                            }

                        </tbody>
                    </table>

                </div>

            </div>


        </div>

    )
}