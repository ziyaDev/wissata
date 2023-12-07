import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm  text-muted-foreground">
        {table.getFilteredRowModel().rows.length} من النتائج
      </div>
      <div className="flex items-center gap-x-6 lg:space-x-8">
        <div className="flex items-center gap-x-4">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium">النتائج في الجدول</p>
        </div>
        <div className="flex w-[100px] gap-1 items-center justify-center text-sm font-medium">
          صفحة
          <span className=" mx-2">
            {table.getState().pagination.pageIndex + 1}
          </span>
          من
          <span className=" mx-2">{table.getPageCount()}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 "
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            عودة
          </Button>{" "}
          <Button
            variant="outline"
            className="h-8 w-8 "
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            تالي
          </Button>
        </div>
      </div>
    </div>
  );
}
