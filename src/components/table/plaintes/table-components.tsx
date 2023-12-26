"use client";
import useSWR from "swr";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchTableContext } from "./plaintes";

const PlaintesTable = () => {
  const { searchSNumber } = useSearchTableContext();
  const { data, isLoading } = useSWR(
    `/api/plainte/get-all${
      searchSNumber ? `?searchSNumber=${searchSNumber}` : ""
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

export default PlaintesTable;
