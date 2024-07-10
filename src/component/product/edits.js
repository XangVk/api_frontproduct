import * as React from "react";

import { useEffect, useState } from "react";
import "../../css/style.css";
export default function EditProducts({ productEdit, index, editValue, Valuechangeds }) {


    useEffect(() => {

        console.log(productEdit)

    }, [])

    return (
        <>

            <tr className="edit" key={index}>
                <td className="p-0 ">
                    <input type="text" name="nameProduct" value={index + 1} className="py-2 text-center"  readOnly="true" />
                </td>
                <td className="p-0  py-2">
                    <input type="text" name="nameProduct" onChange={Valuechangeds} value={productEdit.nameProduct} className="py-2"  />
                </td>
                <td className="p-0  py-2">
                    <input type="text" name="productnumber" value={productEdit.productnumber} onChange={Valuechangeds} className="py-2"  />
                </td>
                <td className="p-0  py-2">
                    <input type="text" name="quantity" value={productEdit.quantity} onChange={Valuechangeds} className="py-2"  />
                </td>
                <td className="p-0  py-2">

                    <button onClick={() => editValue({ index: index, isedit: false })}>  save  </button>

                </td>

            </tr>


        </>
    )

}



