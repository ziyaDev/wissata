"use client";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useSearchTableContext } from "./plaintes";

const PlaintesTableToolbar = () => {
  const inputSearchRef = useRef(null);
  const { setSearchSNumber } = useSearchTableContext();

  const handleSubmit = () => {
    const input = inputSearchRef.current;
    if ((input && input !== " ") || "") {
      //@ts-ignore
      setSearchSNumber(input.value);
    }
  };

  return (
    <div className=" flex justify-between w-full items-end ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <Input className=" w-96" ref={inputSearchRef} placeholder="بحث..." />
      </form>
    </div>
  );
};

export default PlaintesTableToolbar;
