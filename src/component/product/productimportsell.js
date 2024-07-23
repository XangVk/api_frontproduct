import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../css/product.css";
import "../../css/style.css";


export default function Productimportsell() {

    const [product, setproduct] = useState([]);
    const [productadd, setproductadd] = useState([]);

    const [isproductadd, setisproductadd] = useState(false);
    const [nameisproduct, setnameisproduct] = useState(1);
    const [keyword, setkeyword] = useState('');

    const isfocusquantity = React.createRef();
    const isfocusamount = React.createRef();

    const addproduct = () => {
        try {
            // object or class ==> null
            // array ==> length ==0 or length > 0
            if (nameProduct == null) {
                return null;
            }

            let data = {
                "nameProduct": nameProduct,
                "productnumber": productnumber,
                "quantity": quantity,
                "amount": amount
            }
      
            const indexs = product.findIndex(x => x.productnumber == data.productnumber);
            console.log(product[indexs].quantity)
            if (indexs != -1) {

                if (parseInt(product[indexs].quantity) < parseInt(data.quantity)) {
                    setisproductadd(true);
                    setnameisproduct(5);
                    return;
                }

            }

            if (nameProduct == "") {
                setisproductadd(true);
                setnameisproduct(3);
                return;
            }
            if (quantity == 0) {
                setisproductadd(true);
                setnameisproduct(1);
                isfocusquantity.current.focus();
                return;
            }

            if (amount == 0) {
                setisproductadd(true);
                setnameisproduct(2);
                isfocusamount.current.focus();
                return;
            }

            if (productadd.length > 0) {

                var index = productadd.findIndex(x => x.productnumber == data.productnumber);
                if (index != -1) {
                    productadd[index].quantity = parseInt(productadd[index].quantity) + parseInt(data.quantity);
                    setproductadd([...productadd]);

                }
                if (index == -1) {

                    productadd.push(data)
                    setproductadd([...productadd]);
                }


            } else {
                productadd.push(data)
                setproductadd([...productadd]);
            }
            console.log(productadd)
            clearitem();

        } catch (error) {
            console.log(error)
        }
    }
    const addvalueproduct = ({ item }) => {
        try {

            if (item == null) {

                return;
            }
            if (item.quantity == 0) {
                setisproductadd(true);
                setnameisproduct(4);
                return;
            }

            setnameProduct(item.nameProduct);
            setproductnumber(item.productnumber);
            setquantity(1);
            setamount(0);

            // set error 
            setisproductadd(false);
            setnameisproduct(0);

        } catch (error) {
            console.log(error)
        }

    }

    async function createproductsell() {
        try {

            if (productadd.length == 0) {
                return;
            }

            const token = localStorage.getItem("token");
            const data = await axios.post("http://164.92.69.177:3001/productsell/createproductsell", productadd, { headers: { Authorization: token } });
            if (data.status == 200) {

               setproductadd([]);
               getproduct();
                console.log(data.data)

            }

        } catch (error) {
            console.log(error)
        }
    }



    async function getproduct() {
        try {

            let keyss = { key: keyword };

            const token = localStorage.getItem("token");
            const data = await axios.get("http://164.92.69.177:3001/product/getproductby", { params: keyss, headers: { Authorization: token } });
            if (data.status == 200) {
                setproduct(data.data);
            }
        } catch (error) {
            console.log(error)
        }

    }
    const [nameProduct, setnameProduct] = useState(null);
    const [productnumber, setproductnumber] = useState(null);
    const [quantity, setquantity] = useState(0);
    const [amount, setamount] = useState(0);

    const deleteproductadd = ({ item }) => {
        try {

            const model = productadd.filter(x => x.productnumber != item.productnumber);
            setproductadd(model)

            console.log(productadd);
        } catch (error) {
            console.log(error)
        }

    }

    const clearitem = () => {
        try {
            setnameProduct('');
            setproductnumber('');
            setquantity(0);
            setamount(0);
            isproductadd(false);
            nameisproduct("");
            nameisproduct(0);
        } catch (error) {

        }
    }

    const valuequantity = (e) => {
        try {
            if (!Number(e.target.value)) {
                return;
            }
            setquantity(e.target.value);

        } catch (error) {
        }
    }
    const valueamount = (e) => {
        try {

            if (!Number(e.target.value)) {
                return;

            }

            setamount(e.target.value);

        } catch (error) {

        }

    }

    useEffect(() => {

        getproduct();

    }, [])

    return (

        <>
            <div className="w-100 h-93-vh overflow-y-scroll">
                <div className="w-100 text-center pt-5">
                    <span className="font-20-px font-weight-700"> ເພີ່ມສິນຄ້າຂາຍໜ້າຮ້ານ </span>
                </div>
                <div className="w-90 m-auto ">
                    <div className="w-100 d-flex flex-direction-column">
                        <span className="font-14-px"> ຄົ້ນຫາສິນຄ້າສາງສິນຄ້າ </span>
                        <div className="w-50 d-flex">

                            <input type="text" className="py-1 max-width-300-px w-200-px" onChange={(e) => setkeyword(e.target.value)} onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    getproduct();
                                }
                            }}
                                onKeyUp={(e) => { if (e.key != null) { getproduct(); console.log(e.target.value) } }}
                            />
                            <button onClick={getproduct}>  ຄົ້ນຫາສິນຄ້າ </button>
                        </div>
                    </div>

                    <div className="w-100 max-height-250-px overflow-y-scroll mt-2">
                        <table className="w-100 tables" >
                            <thead>
                                <tr>
                                    <th className="no_">ລຳດັບ</th>
                                    <th className="max-width-150-px text-overflow-ellipsis overflow-hidden text-center">ຊື່ສິນຄ້າ</th>
                                    <th>ລະຫັດສິນຄ້າ</th>
                                    <th>ຈັດການສິນຄ້າ</th>
                                    <th>ຕົວເລືອກ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {product.length > 0 && product.map((item, index) =>
                                    <tr key={index}>
                                        <td className="bg-gray-01">{index + 1}</td>
                                        <td className="max-width-150-px text-overflow-ellipsis overflow-hidden">{item.nameProduct}</td>
                                        <td> {item.productnumber} </td>
                                        <td > {item.quantity}  </td>
                                        <td className="text-center">
                                            <button className="cursor-pointer" onClick={(e) => addvalueproduct({ item: item, e })}> ເລືອກ </button>

                                        </td>

                                    </tr>

                                )}

                            </tbody>


                        </table>

                    </div>
                    <div className="w-100 pt-2">
                        {
                            isproductadd && nameisproduct == 4 ? <span className="font-14-px text-red">  ສິນຄ້າບໍ່ມີຈຳນວນສິນຄ້າ  ກະລຸນານຳເຂົ້າສິນຄ້າໃນສາງກ່ອນ  </span> : ""
                        }
                    </div>
                    <div className="w-100 mt-5 d-flex flex-direction-column">
                        <span className="font-14-px"> ເພີ່ມສິນຄ້າຂາຍໜ້າຮ້ານ </span>

                        <div className="w-100 d-flex align-items-end">
                            <div className="w-100 d-flex flex-direction-column mr-2">
                                <span className="font-14-px"> ຊື່ສິນຄ້າ </span>
                                <input type="text" className="py-1" name="nameProduct" value={nameProduct} onChange={(e) => setnameProduct(e.target.value)} readOnly="true" />
                            </div>
                            <div className="w-100 d-flex flex-direction-column mr-2">
                                <span className="font-14-px"> ລະຫັດສິນຄ້າ </span>
                                <input type="text" className="py-1" name="productnumber" value={productnumber} onChange={(e) => setproductnumber(e.target.value)} readOnly="true" />
                            </div>
                            <div className="w-100 d-flex flex-direction-column mr-2">
                                <span className="font-14-px"> ຈຳນວນສິນຄ້າ </span>
                                <input type="number" className="py-1" name="quantity" value={quantity} onChange={valuequantity} onCompleted="off" ref={isfocusquantity} />
                            </div>
                            <div className="w-100 d-flex flex-direction-column mr-2">
                                <span className="font-14-px"> ລາຄາສິນຄ້າ </span>
                                <input type="number" className="py-1" name="amount" value={amount} onChange={valueamount} onCompleted="off" ref={isfocusamount} />
                            </div>
                            <div className=" d-flex pl-3">
                                <button className="w-100-px mr-2 h-33-px" onClick={addproduct}> ເພີ່ມສິນຄ້າ </button>
                                <button className="w-100-px h-33-px" onClick={clearitem}> ຍົກເລີກ </button>
                            </div>
                        </div>
                        <div className="w-100">
                            {isproductadd && nameisproduct == 1 ? <span className="font-14-px text-red"> ກະລຸນາປ້ອນຈຳນວນສິນຄ້າ </span> : isproductadd && nameisproduct == 2 ? <span className="font-14-px text-red"> ກະລຸນາປ້ອນລາຄາສິນຄ້າ  </span> : isproductadd && nameisproduct == 3 ? <span className="font-14-px text-red"> ກະລຸນາເລືອກສິນຄ້າ  </span> : isproductadd && nameisproduct == 5 ? <span className="font-14-px text-red "> ຈຳນວນສິນຄ້າທີ່ປ້ອນຫຼາຍກວ່າສິນຄ້າທີ່ມີໃນສາງ </span> :  ""}
                        </div>
                        <div className="w-100 max-height-300-px overflow-y-scroll mt-2">
                            <table className="w-100 tables">
                                <thead>
                                    <tr>
                                        <th className="no_">ລຳດັບ</th>
                                        <th>ຊື່ສິນຄ້າ</th>
                                        <th>ຈັດການສິນຄ້າ</th>
                                        <th>ຈັດການສິນຄ້າ</th>
                                        <th>ລາຄາສິນຄ້າ</th>
                                        <th>ຕົວເລືອກ</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        productadd.length > 0 && productadd.map((item, index) =>

                                            <tr key={index}>
                                                <td >{index + 1}</td>
                                                <td>{item.nameProduct} </td>
                                                <td> {item.productnumber} </td>
                                                <td> {item.quantity} </td>
                                                <td>{item.amount} </td>
                                                <td>
                                                    <button onClick={(e) => deleteproductadd({ item: item })}> ລົບ </button>
                                                </td>

                                            </tr>
                                        )


                                    }

                                </tbody>

                            </table>
                            {
                                productadd.length == 0 ?
                                    <div className="w-100 text-center">
                                        <span> ບໍ່ມີຂໍ້ມູນ </span>
                                    </div>
                                    : ""
                            }
                        </div>
                        <div className="w-100">
                            <button onClick={createproductsell} className="bg-blue text-white py-1"> ບັນທຶກສິນຄ້າຂາຍໜ້າຮ້ານ </button>
                        </div>
                    </div>

                </div>


            </div>


        </>
    )
}