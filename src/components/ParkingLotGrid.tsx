import Grid, { WithBreakpoints } from "dynamic-react-grid";
import TicketModal from "./createTicketModal";

export function ParkingLotGrid() {
    return (
       <div className="text-white p-4 grid gap-4 sm:grid-cols-3 max-w-md mx-auto">
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>    
            <TicketModal/>
            <TicketModal/>
            <TicketModal/>     
       </div>
    )
}
