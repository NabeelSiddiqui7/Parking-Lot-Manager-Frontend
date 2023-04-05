import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain1.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {SlArrowRight} from "react-icons/sl"
import {MdDelete} from "react-icons/md"
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";

function NewModal(props: {isOpen:boolean, handleOpen: () => void, handleClose: () => void, setManagerList: (value:any) => void}) {

  const onSubmitForm = async () => {
    let url = `http://localhost:5000/manager/managers`;
      const res =  axios.post(url);
      const res2 = await axios.get(url);
      const data = res2.data;
      props.setManagerList(data);
    }


    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    };

    return (
      <>
        {/* <button onClick={props.handleOpen()}>
          <div className={`h-16 ${colour} sm:h-24 sm:square`}></div>
        </button> */}
        <Modal
          open={props.isOpen}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <h2 className='mb-2'>Book Spot: X</h2>
              <form id='createTicket' onSubmit={onSubmitForm}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                      <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
              </form>            
              <button className="bg-blue-400 my-2 p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
            </Box>
          
        </Modal>
      </>
    );
  }


export default function ManagerListMain() {
  const [managerList, setManagerList] = useState<any[]>(["empty"]);
  const [open, setOpen] = useState(false);


   function toTitleCase(title: string) {
    if (title){
      return title.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    else {
      return ""
    }
  }

  const getResult = async () => {
    let url = `http://localhost:5000/manager/managers`;
    const res = await axios.get(url);
    const data = res.data;
    setManagerList(data);
  }

  useEffect(() => {
    console.log()
    if (managerList[0]=="empty"){
      getResult();
    }
  })


  const deleteManager = (username:string) => {
    let url = `http://localhost:5000/manager/managers`;
    // const res =  axios.delete(url);
    const res =  axios.delete(url, { data: {userName: username}});
  
    getResult()
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <div className="backdrop-blur-main h-full">
      <HeaderMain />

        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] mt-10 md:mt-16 mb-4">
              Managers
        </div>

        <div className="p-10 flex justify-center">
          <SearchBar placeholder="Find Manager"/>
          <div className="flex flex-row items-center">
            <p className="mx-5 text-white">Filter:</p>
            <Select className="text-base text-black"/>
          </div>
        </div>

        
      <div className="m-auto w-1/3 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-7">Name</th>
                </tr>
              </thead>
                {managerList.map((result:any) => {
                  return <tbody key={result.username} id={result.username}>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      {/* <td className="px-4 py-4">{result.name}</td> */}
                      <td className="px-2 py-4">
                        <div className="pl-6 flex">
                          {toTitleCase(result.name)} 
                          {/* <Link className="pl-12" to={`/ParkingLot/${result.id}`}><MdDelete/></Link></div> */}
                          <button className="pl-12" onClick={()=>deleteManager(result.username)}>
                            <MdDelete/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>                
                })}
            </table>
            <button className="mt-3 w-full text-white bg-blue-400 py-1">
              <div className="flex justify-center items-center" onClick={()=>handleOpen()}>
                Add Manager
                <AiOutlinePlusCircle size={"1.25rem"} className="m-2"/>
              </div>
            </button>
            <NewModal isOpen={open} handleOpen={()=>handleOpen()} handleClose={()=>handleClose()} setManagerList={(value:any)=>setManagerList(value)}/>
          </div>
          
      </div>
    </div>
  );
}