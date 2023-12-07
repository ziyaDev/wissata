"use client";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { TasksType } from "@/types";
import { columns } from "./column";
import { DataTable } from "../data-table";

const ReceptionTable = () => {
  const { data, isLoading } = useSWR<TasksType[]>(`/api/task/get-all`);

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
