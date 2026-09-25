import {
  flexRender,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  useLegacyTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from "lucide-react";

interface DataTableProps<TData extends RowData> {
  columns: LegacyColumnDef<TData, unknown>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumn?: string;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder,
  searchColumn,
}: DataTableProps<TData>) {
  const { t } = useTranslation();
  const resolvedPlaceholder = searchPlaceholder ?? t("Search...");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useLegacyTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchColumn && (
        <div className="relative max-w-sm">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder={resolvedPlaceholder}
            aria-label={resolvedPlaceholder}
            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn(searchColumn)?.setFilterValue(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      aria-sort={
                        canSort
                          ? sorted === "asc"
                            ? "ascending"
                            : sorted === "desc"
                              ? "descending"
                              : "none"
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          role={canSort ? "button" : undefined}
                          tabIndex={canSort ? 0 : undefined}
                          className={
                            canSort
                              ? "flex cursor-pointer select-none items-center gap-1 focus-visible:outline-2 focus-visible:outline-ring"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (!canSort) return;
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && <ArrowUpDown className="h-3 w-3" aria-hidden="true" />}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t("No results.")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {table.getFilteredRowModel().rows.length === 0
            ? t("Showing 0 results")
            : t("Showing {{from}} to {{to}} of {{total}} results", {
                from:
                  table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
                to: Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                ),
                total: table.getFilteredRowModel().rows.length,
              })}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={t("Previous page")}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <span className="text-sm">
            {t("Page {{page}} of {{pages}}", {
              page: table.getState().pagination.pageIndex + 1,
              pages: Math.max(table.getPageCount(), 1),
            })}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={t("Next page")}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
