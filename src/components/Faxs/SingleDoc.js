import React, { useEffect, useState } from "react";
import Header from "../commons/Header";
import SideBar from "../sideBar/SideBar";
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Alert, Button } from "@mui/material";
import { Folder } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getDocById, updateDoc } from "../../backendUrls";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};

const names = [
    { name: { en: "planning", ar: "قسم التخطيط" } },
    { name: { en: "montadaben", ar: "قسم المنتدبين" } },
    { name: { en: "info", ar: "قسم المعلومات" } },
    { name: { en: "retired", ar: "قسم المتقاعدين" } },
    { name: { en: "affairs", ar: "قسم شئون شخصيه" } },
    { name: { en: "sec", ar: "قسم السكرتاريه" } },
];

const bosses = [
    { name: { en: "chief", ar: "رئيس الفرع" } },
    { name: { en: "planChief", ar: "رئيس التخطيط" } },
    { name: { en: "montChief", ar: "رئيس المنتدبين" } },
    { name: { en: "infoChief", ar: "رئيس المعلومات" } },
];

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

function getStyles(name, sectionsName, theme) {
    return {
        fontWeight:
            sectionsName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function SingleDoc() {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    let token = localStorage.getItem('auth');
    const [isReviewed, setReviewed] = useState(false);      // check if the document is reviewed or nor
    const [sectionsName, setSectionsName] = useState([]);   // saving the chosen sections
    const [bossName, setBoss] = useState("");               // saving the chosen boss
    const [err, setErr] = useState(false);                 // state for saving possible errors
    const [data, setData] = useState({ forwardTo: '', sections: '' });
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setData({ ...data, sections: value })
        setSectionsName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const sucessAlert = () => {
        setReviewed(true);          // mark the document as reviewed to show the Alert
        setTimeout(() => {
            setReviewed(false);     // mark the document as not reviewed to close the Alert
        }, 2000);
    }

    const failAlert = (message) => {
        setErr(message);
        // if the user submit the form without entering a document show an error for 2s
        setTimeout(() => {
            setErr(null)
        }, 2000);
    }

    const handelSubmit = async(e) => {
        e.preventDefault();         // prevent the normal behavior for the form
        console.log(data.sections.length)
        if (data.sections.length === 0) {
            failAlert("من فضلك حدد القسم المختص ");
            return;
        }
        let res = await fetch(updateDoc + id,{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json",
                authorization:token
            },
            body: JSON.stringify(data)
        })
        if(res.ok){
            sucessAlert()
        }else{
            res = await res.json();
            failAlert(res.message)
        }
    }

    const getData = async () => {
        let res = await fetch(getDocById + id, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })

        if (res.status == 200) {
            res = await res.json();
            console.log('xxx',res)
            setData(res);
        } else {
            res = await res.json();
            failAlert(res.message);
        }
    }

    useEffect(() => {
        if (!id || !token) {
            navigate(-1);
        }
        getData();
    }, [])
    return (
        <>
            {console.log(data)}
            <div className="flex flex-row-reverse justify-between">
                <SideBar />
                <div className="flex flex-col overflow-auto w-full">
                    <Header />
                    <div className="flex flex-row-reverse gap-4 md:gap-24 mt-4 flex-wrap">
                        <h1 className="text-center shadow-sm rounded-full mx-auto my-2 border-gray-300 border-2 w-fit p-2 text-base font-semibold border-grey"> التاريخ : {data?.createdAt?.slice(0,10)}</h1>
                        <h1 className="text-center shadow-sm rounded-full mx-auto my-2 border-gray-400 border-2 border-grey w-fit p-2 text-lg font-bold" style={{ fontWeight: '700' }}> {data?.type === 'income' ? "وارد":"صادر"} / {data?.from}  </h1>
                        <h1 className="text-center shadow-sm rounded-full mx-auto my-2 border-gray-300 border-2 border-grey w-fit p-2 text-base font-semibold ">القيد : {data?.faxNo}</h1>
                    </div>
                    <hr className="w-full mt-4 h-4"></hr>
                    <div className="w-[90%] md:w-[65%] mx-auto">
                        <div className="flex flex-col mx-auto overflow-auto mt-8 ">
                            {data?.images?.map((img,k)=>{
                                return<img src={`/uploads/${img}`} alt="fax" key={k} className="max-w-[100%] border-2 border-gray my-2 h-auto " />
                            })}
                            
                        </div>
                        <div className="flex flex-col gap-2 w-[60%] mt-8 mx-auto" dir="rtl">
                            <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                    <label className="px-2 font-semibold text-lg">تأشيرة السيد رئيس الفرع</label>
                                    <FormControl key={1} sx={{ float: 'right' }} fullWidth>
                                        <Select
                                            multiple
                                            displayEmpty
                                            value={data.sections? data.sections : []}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>{data.sections}</em>;
                                                }
                                                return selected.join(', ');
                                            }}
                                            className="border-2 border-grey"
                                            onChange={handleChange}
                                            MenuProps={MenuProps}
                                            sx={{ color: 'red', fontSize: '1.4rem' }}
                                            dir="rtl"
                                        >
                                            {names.map((name) => {
                                                return <MenuItem
                                                    key={name.name.en}
                                                    value={name.name.ar}
                                                    style={getStyles(name.en, sectionsName, theme)}
                                                    dir="rtl"
                                                >
                                                    {name.name.ar}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                    <label className="px-2 font-semibold text-lg my-2">قرار السيد رئيس الفرع</label>
                                    <input type="text" onChange={(e) => setData({ ...data, note: e.target.value })} placeholder={data?.note} className="p-4 border-2 text-xl text-[#ff0000] border-gray-400 placeholder-red-400" />
                                    <label className="px-2 font-semibold text-lg my-2"> الاجراء المتخذ من المختص</label>
                                    <input type="text" onChange={(e) => setData({ ...data, action: e.target.value })} placeholder={data?.action} className="p-4 border-2 border-gray-400 text-xl border-gray-400 " />
                                    <label className="px-2 font-semibold text-lg my-2"> اخطار</label>
                                    <FormControl>
                                        <Select
                                            value={bossName}
                                            displayEmpty
                                            renderValue={() => { return bossName }}
                                            onChange={(e) => { setBoss(e.target.value.ar); setData({ ...data, forwardTo: e.target.value.en }) }}
                                            MenuProps={MenuProps}
                                            className="border-2 border-grey"
                                            sx={{ fontSize: '1.4rem' }}
                                            dir="rtl"
                                        >
                                            {bosses?.map((name) => {
                                                return <MenuItem
                                                    key={name.name.en}
                                                    value={name.name}
                                                    style={getStyles(name.ar, sectionsName, theme)}
                                                    dir="rtl"
                                                >
                                                    {name.name.ar}
                                                </MenuItem>
                                            })}
                                        </Select>
                                        <label className="px-2 font-semibold text-lg my-2 "> المستلم </label>
                                        <input type="text" onChange={(e) => setData({ ...data, receiver: e.target.value })} placeholder={data?.receiver} className="p-4 border-2 border-gray-400 text-xl border-gray-400 " />
                                        <Button onClick={handelSubmit} variant="contained" type="submit" sx={{ marginY: '30px', padding: '.6rem', font: 'bold', fontSize: '1.2rem' }}>تأكيد المراجعه</Button>
                                        {/* <Button variant="contained" color="warning" type="submit" sx={{ padding: '.6rem', font: 'bold', fontSize: '1.2rem' }}>طباعه</Button> */}
                                        {/* <Folder sx={{fontSize:'2rem', color:'gold'}}/> */}
                                    </FormControl>
                                </ThemeProvider>
                            </CacheProvider>
                            <div className={`fixed bottom-0 left-1 w-80 ${isReviewed ? "block" : "hidden"}`}>
                                <Alert variant="filled">
                                    <p className="pr-2 pt-[-4px] text-xl text-center"> تمت المراجعه بنجاح</p>
                                </Alert>
                            </div>
                            <div className={`fixed bottom-0 left-1 w-80 ${err ? "block" : "hidden"}`}>
                                <Alert variant="filled" color="error" icon={false} >
                                    <p className="pr-2 pt-[-4px] text-xl text-center"> {err} </p>
                                </Alert>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
