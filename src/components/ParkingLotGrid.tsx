import Grid, { WithBreakpoints } from "dynamic-react-grid";

export function ParkingLotGrid() {
    return (
       <div className="text-white p-4 grid gap-4 sm:grid-cols-3 max-w-md mx-auto">
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-500 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-500 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-500 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
            <div className="h-16 bg-gray-50 sm:h-24 sm:square"></div>
       </div>
    )
}
