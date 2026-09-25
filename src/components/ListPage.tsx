import type { RowData } from "@tanstack/react-table";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { Header } from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { ErrorState, LoadingState } from "@/components/DataState";
import { useAsyncData } from "@/hooks/useAsyncData";

interface ListPageProps<T extends RowData> {
  title?: string;
  subtitle: string;
  loader: () => Promise<T[]>;
  columns: LegacyColumnDef<T, unknown>[];
  searchColumn?: string;
  searchPlaceholder?: string;
}

export function ListPage<T extends RowData>({
  title,
  subtitle,
  loader,
  columns,
  searchColumn,
  searchPlaceholder,
}: ListPageProps<T>) {
  const { data, loading, error, reload } = useAsyncData(loader);

  return (
    <div className="space-y-6">
      <Header title={title} subtitle={subtitle} />
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={columns}
          data={data ?? []}
          searchColumn={searchColumn}
          searchPlaceholder={searchPlaceholder}
        />
      )}
    </div>
  );
}
