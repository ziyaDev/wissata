"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { Drawer } from "vaul";
import { TasksType, receptionType } from "@/types";
import MergePlaintForm from "@/components/plaints/merge-plaint-form";
import { TaskStatus } from "@/components/ui/status";

export const columns: ColumnDef<TasksType>[] = [
  {
    accessorKey: "المهمة",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="المهمة" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className=" w-36 truncate underline-offset-4 hover:underline  cursor-pointer font-medium">
          {row.original.title}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "صاحب المهمة",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="صاحب المهمة" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" w-36 truncate font-medium">
            {row.original.createdBy}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "الوصف",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الوصف" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" w-36 truncate font-medium">
            {row.original.description}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "الحالة",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الحالة" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="  w-28 truncate ">
            <TaskStatus status={row.original.status} />
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
