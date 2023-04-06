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

  
function AddManagerModal(props: {isOpen:boolean, handleOpen: () => void, handleClose: () => void, setManagerList: (value:any) => void}) {

    const [formData, setFormData] = React.useState({
      full_name: '',
      user_name: '',
      password: ''
    }) 

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [event.target.name]:event.target.value })
    }

    const onSubmitForm = async () => {

      const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000'
      });
  
      const response = await axiosInstance.post("/manager/managers", {data: {formData}});
      
      let url = `http://localhost:5000/manager/managers`;
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
        <Modal
          open={props.isOpen}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <h2 className='mb-2'>Add Manager</h2>
              <form id='createTicket' onSubmit={onSubmitForm}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                      <input type="text" name="first_name" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" name="user_name" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password"  onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
              </form>     
              <button className="bg-blue-400 my-2 p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
            </Box>
          
        </Modal>
      </>
    );
  }


export default function ManagerListMain() {
  const [managerList, setManagerList] = useState<any[]>(["empty"]);
  const [originalResults, setOriginalResults] = useState<any[]>([]);
  const [search, setSearch] = useState<any>("");
  const [username, setUsername] = useState<any>("");
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = (username:any) => {
    setOpenConfirm(true)
    setUsername(username);
  };
  const handleCloseConfirm = () => setOpenConfirm(false);


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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    margin: 'auto'
  };

  const getResult = async () => {
    let url = `http://localhost:5000/manager/managers`;
    const res = await axios.get(url);
    const data = res.data;
    setManagerList(data);
    setOriginalResults(data);
  }

  useEffect(() => {
    if (managerList[0]=="empty"){
      getResult();
    }
  },[managerList]);

  useEffect(()=>{
    if (search.length > 0) {
      const filtered = managerList.filter(
        (obj: { name: any; username: any }) => {
          return (
            obj.name.toLowerCase().startsWith(search.toLowerCase()) ||
            obj.username.toLowerCase().startsWith(search.toLowerCase())
          );
        }
      );
      setManagerList(filtered);
    }
    else{
      setManagerList(originalResults);
    }
  },[search])

  const handleDelete = async (username: string) => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000'
    });

    const res =  axiosInstance.delete("/manager/managers", { data: {userName: username}}).then(()=>{
      handleCloseConfirm();
      getResult();
    });
  }

  const deleteManager = (username:string) => {

    

    let url = `http://localhost:5000/manager/managers`;
    const res =  axios.delete(url, { data: {userName: username}}).then(()=>{
      handleCloseConfirm();
      getResult();
    });
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  const callback = (e:any) => {
    setSearch(e.target.value);
  }

  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <div className="backdrop-blur-main h-full">
      <HeaderMain />

        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] mt-10 md:mt-16 mb-4">
              Managers
        </div>

        <div className="p-10 flex justify-center">
          <SearchBar placeholder="Find Manager" func={callback}/>
          <div className="flex flex-row items-center">
          </div>
        </div>

        
      <div className="m-auto w-1/3 relative overflow-x-auto shadow-md sm:rounded-lg">
        {
          managerList.length > 0?
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-7">Name</th>
                  <th scope="col" className="px-6 py-7">Username</th>
                </tr>
              </thead>
                {managerList.map((result:any) => {
                  return <tbody key={result.username} id={result.username}>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      {/* <td className="px-4 py-4">{result.name}</td> */}
                      <td className="px-2 py-4">
                        <div className="pl-6 flex justify-between pr-2">
                          {toTitleCase(result.name)} 
                        </div>
                      </td>
                      <td className="px-2 py-4">
                        <div className="pl-6 flex justify-between items-center">
                          {(result.username)} 
                          <button className="pl-12 pr-6" onClick={()=>handleOpenConfirm(result.username)}>
                            <MdDelete/>
                          </button>
                          <Modal
                          open={openConfirm}
                          onClose={handleCloseConfirm}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <h2 className='mb-6 text-center'>Are You Sure You Want To Delete Manager: <span className="text-blue-700 font-bold">{username}</span></h2>           
                              <div className="flex justify-between px-8">
                                <button className="bg-red my-2 p-2 rounded-md" onClick={()=>handleDelete(username)} type="submit" form="createTicket" value="Submit">Delete</button>
                                <button className="bg-gray-400 my-2 p-2 rounded-md" onClick={handleCloseConfirm} type="submit" form="createTicket" value="Submit">Cancel</button>
                              </div>
                            </Box>
                          </Modal>
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
            <AddManagerModal isOpen={open} handleOpen={()=>handleOpen()} handleClose={()=>handleClose()} setManagerList={(value:any)=>setManagerList(value)}/>
          </>
          :
          <div className="bg-white w-2/3 text-md rounded-md opacity-25 text-black py-12 px-8 mx-auto text-center">No Results Found</div>
        }
      </div>
      
      </div>
    </div>
  );
}