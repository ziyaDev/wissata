"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { Drawer } from "vaul";
import { receptionType } from "@/types";
import { MergePlainteForm } from "@/components/plaints/merge-plaint-form";

export interface Data extends Zod.infer<typeof receptionType> {
  visited: {
    date: string;
    note: string;
  }[];
  id: number;
}
export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "الاسم و اللقب",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الاسم و اللقب" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <span className=" w-36 truncate underline-offset-4 hover:underline  cursor-pointer font-medium">
              {row.original.fullName}
            </span>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-card/80" />
            <Drawer.Content className=" z-50 flex flex-col  rounded-t-[10px] h-[85%]  fixed bottom-0 left-0 right-0">
              <div className="px-4 pb-8 flex  overflow-y-auto flex-col  bg-card border-t rounded-t-[10px] flex-1">
                <div className=" sticky top-0  bg-background/50 flex items-center  py-6  backdrop-blur-2xl">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0  rounded-full bg-zinc-300 " />
                </div>
                <div className=" w-full max-w-5xl mx-auto">
                  <MergePlainteForm data={row.original} />
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    ),
  },
  {
    accessorKey: "الصفة",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الصفة" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" w-36 truncate font-medium">
            {row.original.grades}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "رقم وثيقة قانونية",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم وثيقة قانونية" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" w-36 truncate font-medium">
            {row.original.docNumber}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "تم تقديم عريضة",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تم تقديم عريضة" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" w-36 truncate font-medium">
            {row.original.petitionHasFiled ? "نعم" : "لا"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "عدد الاستقبالات",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="عدد الاستقبالات" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" w-36 truncate font-medium">
            {row.original.visited.length}
          </span>
        </div>
      );
    },
  },

  //   {
  //     accessorKey: "priority",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Priority" />
  //     ),
  //     cell: ({ row }) => {
  //       const priority = priorities.find(
  //         (priority) => priority.value === row.getValue("priority")
  //       );

  //       if (!priority) {
  //         return null;
  //       }

  //       return (
  //         <div className="flex items-center">
  //           {priority.icon && (
  //             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //           )}
  //           <span>{priority.label}</span>
  //         </div>
  //       );
  //     },
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
