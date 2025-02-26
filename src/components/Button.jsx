import React from "react";

export default function Button(props) {
  return (
    <button className="px-8 mx-auto py-4 rounded-md border-2 border-blue bg-slate-950 border-blue-400 border-solid blueshadow duration-200 ">
      {props.text}
    </button>
  );
}
