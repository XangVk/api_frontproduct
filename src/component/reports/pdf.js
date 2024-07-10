import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";




import "../../css/style.css";

export default function  PdfExport() {

    const [product, setproduct] = useState([]);
    const pdfref = React.useRef(null);

    async function getproduct() {

        try {

            const token = localStorage.getItem("token");

            const data = await axios.get("http://147.182.204.175:3001/product/getproduct", { headers: { Authorization: token } });
            console.log(data.data)
            if (data.status == 200) {

                setproduct(data.data);
                console.log(data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        getproduct();


    }, [])

    const addpdf = () => {
        // const content = pdfref.current;

        // console.log(content)
        // const doc = new jsPDF("p" , "pt" , "letter");
 
        // const margins = {top : 30, left : 30 , bottom : 30, right : 30};

        // doc.text("ລາຍງານສິນຄ້າ" , margins.left , margins.right, {align : "center"})

        // doc.html(content, {

        //     callback : function(doc){
        //         doc.addFileToVFS("saysettha_ot.ttf" , "saysettha OT")
        //         doc.setFont("Saysettha OT")
        //     var iframe = document.createElement('iframe');
        //     document.body.appendChild(iframe);

        //     iframe.src = doc.output(content)
        //         doc.save("example.pdf")
        //     },
        //     html2canvas : {scale : 0.5},
        //     x : 10,
        //     y: 10
        // });

    }


    return (
        <>
            {/* <div className="w-100 h-100-vh">




                <button onClick={addpdf} className="ml-10 mt-3"> export </button>
                <div className="" ref={pdfref}>

                    <table className="tables ">

                        <thead>
                            <tr>
                                <th> ລຳດັບ</th>
                                <th> ຊື່ສິນຄ້າ</th>
                                <th> ຈຳນວນສິນຄ້າ </th>
                                <th>  ລາຄາສິນຄ້າ </th>
                                <th>  ລວມລາຄາ  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length > 0 && product.map((item, index) =>
                                    <tr key={index}>
                                        <td> {index + 1}</td>
                                        <td> {item.nameProduct}</td>
                                        <td> {item.quantity}</td>
                                        <td> {item.amount}</td>
                                        <td> { }</td>
                                    </tr>
                                )}

                        </tbody>

                    </table>


                </div>            </div> */}
        </>
    )

}