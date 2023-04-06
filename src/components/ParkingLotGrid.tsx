import Grid, { WithBreakpoints } from "dynamic-react-grid";
import TicketModal from "./createTicketModal";
import axios from "axios";
import { get } from "https";
import { useEffect, useState } from "react";


export function ParkingLotGrid(props: any) {
    const [width, setWidth] = useState(4);
    const [status, setStatus] = useState(props.status);
    var indents = [];
    var key = 0;
    for (var i = 0; i < props.length; i++) {
        for(var j = 0; j < props.width; j++){
            if(props.results.spaces){
                indents.push(<TicketModal rate={props.rate} id={props.results.spaces[key].id} key={key} status={props.booked.includes(props.results.spaces[key].id)?"Taken":"Open"}/>);
            }
            key ++;
        }
    }

    useEffect(() => {
        setWidth(props.length);
       },[width]);

    return (
       <>
        <div className={`flex flex-row justify-between flex-wrap mx-auto my-12`} style={{gap:'15px', width:`${64 * width + 15 * width}px`}}>
            {indents}
        </div>
        <div className={`flex flex-row justify-between flex-wrap mx-auto`}>
            <div className="flex flex-col mx-4">
                <div className={`h-6 w-6 m-auto bg-gray-50`}></div>
                <p className="text-white mt-2">Available</p>
            </div>
            <div className="flex flex-col mx-4">
                <div className={`h-6 w-6 m-auto bg-gray-400`}></div>
                <p className="text-white mt-2">Taken</p>
            </div>
            <div className="flex flex-col mx-4">
                <div className={`h-6 w-6 m-auto bg-blue-400 border-solid border-2 border-cyan-100`}></div>
                <p className="text-white mt-2">Booked</p>
            </div>
        </div>
       </>
    )
}
