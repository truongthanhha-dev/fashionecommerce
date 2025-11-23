"use client";

import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

// component DataTable nhận vào:columns(cột),data: Mảng dữ liệu để hiển thị trong bảng,searchKey: Khóa tìm kiếm 
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  // Search Input
  return (
    <div className="py-5 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="collection-search-input"
        />
      </div>

      {/* Hiển thị Bảng */}
      <div className="collection-table-wrapper">
        <Table className="collection-table">
        {/* Hiển thị phần tiêu đề (header) của bảng với các tên cột. */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="collection-table__header-row"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="collection-table__head">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* Hiển thị phần nội dung của bảng, chứa các hàng dữ liệu. */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="collection-table__row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="collection-table__cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Nếu không có kết quả (không có hàng nào để hiển thị), hiển thị dòng "No results".
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Phân Trang:Hai nút "Previous" và "Next" */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          className="collection-pagination__button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="collection-pagination__button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Kế tiếp
        </Button>
      </div>
    </div>
  );
}
