import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "../styles/HeaderMain.module.css";import axios from "axios";
import TimePicker from "react-time-picker";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  margin: 'auto'
};

function SelectLabels(props: {hours: string, minutes:string, setHours: (value:string) => void, setMinutes: (value:string) => void}) {

  const handleChange = (event: SelectChangeEvent) => {
    props.setHours(String(event.target.value));
  };

  const handleMinutesChange = (event: SelectChangeEvent) => {
    props.setMinutes(event.target.value);
  };


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Hours</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.hours}
          label="Hours"
          onChange={handleChange}
        >
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>01</MenuItem>
          <MenuItem value={2}>02</MenuItem>
          <MenuItem value={3}>03</MenuItem>
          <MenuItem value={4}>04</MenuItem>
          <MenuItem value={5}>05</MenuItem>
          <MenuItem value={6}>06</MenuItem>
          <MenuItem value={7}>07</MenuItem>
          <MenuItem value={8}>08</MenuItem>
        </Select>
        <FormHelperText>Hours</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Minutes</InputLabel>
        <Select
          value={props.minutes}
          onChange={handleMinutesChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <FormHelperText>Minutes</FormHelperText>
      </FormControl>
    </div>
  );
}


export default function TicketModal(props:any) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(props.status);
  const [colour, setColour] = React.useState("bg-gray-50");
  const [bookTicketHours, setHours] = React.useState('0');
  const [bookTicketMinutes, setMinutes] = React.useState('0');
  const [extendHours, setExtendHours] = React.useState('0');
  const [extendMinutes, setExtendMinutes] = React.useState('0');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 


  const [formData, setFormData] = React.useState({
    full_name: '',
    license_plate: '',
    time: new Date()
  }) 

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]:event.target.value })
  }

  const getResult = async () => {
    let url = `http://localhost:5000/user/ticket`;
    const res = await axios.get(url, {params: {id: props.id }}).then((res)=>{
      const data = res.data;
      if(data.length > 0){
        console.log(data);
        if(data[0].booked == true){
          setStatus("Booked");
          setColour("bg-blue-400 border-solid border-4 border-cyan-100");
        }
      }
    });
  }

  React.useEffect(()=>{
    if(status == "Open"){
        setColour("bg-gray-50");
    }
    else if (status == "Active"){
        setColour("bg-blue-400");
    }
    else{
        setColour("bg-gray-400");
    }
  },[status]);

  const createTicket = async () => {

    const date = new Date(); 
    const isoString = date.toISOString(); 
    const dateString = isoString.replace("T", " ").replace("Z", ""); 

    let tempDate = dateString.split(" ");
    let temphours = ((Number(tempDate[1].split(":")[0])%12)+Number(bookTicketHours))%12;
    let tempminutes = ((Number(tempDate[1].split(":")[1])+Number(bookTicketMinutes)));
    if (tempminutes>60){
      temphours+=1
      tempminutes = tempminutes % 60
    }

    let updatedHour = tempDate[1].split(":")[0]
        updatedHour = String(temphours)

    let updatedMinutes = tempDate[1].split(":")[1]
        updatedMinutes = String(tempminutes)

    let updatedTimeString = String(updatedHour)+(":")+String(updatedMinutes)+(":")+tempDate[1].split(":")[2]
    let updatedDateStamp = tempDate[0] + " "+ updatedTimeString

    // Sending the request
    let url = `http://localhost:5000/user/ticket`;
    const requestBody: URLSearchParams = new URLSearchParams();
    requestBody.append("spaceid", (props.id));
    requestBody.append("time", updatedDateStamp);

    const response = await axios.post(url, requestBody).then(()=>{
      getResult();
    });
    }

  const getRate = (rhours:string, rminutes:string) => {
    let rate = props.rate;
    let totalPrice = rate * (Number(rhours)+Number(rminutes)/60);
    return totalPrice.toFixed(2);
  }

  getResult();

  return (
    <>
      <button className={`${status!="Taken"?'cursor-pointer':'cursor-default'}`} id={props.id} onClick={handleOpen} style={{width: '64px', height: '64px'}}>
        <div className={`h-16 ${colour} sm:h-16`}></div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {status == "Open" ?(
          <Box sx={style}>
            <h2 className='mb-2'>Book Spot: {props.id}</h2>
            <form id='createTicket' onSubmit={createTicket}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input type="text" name="full_name" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Plate</label>
                    <input type="text" name="license_plate" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                    {/* <input type="text" name="time" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/> */}
                    <SelectLabels hours={bookTicketHours} minutes={bookTicketMinutes} setHours={setHours} setMinutes={setMinutes}/>
                    <h2 className='my-4'>Total: ${getRate(bookTicketHours, bookTicketMinutes)}</h2>
            </form>            
            <button className="bg-blue-400 my-2 text-white p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
          </Box>
        )
        : status == "Booked"? 
        (
          <Box sx={style}>
            <h2 className='mb-2'>Extend Spot: {props.id}</h2>
            <form id='createTicket'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Plate: </label>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
              {/* <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/> */}
              <SelectLabels hours={extendHours} minutes={extendMinutes} setHours={setExtendHours} setMinutes={setExtendMinutes}/>
              <h2 className='my-4'>Total: ${getRate(extendHours, extendMinutes)}</h2>
            </form>            
            <button className="bg-blue-400 my-2 p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
          </Box>
        ):<></>}
      </Modal>
    </>
  );
}