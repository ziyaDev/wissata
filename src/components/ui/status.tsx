import React from "react";
import { Badge } from "./badge";
import { CheckCircle2, History, Loader } from "lucide-react";

const TaskStatus = ({
  status,
}: {
  status: "pending" | "complete" | "processing";
}) => {
  switch (status) {
    case "pending":
      return (
        <div className=" flex gap-2 items-center  ">
          <Loader className=" h-4 w-4  " />
          قيد الانتظار
        </div>
      );
    case "complete":
      return (
        <div className=" flex gap-2 items-center ">
          <CheckCircle2 className=" h-4 w-4  text-green " />
          تم الانتهاء
        </div>
      ); // Add content for "complete" case
    case "processing":
      return (
        <div className=" flex gap-2 items-center  ">
          <History className="  h-4 w-4" />
          قيد المعالجة
        </div>
      ); // Add content for "processing" case
    default:
      return <div>Unknown Status</div>; // Handle unexpected or undefined status values
  }
};

export { TaskStatus };
