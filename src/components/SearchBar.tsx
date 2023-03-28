import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
// import axios from "axios";

export function SearchBar(props: any) {
  const [queryResults, setQueryResults] = useState<any>(null);
  const [cursor, setCursor] = useState<number>(-1);
  const [cursorLinkPath, setCursorLinkPath] = useState<string>("");


  return (
    <div className="relative">
      <div className="sm:w-96 placeholder-white text-white relative border border-gray-100 rounded-md shadow text-md flex items-center">
        <MdSearch size={32} className="text-white ml-4" />
        <input
          type="text"
          onBlur={() => {
            setCursor(-1);
            setQueryResults(null);
          }}
          onClick={() => setCursor(-1)}
          placeholder={props.placeholder}
          className="w-full px-3 py-3 rounded-lg border-blueGray300 bg-transparent outline-none focus:outline-none"
        />
      </div>
    </div>
  );
}
