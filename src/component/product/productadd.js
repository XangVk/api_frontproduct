import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../css/product.css";

import ProductAdds from "./productadds";
import EditProducts from "./editproduct";

export default function Productadd() {

    const [product, setproduct] = useState([]);
    const [productall, setproductall] = useState([]);

    const [nameProduct, setnameProduct] = useState(null);
    const [productnumber, setproductnumber] = useState(null);
    const [quantity, setquantity] = useState(0);

    const [keys, setkeys] = useState('');
    const [image, setimage] = useState(null);
    const [imageurl, setimageurl] = useState(null);

    const [buttontap, setbuttontap] = useState(false);
    const [isname, setisname] = useState(false);  // already name
    const [isnumber, setisnumber] = useState(false); // already

    const [iseditproduct, setideditproduct] = useState(false);
    const [dataedit, setdataedit] = useState(null);

    async function getproduct() {
        try {
            const token = localStorage.getItem("token");

            const data = await axios.get("http://164.92.69.177:3001/product/getproduct", { headers: { Authorization: token } });
            if (data.status = 200) {
                // setproduct(data.data);
                setproductall(data.data);
                console.log(data.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function getproductby() {
        try {

            const keyword = { key: keys };
            const token = localStorage.getItem("token");
            console.log({ "token": token, "keyword": keyword });
            const data = await axios.get("http://164.92.69.177:3001/product/getproductby", { params: keyword, headers: { Authorization: token } });
            console.log(data)
            if (data.status == 200) {
                console.log(data.data);
                setproduct(data.data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    async function onaddproduct() {
        try {

            const token = localStorage.getItem("token");
            const datas = {
                "nameProduct": nameProduct,
                "productnumber": productnumber,
                "quantity": quantity,
                "amount": 0,
                "image": image
            }

            const formdata = new FormData();
            console.log({ "nameProduct": nameProduct, "quantity": productnumber, "amount": 1000, "image": image });
            formdata.append("nameProduct", nameProduct);
            formdata.append("productnumber", productnumber);
            formdata.append("quantity", parseInt(0));
            formdata.append("amount", 0);
            formdata.append("image", image);

            // const datamodel = [];
            // datamodel.push(datas)
            const isvalue = checknameornumber({ value: datas });
            if (isvalue) {
                console.log(isvalue)
                return;
            }
            const data = await axios.post("http://164.92.69.177:3001/product/createproductimage", formdata, { headers: { Authorization: token } });

            if (data.status == 200) {
                getproductby();
                // getproductby();
                // console.log(data.data)
                cleardata();
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteproduct(id) {
        try {
            const token = localStorage.getItem("token");
            const data = await axios.delete(`http://164.92.69.177:3001/product/deleteproduct/${id}`, { headers: { Authorization: token } });
            if (data.status == 200) {
                getproductby();
                // console.log(data.data)

            }
        } catch (error) {
            console.log(error)
        }
    }

    const uploadimage = (e) => {
        const file = e.target.files[0];
        const renderIMG = new FileReader();

        renderIMG.onload = () => {
            setimage(file);
            setimageurl(renderIMG.result);
        }
        renderIMG.readAsDataURL(file);
    }

    const nameProductvalue = (e) => {

        e.preventDefault();

        setproductnumber(e.target.value)

        console.log("value")
    }
    const cleardata = () => {

        try {
            setimage(null);
            setimageurl(null);
            setnameProduct('');
            setproductnumber('');
            setquantity(0);

        } catch (error) {
            console.log(error)
        }
    }
    const calltap = ({ tap }) => {

        setbuttontap(tap);
        if (tap == false) {
            getproductby();
        }
        console.log(tap);
    }

    const checknameornumber = ({ value }) => {
        try {

            if (product.length > 0) {
                setisname(false);
                setisnumber(false);
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

                setisname(false);
                setisnumber(false);
                return false;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editdata = ({ isedit, data }, e) => {
        try {
            e.preventDefault();
            setdataedit(data);
            setideditproduct(isedit);
            if (isedit == false) {
                getproduct();
                getproductby();
            }
        } catch (error) {

        }


    }

    useEffect(() => {

        getproduct();
        getproductby();

    }, [])

    return (
        <div className="w-100 bg-white position-relative">
            <div className="text-center pl-10 font-weight-bold font-14-px pt-3">
                <span className="font-18-px"> ເພີ້ມຂໍ້ມູນສິນຄ້າ </span>
            </div>

            <div className="w-100  d-flex ">
                {buttontap == false ? <>
                    <div className="w-40   ">
                        <div className="w-100 d-flex justify-content-center mb-4">
                            <button onClick={() => setbuttontap(false)} className="mr-2 bg-btn-tap text-white border-radius-3-px"> ບັນທຶກລາຍການ </button>
                            <button onClick={() => setbuttontap(true)} className="bg-btn-tap text-white border-radius-3-px mr-2">  ບັນທຶກທັ້ງໝົດ </button>
                        </div>

                        <div className="w-60 d-flex flex-direction-column m-auto max-width-300-px pt-3 overflow-hidden mt-5 bg-gray-default-1 px-5 border-radius-3-px py-7 mt-3">

                            <div className="text-center position-relative">
                                <img for="images" src={`${imageurl == null ? `http://164.92.69.177:3001/imageposts/` : imageurl}`} className="w-180-px h-180-px border-1-solid-gray border-radius-5-px border-1-solid-image" />
                                <label for="images" className="w-100 h-180-px   d-flex justify-content-center align-items-center font-12-px position-absolute top-0 left-0  " > </label>
                                <input type="file" id="images" onChange={uploadimage} />
                            </div>

                            <span className="font-14-px"> ຊື່ສິນຄ້າ </span>
                            <input type="text" className={`py-1 border-radius-3-px ${isname == true ? "border-1-solid-reds" : ""}`} onChange={(e) => setnameProduct(e.target.value)} value={nameProduct} onCompleted="off" />
                            {isname == true ? <span className="text-red font-10-px"> ຊື່ສິນຄ້າທີ່ປ້ອນມີແລ້ວ </span> : ""}
                            <span className="font-14-px"> ລະຫັດສິນຄ້າ </span>
                            <input type="text" className={`py-1 border-radius-3-px  ${isnumber == true ? "border-1-solid-reds" : ""}`} onChange={nameProductvalue} value={productnumber} onCompleted="off" />
                            {isnumber == true ? <span className="text-red font-10-px"> ລະຫັດສິນຄ້າທີ່ປ້ອນມີແລ້ວ </span> : ""}
                            <span className="font-14-px"> ຈຳນວນ </span>
                            <input type="number" className="py-1 border-radius-3-px " onChange={(e) => setquantity(e.target.value)} value={quantity} onCompleted="off" />
                            <div className="  d-flex flex-direction-column mt-2 position-relative w-180-px ">
                                <label className="w-100-px  h-30-px  d-flex justify-content-center align-items-center border-radius-3-px text-white font-14-px bg-blue-01" for="images" > ເລືອກຮູບ </label>
                            </div>
                            <button className="mt-2 bg-btn text-white border-radius-3-px h-35-px" onClick={onaddproduct}>  ບັນທຶກ  </button>
                        </div>
                    </div>

                    <div className="w-58 h-500-px   overflow-hidden">
                        <div className="w-100  d-flex flex-direction-column pt-1 ">
                            <span className="font-14-px"> ຄົ້ນຫາສິນຄ້າ </span>
                            <div className="w-100 d-flex ">
                                <input type="text" className="w-50 h-30-px border-radius-3-px" onChange={(e) => setkeys(e.target.value)} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        getproductby();
                                    }
                                }}
                                    onKeyUp={(e) => { if (e.key != null) { getproductby(); } }}
                                />
                                <button className="ml-1 bg-blue-01 text-white border-radius-3-px" onClick={getproductby} > ຄົ້ນຫາສິນຄ້າ</button>
                            </div>
                        </div>

                        <div className="w-100 bg-white h-428-px overflow-y-scroll mt-1" >
                            <table className="tables w-100 ">
                                <thead>
                                    <tr>
                                        <th className="no_">ລຳດັບ</th>
                                        <th className="w-100-px">ຮູບ</th>

                                        <th> ຊື່ສິນຄ້າ </th>
                                        <th> ລະຫັດສິນຄ້າ </th>
                                        <th> ຈຳນວນ </th>
                                        <th className="more_"> ຕົວເລືອກ </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {product.length > 0 && product.map((item, index) =>

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{<img src={`http://164.92.69.177:3001/image/post/${item.image}`} className="w-40-px h-40-px border-radius-50 border-1-solid-default" />}</td>
                                            <td className="max-width-100-px text-overflow-ellipsis overflow-hidden">{item.nameProduct}</td>
                                            <td>{item.productnumber}</td>
                                            <td>{item.quantity}</td>
                                            <td className="">
                                                <button className="mr-1 font-12-px bg-btn text-white" onClick={(e) => editdata({ isedit: true, data: item }, e)}> ແກ້ໄຂ </button>
                                                <button className="ml-1 font-12-px text-white bg-red" onClick={() => deleteproduct(item._id)}> ລົບ </button>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </> : <ProductAdds tap={calltap} product={product} />}
            </div>

            {
                iseditproduct ? <div className={` w-100 h-94-vh bg-backdrop position-absolute top-0 left-0 z-index-3 `}>
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <EditProducts datas={dataedit} editdata={editdata} />
                    </div>
                </div> : ""
            }


        </div>
    )

}


