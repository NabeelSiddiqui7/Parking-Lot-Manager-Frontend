import Grid, { WithBreakpoints } from "dynamic-react-grid";
import TicketModal from "./createTicketModal";
import axios from "axios";
import { get } from "https";
import { useEffect, useState } from "react";


export function ParkingLotGrid(props: any) {
    const [width, setWidth] = useState(4);
    var indents = [];
    var key = 0;
    for (var i = 0; i < props.length; i++) {
        for(var j = 0; j < props.width; j++){
            if(props.results.spaces){
                indents.push(<TicketModal id={props.results.spaces[key].id} key={key} status={props.booked.includes(props.results.spaces[key].id)?"Taken":"Open"}/>);
            }
            key ++;
        }
    }

    useEffect(() => {
        setWidth(props.length);
       },[width]);

    return (
       <>
        <div className={`flex flex-row justify-between flex-wrap mx-auto my-12`} style={{gap:'15px', width:`${96 * width + 15 * width}px`}}>
            {indents}
        </div>
       </>
    )
}
