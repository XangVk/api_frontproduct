import * as React from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";

import "../css/style.css";
import "../css/mainbar.css";

// component 
import Register from "./user/register";
import ProductAdd from "./product/productadd";
import Login from "../component/user/login";
import ProductReport from "./reports/reproduct";
import ProductImport from "../component/product/productimport";
import ProductimportReport from "../component/reports/reportproductimport";
import SellProduct from "./product/sellproduct";
import PdfExport from "./reports/pdf";
import Mainpage from "../component/main/mainpages";
import Productimportsell from "../component/product/productimportsell";
import Productsellreport from "../component/reports/reportsellproduct";
import Reportproductsell from "./reports/reportproductsell";

export default function MainApp() {

   const [logout, setlogouts] = React.useState(false);
   const [username, setusername] = React.useState(null);
   const [mainpages, setmainpages] = React.useState(false);

   async function token() {
      try {
         const token = localStorage.getItem("token");

         if (!token) return setlogouts(true);

         const decode_ = jwtDecode(token);
         console.log(Date.now() / 1000) // current time now 
         console.log(decode_.exp)  // current time exp token
         if (decode_ == null) return setlogouts(true);

         // console.log({"currentdata" : Date.now() / 1000}) // current time now 
         // console.log({"expires" : decode_.exp})  // current time exp token
         const current = Date.now() / 1000;

         if (decode_.exp <= current) {
            console.log(decode_)
            console.log(true)
            refresh({ data: decode_, token: token });
            // document.location.reload();
            setlogouts(true);
            // login token expires success

         } else {
            console.log(false);
            setlogouts(false);

            const name = localStorage.getItem("names");
            setusername(name)



            // valid token
         }

      } catch (error) {
      }
   }

   const refresh = async ({ data }) => {
      try {

         if (data != null) {

            if (!localStorage.getItem("username") || !localStorage.getItem("usernameId")) {
               localStorage.removeItem("token");
               document.location.reload();
               return;
            }
            let datas = {
               "usernameId": data._id,
               "username": data.username
            }
            const datalogin = await axios.post("http://127.0.0.1:3001/user/refresh", datas);
            if (datalogin.status == 200) {
               localStorage.setItem("token", datalogin.data)
               setlogouts(false);
            }
         }
      } catch (error) {
         console.log(error);
         localStorage.removeItem("token");
         document.location.reload();
      }
   }
   const logouts = () => {

      localStorage.removeItem("token");
      localStorage.removeItem("usernameId");
      localStorage.removeItem("username");
      localStorage.removeItem("names");
      document.location.reload();

   }
const mainpage = ({mains}) => {
 
    setmainpages(mains)

}


   function userbtn() {
      document.querySelector(".div").classList.toggle("showmenu");
   }
   function productbtn() {
      document.querySelector(".arrow").classList.toggle("arrow-p");
      document.querySelector(".li-product").classList.toggle("show");
   }
   function report() {
      document.querySelector(".li-report").classList.toggle("show");
      document.querySelector(".arrow").classList.toggle("arrow-r");
   }
   function sellbtn() {
      document.querySelector(".arrow").classList.toggle("arrow-s"); // icon arrow
      document.querySelector(".li-sell").classList.toggle("show");
   }




   useEffect(() => {

      token();
   }, [logout])

   return (

      <>
         {logout ? <>
            <Login />
         </> : <>

           <>
               <div className=" h-50-px bg-default py-2 pl-3 d-flex justify-content-between">
                  <div >
                     <img src={`http://127.0.0.1:3001/image/post/logo_2.png`} className="h-50-px cursor-pointer" onClick={() => mainpage({mains : false})} />

                  </div>
                  <div className=" d-flex align-items-center pr-5">
                     <img src="http://127.0.0.1:3001/image/post/user.png" className="w-30-px h-30-px mr-2" />
                     <span className="font-14-px text-white">  {username} </span>

                  </div>
               </div>
               <div className="w-100  position-relative d-flex h-93-vh">


                  <div className="border-1-solid-default h-100 main-sidebar w-255-px div">

                     <div className="w-100 d-flex position-relative  align-items-center logo-detail-nav">
                        <i className="bx bxl-c-plus-plus font-30-px text-white" ></i>
                        <span className="logo_names text-white "> ລະບົບສາງຂາຍໜ້າຮ້ານ </span>
                        <div className="icon-close" onClick={userbtn}>
                           <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                              <i className="bx bxs-chevron-left"></i>
                           </div>
                        </div>
                     </div>

                     <div className="nav-links">

                        <li>
                           <a href="/register">
                              <i className="bx bxs-user-rectangle">   </i>
                              <span className="link_names font-12-px" >  ຈັດການຜູ້ເຂົ້າໃຊ້ລະບົບ </span>
                           </a>
                        </li>

                        <li className="li-product">
                           <div className="icon-link" onClick={productbtn}>
                              <a>
                                 <i className="bx bxs-washer">   </i>
                                 <span className="link_names">  ຈັດການສິນຄ້າ    </span>
                              </a>
                              <i className="bx bxs-chevron-down arrow">  </i>
                           </div>
                           <ul className="sub-menu m-0">
                              <li className=""><a href="/productadd" > ເພີ້ມຂໍ້ມູນສິນຄ້າ </a> </li>
                              <li> <a href="/productimport">  ສິນຄ້ານຳເຂົ້າ </a> </li>
                           </ul>
                        </li>
                        <li className="li-sell">
                           <div className="icon-link" onClick={sellbtn}>
                              <a>
                                 <i className="bx bxs-washer">   </i>
                                 <span className="link_names">  ຂາຍສິນຄ້າ    </span>
                              </a>
                              <i className="bx bxs-chevron-down arrow">  </i>
                           </div>
                           <ul className="sub-menu m-0">
                              <li className=""><a href="/sellproduct" > ຂາຍສິນຄ້າ </a> </li>
                              <li> <a href="/Productimportsell"> ເພີ່ມສິນຄ້ານຳເຂົ້າ </a> </li>
                           </ul>
                        </li>
                        <li className="li-report">
                           <div className="icon-link" onClick={report}>
                              <a>
                                 <i className="bx bxs-store-alt">   </i>
                                 <span className="link_names"> ລາຍງານ </span>
                              </a>
                              <i className="bx bxs-chevron-down arrow">  </i>
                           </div>
                           <ul className="sub-menu m-0">
                              <li > <a href="/productreport"className="font-12-px"> ລາຍງານສິນຄ້າສາງສິນຄ້າ </a> </li>
                              <li> <a href="/ProductimportReport" className="font-12-px"> ລາຍງານສິນຄ້ານຳເຂົ້າທັງໝົດ </a> </li>
                              {/* <li> <a href="/pdfexport"> pdfproductexport </a> </li> */}
                              <li> <a href="/Productsellreport"className="font-12-px"> ລາຍງານການຂາຍສິນຄ້າ </a> </li>
                              <li> <a href="/Reportproductsell"className="font-12-px"> ລາຍງານສິນຄ້າຂາຍໜ້າຮ້ານ </a> </li>
                           </ul>
                        </li>

                        <li onClick={logouts}>
                           <a >
                              <i className="bx bx-power-off"> </i>
                              <span className="link_names white-space-nowrap"> ອອກຈາກລະບົບ </span>
                           </a>
                        </li>
                     </div>


                  </div>

                  <div className="home-section ">

                     <BrowserRouter >

                        <Routes>
                           <Route path="/" element={<Register />} />
                           <Route path="/register" element={<Register />} />
                           <Route path="/productadd" element={<ProductAdd />} />
                           <Route path="/productreport" element={<ProductReport />} />
                           <Route path="/productimport" element={<ProductImport />} />
                           <Route path="/ProductimportReport" element={<ProductimportReport />} />
                           <Route path="/SellProduct" element={<SellProduct />} />
                           <Route path="/pdfexport" element={<PdfExport />} />
                           <Route path="/Productimportsell" element={<Productimportsell />} />
                           <Route path="/Productsellreport" element={<Productsellreport />} />
                           <Route path="/Reportproductsell" element={<Reportproductsell />} />
                        </Routes>
                     </BrowserRouter>




                  </div>


               </div>
            </> 
          
         </>}


      </>
   )
}

const Loader = () => {


   return (

      <div className="w-100 text-center">

         <span> Loading ... </span>



      </div>

   )

}