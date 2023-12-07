"use client";
import useSWR from "swr";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { useSearchTableContext } from "./receptions";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ReceptionTable = () => {
  const { searchFullName, petitionHasFiled } = useSearchTableContext();
  const { data, isLoading } = useSWR(
    `/api/reception/get-all${
      searchFullName ? `?searchFullName=${searchFullName}` : ""
    }${searchFullName && petitionHasFiled ? "&" : ""}${
      petitionHasFiled
        ? `${!searchFullName && "?"}petitionHasFiled=${petitionHasFiled}`
        : ""
    }`
  );

  if (isLoading) {
    return (
      <div className="w-full  h-[500px]">
        <Skeleton />
      </div>
    );
  }
  if (data) {
    return <DataTable columns={columns} data={data} />;
  }
};

export default ReceptionTable;
