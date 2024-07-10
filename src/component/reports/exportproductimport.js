import * as React from "react";

import * as XLSX from "xlsx";

import * as XLSXPopulate from "xlsx-populate/browser/xlsx-populate";


const Excelexporthelper = ({ data }) => {
    const createdownloaddata = () => {
        handleexport().then((url) => {
            console.log(url);

            const downloadAnchorNode = document.createElement("a");

            downloadAnchorNode.setAttribute("href", url);
            downloadAnchorNode.setAttribute("download", "export.xlsx");
            downloadAnchorNode.click();
            downloadAnchorNode.remove();

        });
    }

    const workBook2blob = (workbook) => {

        const wopts = {
            bookType: "xlsx",
            type: "binary"
        };

        const wbout = XLSX.write(workbook, wopts);
        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        });
        return blob;
    };

    const s2ab = (s) => {

        const buf = new ArrayBuffer(s.length);
        console.log(buf);

        const view = new Uint8Array(buf);
        console.log(view);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i);
        }
        console.log(data);
        return buf;
    };

    const handleexport = () => {
        const title = [{ A: "ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ" }];
        const title1 = [{ A: "ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ ວັດທະນາຖາວອນ" }];
        const title2 = [{ A: "ລາຍງານສິນຄ້າ" }];

        let talbe1 = [
            {
                A: "ລຳດັບ",
                B: "ຊື່ສິນຄ້າ",
                C: "ຈຳນວນສິນຄ້າ",
                D: "ວັນທີ",
                E: "ລາຄາສິນຄ້າ",
                F: "ລວມລາຄາ"
            }];

        data.forEach((element, index) => {

            talbe1.push({
                A: index + 1,
                B: element.nameProduct,
                C: element.quantity,
                D: element.createdAt,
                E: element.amount,
                F: parseInt(element.quantity) * parseInt(element.amount)
            });
        });

        talbe1 = [{ B: "ວັນທີ : " + new Date().getDate() + "/" + parseInt(new Date().getMonth() + 1) + "/" + new Date().getFullYear(), C: "ຈຳນວນລາຍການ :" + data.length }]
            .concat(talbe1)
            .concat([{ B: "ຈຳນວນສິນຄ້າທັງໝົດ : ", F: "ລວມລາຄາ :" + "0" }]);

        const finalData = [...title, ...title1, ...title2, ...talbe1];
        console.log(finalData);

        const wb = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true
        });
        XLSX.utils.book_append_sheet(wb, sheet, "export_product");

        const workbookBlob = workBook2blob(wb);

        var headerIndexs = [];
        finalData.forEach((data, index) =>
            data["A"] !== "nameProducts" ? headerIndexs.push(index) : null
        ); //  "nameroduct" != name field

        console.log(headerIndexs);

        const totalRecords = data.length;

        const dataInfo = {
            titleCell: "A1",
            titleRange: "A1:F1",
            tbodyRange: `A6:F${finalData.length + 5}`,
            theadRange: headerIndexs?.length >= 3 ? `A${headerIndexs[0] + 4}:F${headerIndexs[0] + 4}` : null,
            theadRange1: headerIndexs?.length >= 2 ? `A${headerIndexs[1] + 1}:F${headerIndexs[1] + 1}` : null,
            tFirstColumnRange: headerIndexs?.length >= 1 ? `A${headerIndexs[0] + 5}:F${headerIndexs[0] + 5}` : null,
            tLastColumnRange: headerIndexs?.length >= 1 ? `A${headerIndexs.length}:F${headerIndexs.length}` : null,
            tFirstColumnRange1: headerIndexs?.length >= 1 ? `A${headerIndexs[1] + 1}:A${totalRecords + headerIndexs[1] + 1}` : null,
            tLastColumnRange1: headerIndexs?.length >= 1 ? `F${headerIndexs[1] + 1}:F${totalRecords + headerIndexs[1] + 1}` : null
        }; //    tFirstColumnRange:  `A${5}:F${5}` : null,

        const dataInfo2 = {
            titelCell: "A2",
            titleRange: "A2:F2",
            tbodyRange: `A6:F${finalData.length + 5}`,
            theadRange: headerIndexs?.length >= 1 ? `A${headerIndexs[0] + 1}:F${headerIndexs[0] + 1}` : null,
            theadRange1: headerIndexs?.length >= 2 ? `A${headerIndexs[1] + 1}:F${headerIndexs[1] = 1}` : null,
            tFirstColumnRange: headerIndexs?.length >= 1 ? `A${headerIndexs[0] + 1}:A${headerIndexs[0] + 1}` : null,
            tLastColumnRange: headerIndexs?.length >= 1 ? `G${headerIndexs[0] + 1}:F${headerIndexs[0] + 1}` : null,
            tFirstColumnRange1: headerIndexs?.length >= 1 ? `A${headerIndexs[1] + 1}:A${headerIndexs[1] + 1}` : null,
            tLastColumnRange1: headerIndexs?.length >= 1 ? `F${headerIndexs[1] + 1}:F${headerIndexs[1] + 1}` : null
        }

        const dataInfo3 = {
            titleCell: "A3",
            titleRange: "A3:F3",
            tbodyRange: `A3:F3${finalData.length}`,
            theadRange: headerIndexs?.length >= 1 ? `A${headerIndexs[0] + 1}:G${headerIndexs[0] + 1}` : null,
            theadRange1: headerIndexs?.length >= 2 ? `A${headerIndexs[1] + 1}:G${headerIndexs[1] = 1}` : null,
            tFirstColumnRange: headerIndexs?.length >= 1 ? `A${headerIndexs[0] + 1}:A${totalRecords + headerIndexs[0] + 1}` : null,
            tLastColumnRange: headerIndexs?.length >= 1 ? `G${headerIndexs[0] + 1}:G${totalRecords + headerIndexs[0] + 1}` : null,
            tFirstColumnRange1: headerIndexs?.length >= 1 ? `A${headerIndexs[1] + 1}:A${totalRecords + headerIndexs[1] + 1}` : null,
            tLastColumnRange1: headerIndexs?.length >= 1 ? `G${headerIndexs[0] + 1}:G${totalRecords + headerIndexs[0] + 1}` : null,
        };
        return addStyle(workbookBlob, dataInfo, dataInfo2, dataInfo3);

    };
    const addStyle = (workbookBlob, dataInfo, dataInfo2, dataInfo3) => {
        return XLSXPopulate.fromDataAsync(workbookBlob).then((workbook) => {
            workbook.sheets().forEach((sheet) => {
                sheet.usedRange().style({
                    fontFamily: "Saysettha OT",
                    verticalAlignment: "center",
                    fontSize: "10"
                });

                sheet.column("A").width(10);
                sheet.column("B").width(40);
                sheet.column("C").width(20);
                sheet.column("D").width(35);
                sheet.column("E").width(20);
                sheet.column("F").width(20)

                sheet.range(dataInfo.titleRange).merged(true).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                    fontColor: "#000000"
                });

                if (dataInfo.tbodyRange) {
                    sheet.range(dataInfo.tbodyRange).style({
                        horizontalAlignment: "center",
                        fontSize: "10",
                        fontColor: "#dddddd"
                    });
                }
                sheet.range(dataInfo2.titleRange).merged(true).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                    fontColor: "#000000"
                });

                sheet.range(dataInfo3.titleRange).merged(true).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                    fontColor: "#000000"
                });
                sheet.range(dataInfo.theadRange).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center"
                })
                if (dataInfo.tFirstColumnRange) {
                    sheet.range(dataInfo.tFirstColumnRange).style({
                        bold: true,
                        verticalAlignment: "center",
                        horizontalAlignment: "center",
                        fontColor : "ffffff",
                        fill : "808080"
                    });
                }
                if (dataInfo.tLastColumnRange) {
                    sheet.range(dataInfo.tLastColumnRange).style({
                        bold: true
                    });
                }

            });
            return workbook.outputAsync().then((workbookBlob) => URL.createObjectURL(workbookBlob));
        });
    };

    return (
        <div>
            <button onClick={() => { createdownloaddata() }} >
                export
            </button>
        </div>
    )


}

export default Excelexporthelper;