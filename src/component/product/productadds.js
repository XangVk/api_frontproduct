import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/style.css";
import { clear } from "@testing-library/user-event/dist/clear";

import EditProducts from "../product/edits";


export default function ProductAdds({ tap, product }) {


    const [nameProduct, setnameProduct] = useState(null);
    const [productnumber, setproductnumber] = useState(null);
    const [quantity, setquantity] = useState(0);

    const [buttontap, setbuttontap] = useState(false);

    const [productadds, setproductadds] = useState([]);

    const [productreports, setproductreports] = useState(false);

    const [isname, setisname] = useState(false); // already name ;
    const [isnumber, setisnumber] = useState(false); // already number

    const [isindex, setisindex] = useState(-1);
    const [isedit, setisedit] = useState(false);

    const btnaddproduct = () => { // value product
        try {

            const index = product.findIndex(x => x.nameProduct === nameProduct);
            console.log(index);
            if (index !== -1) {
                console.log(product[index]);
                // setproductnumber('');
                // setproductnumber(product[index].productnumber);
                setisname(true);

            }

            if (index == -1) {
                // setproductnumber('');
                // setquantity(0);
                setisname(false);

            }

            const indexs = product.findIndex(x => x.productnumber == productnumber);
            if (indexs != -1) {
                setisnumber(true);
                return;
            }
            if (indexs == -1) {
                setisnumber(false);
                return;
            }

            console.log(product)
        } catch (error) {
            console.log(error)
        }
    }

    const addproduct = (e) => {
        try {

            if (nameProduct.toString().length == 0 || productnumber.toString().length == 0 || quantity === 0) {
                return;
            }
            let datas = {
                "nameProduct": nameProduct,
                "productnumber": productnumber,
                "quantity": quantity,
                "amount": 0
            }
            const isvalid = chcecknameornumber({ value: datas });
            if (isvalid == true) {
                console.log({ "valid": true });
                return;

            }   // valid already name or number 


            // const productmodels = [...productadds, datas]
            if (productadds.length == 0) {
                productadds.push(datas);
                setproductadds([...productadds])
                console.log(productadds);
            } else {

                const indexs = productadds.findIndex(x => x.nameProduct == datas.nameProduct);
                if (indexs != -1) {
                    productadds[indexs].quantity = parseInt(productadds[indexs].quantity) + parseInt(datas.quantity);
                    setproductadds([...productadds])
                } else {
                    productadds.push(datas);
                    setproductadds([...productadds])
                }
                // productadds.push(datas);
                console.log(productadds);
            }

            cleardata();
        } catch (error) {
            console.log(error);
        }
    }

    async function onaddproduct() {
        try {

            const token = localStorage.getItem("token");
            if (productadds.length == 0) {
                return;
            }
            const data = await axios.post("http://164.92.98.3:3001/product/createproduct", productadds, { headers: { Authorization: token } });
            if (data.status == 200) {

                console.log(data.data)
                setproductadds([]);
                cleardata();
                setproductreports(true);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deletes = (nameProduct) => {

        const models = productadds.filter(x => x.nameProduct !== nameProduct);
        setproductadds(models);
        console.log(models)

    }


    const chcecknameornumber = ({ value }) => {
        try {

            if (product.length > 0) {
                setisname(false);
                setisnumber(false);
                if (value != null) {

                    const index = product.findIndex(x => x.nameProduct == value.nameProduct);
                    if (index != -1) {
                        setisname(true);
                        return true;
                    }

                    const indexs = product.findIndex(x => x.productnumber == value.productnumber);
                    if (indexs != -1) {
                        setisnumber(true);
                        return true;
                    }
                }
                setisname(false);
                setisnumber(false);
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }


    const cleardata = () => {
        try {

            setnameProduct('');
            setproductnumber('');
            setquantity(0);
        } catch (error) {
            console.log(error)
        }

    }


    // edit 
    const valueindex = ({ index, item, isedit }) => {
        try {

            setisindex(index)
            setisedit(isedit)
            setvalue(item)
        } catch (error) {
            console.log(error)
        }
    }
    const editvalue = ({ index, isedit }) => {
        try {
            setisindex(index)
            if (index != -1) {
                productadds[index] = values;
            }
            if (isindex === index) {
                setisindex(-1);
            }
            // edit success save edit
        } catch (error) {
            console.log(error)
        }
    }

    const [values, setvalue] = useState({
        nameProduct: "",
        productnumber: "",
        quantity: "",
    })
    const valuechangedit = (e) => {
        try {
            const { name, value } = e.target;
            // setvalue(pre => ({
            //     ...pre, [e.target.name] : e.target.value
            //     }))

            const data = { ...values };
            data[name] = value
            setvalue(data)
            // console.log(values)

        } catch (error) {

        }
    }

    // edit item



    return (
        <div className="w-100 h-86-vh  pt-3">

            <div className="position-relative w-80 m-auto ">

                <div >
                    <button onClick={() => { tap({ tap: false }) }} className="mr-2 bg-btn-tap text-white border-radius-3-px h-35-px  "> ບັນທຶກລາຍການ </button>
                    <button onClick={() => { tap({ tap: true }) }} className=" bg-btn-tap text-white border-radius-3-px h-35-px"> ບັນທຶກທັ້ງໝົດ </button>
                </div>


                <div className=" position-absolute right-0 top-0 ">
                    <button onClick={onaddproduct} className="bg-btn text-white  border-radius-3-px cursor-pointer  max-width-307-px w-100-px h-35-px"> ບັນທຶກ </button>
                </div>

                <div>




                </div>
            </div>
            <div className=" w-100 d-flex flex-direction-column align-items-center mt-3">

                <div className=" w-80 d-flex ">
                    <div className="w-33 text">
                        <span className="font-14-px">  ຊື່ສິນຄ້າ  </span>
                        <div className="d-flex">
                            <input className={`w-100 ${isname == true ? "border-1-solid-reds" : ""}`}
                                onChange={(e) => setnameProduct(e.target.value)} value={nameProduct} onCompleted="off" onKeyDown={(e) => {
                                    if (e.key != null) {
                                        console.log(nameProduct)
                                        btnaddproduct()
                                    }
                                }}
                                onKeyUp={(e) => {
                                    if (e.key != null) {
                                        console.log(product)
                                        btnaddproduct();
                                    }
                                }}
                            />
                            <button className="py-1 ml-1" onClick={() => setnameProduct('')}> ຍົກເລີກ </button>

                        </div>
                        {isname == true ? <span className="font-10-px text-red"> ຊື່ສິນຄ້າທີ່ປ້ອນມີແລ້ວ </span> : ""}
                    </div>
                    <div className="w-33 ml-1">
                        <span className="font-14-px">  ຊື່ສິນຄ້າ  </span>
                        <div className="d-flex">
                            <input className={`w-100 ${isnumber == true ? "border-1-solid-reds" : ""}`}
                                onChange={(e) => setproductnumber(e.target.value)} value={productnumber} onCompleted="off"
                                onKeyUp={(e) => {

                                    btnaddproduct()
                                    console.log("enter")
                                }}
                            />
                            <button className="py-1 ml-1" onClick={() => setproductnumber('')}> ຍົກເລີກ </button>

                        </div>
                        {isnumber == true ? <span className="font-10-px text-red"> ລະຫັດສິນຄ້າທີ່ປ້ອນມີແລ້ວ </span> : ""}
                    </div>

                    <div className="w-33 ml-1">
                        <span className="font-14-px">  ຈຳນວນ  </span>
                        <div className="d-flex">
                            <input className="w-100" onCompleted="off" onChange={(e) => setquantity(e.target.value)} value={quantity} />
                            <button className="py-1  ml-1" onClick={() => cleardata()}> ຍົກເລີກ </button>

                        </div>

                    </div>
                    <div className="pt-7 ml-2">
                        <button onClick={addproduct} className="py-1  w-70-px border-radius-3-px cursor-pointer bg-btn text-white "> ເພີ່ມ </button>
                    </div>

                </div>




                <div className="w-80 mt-2 h-400-px overflow-y-scroll">
                    <table className="tables w-100">
                        <thead>
                            <tr>
                                <th className="no_">
                                    ລຳດັບ
                                </th>
                                <th> ຊື່ສິນຄ້າ</th>
                                <th>ລະຫັດສິນຄ້າ</th>
                                <th>ຈຳນວນ</th>
                                <th className="more_"> ຕົວເລືອກ</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                productadds.map((item, index) => (
                                    <React.Fragment>
                                        {
                                            index === isindex ? <EditProducts productEdit={values} editValue={editvalue} index={isindex} Valuechangeds={valuechangedit} /> :
                                                <tr key={index}>
                                                    <td>  {index + 1}</td>
                                                    <td>{item.nameProduct} </td>
                                                    <td> {item.productnumber} </td>
                                                    <td> {item.quantity} </td>
                                                    <td className="d-flex flex-wrap-nowrap justify-content-center">
                                                        <button onClick={() => valueindex({ index: index, item: item, edit: true })} className="mr-2" > edit </button>
                                                        <button onClick={() => deletes(item.nameProduct)} > del </button>
                                                    </td>
                                                </tr>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className="w-100 text-center">
                        {productadds.length == 0 ? <span className="m-auto font-14-px mt-2"> ບໍ່ມີຂໍ້ມູນ </span> : ""}
                    </div>
                </div>
            </div>


        </div>

    )
}

