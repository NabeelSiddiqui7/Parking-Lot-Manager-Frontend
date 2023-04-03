import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "../styles/HeaderMain.module.css";

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

export default function TicketModal(props:any) {
  const [open, setOpen] = React.useState(false);
  const [colour, setColour] = React.useState("bg-gray-50");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(()=>{
    if(props.status == "Open"){
        setColour("bg-red-700");
    }
    else if (props.status == "Active"){
        setColour("bg-blue-400");
    }
    else{
        setColour("bg-gray-400");
    }
  })

  return (
    <>
      <button onClick={handleOpen}>
        <div className={`h-16 ${colour} sm:h-24 sm:square`}></div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.status == "Open" ?(
          <Box sx={style}>
            <h2 className='mb-2'>Book Spot: X</h2>
            <form id='createTicket'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Plate</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    <h2 className='my-4'>Total: $</h2>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
            </form>            
            <button className="bg-blue-400 my-2 p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
          </Box>
        )
        : 
        (
          <Box sx={style}>
            <h2 className='mb-2'>Extend Spot: X</h2>
            <form id='createTicket'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Plate: </label>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
              <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
              <h2 className='my-4'>Total: $</h2>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
              <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
              <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
              <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
            </form>            
            <button className="bg-blue-400 my-2 p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
          </Box>
        )}
      </Modal>
    </>
  );
}