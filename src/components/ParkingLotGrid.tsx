import Grid, { WithBreakpoints } from "dynamic-react-grid";
import TicketModal from "./createTicketModal";
import axios from "axios";
import { get } from "https";


export function ParkingLotGrid() {
    return (
       <>
        <div className="text-white p-4 grid gap-4 sm:grid-cols-3 max-w-md mx-auto">
                <TicketModal status={"Open"}/>
                <TicketModal status={"Open"}/>
                <TicketModal status={"Active"}/>
                <TicketModal status={"Open"}/>
                <TicketModal status={"Taken"}/>
                <TicketModal status={"Open"}/>
                <TicketModal status={"Taken"}/>
                <TicketModal status={"Open"}/>
                <TicketModal status={"Taken"}/>    
                <TicketModal status={"Open"}/>
                <TicketModal status={"Open"}/>
                <TicketModal status={"Open"}/>     
        </div>
        {/* <div className={`h-16 bg-gray-50 sm:h-24 sm:square`}></div> */}
       </>
    )
}
