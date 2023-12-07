"use client";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useSearchTableContext } from "./receptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReceptionTableToolbar = () => {
  const inputSearchRef = useRef(null);
  const { setSearchFullName, setPetitionHasFiled } = useSearchTableContext();

  const handleSubmit = () => {
    const input = inputSearchRef.current;
    if ((input && input !== " ") || "") {
      //@ts-ignore
      setSearchFullName(input.value);
    }
  };

  return (
    <div className=" flex justify-between w-full items-end">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <Input className=" w-96" ref={inputSearchRef} placeholder="بحث..." />
      </form>
      <Tabs defaultValue="all" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="" onClick={() => setPetitionHasFiled("with")}>
            تم تقديم العريضة
          </TabsTrigger>
          <TabsTrigger value="all" onClick={() => setPetitionHasFiled(null)}>
            الكل
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ReceptionTableToolbar;
