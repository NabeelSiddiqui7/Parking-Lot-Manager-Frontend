import Grid, { WithBreakpoints } from "dynamic-react-grid";
import TicketModal from "./createTicketModal";
import axios from "axios";
import { get } from "https";


export function ParkingLotGrid(props: any) {
    var indents = [];
    for (var i = 0; i < props.length; i++) {
        for(var j = 0; j < props.width; j++){
            indents.push(<TicketModal status={"Open"}/>);
        }
    }
    return (
       <>
        <div className={`text-white p-4 grid gap-5 sm:grid-cols-${props.length} mx-auto`}>
            {indents}
            {/* <TicketModal status={"Open"}/>
            <TicketModal status={"Open"}/>
            <TicketModal status={"Active"}/>
            <TicketModal status={"Open"}/>
            <TicketModal status={"Taken"}/>
            <TicketModal status={"Open"}/>
            <TicketModal status={"Taken"}/>
            <TicketModal status={"Open"}/>
            <TicketModal status={"Taken"}/>    
            <TicketModal status={"Open"}/>    */}
        </div>
        {/* <div className={`h-16 bg-gray-50 sm:h-24 sm:square`}></div> */}
       </>
    )
}
