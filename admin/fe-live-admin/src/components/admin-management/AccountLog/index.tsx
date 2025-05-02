import useAccountLog from "@/hooks/useAccountLog.ts";
import {
  DataTable,
  TableSampleFilterType,
} from "@/components/common/DataTable.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { NavLink } from "react-router-dom";
import { APP_DASHBOARD_PATH } from "@/router";
import { Slash } from "lucide-react";
import { getAccountLogTableColumns } from "@/components/admin-management/AccountLog/columns.tsx";
import { useActions } from "@/hooks/useActions.tsx";
import { useAdminsList } from "@/hooks/useAdminsList";
import { UserMiniResponse } from "@/type/users";
import { useTranslation } from "react-i18next";

const AccountLog = () => {
  const { t } = useTranslation();
  const { actions } = useActions();
  const { data: accounts } = useAdminsList();
  const transformUserMiniResponse = (
    data: UserMiniResponse[]
  ): { label: string; value: string }[] => {
    return data?.map((user) => ({
      label: `@${user.username}`,
      value: user.username,
    }));
  };

  const transformedOptions = transformUserMiniResponse(accounts);

  const {
    data,
    totalItems,
    currentPage,
    pageLimit,
    isLoading,
    sortBy,
    sortOrder,
    action,
    keyword,
    refetchData,
    setCurrentPage,
    setPageLimit,
    setSortBy,
    setSortOrder,
    setAction,
    setKeyword,
  } = useAccountLog();

  const columns = () =>
    getAccountLogTableColumns({
      sort: {
        sortBy,
        sortOrder,
        setSortBy,
        setSortOrder,
      },
    });

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageLimitChange = (limit: number) => setPageLimit(limit);
  const handleFilteredByUser = (value: string) => setKeyword(value);
  const handleFilteredByAction = (value: string) => setAction(value);

  return (
    <div className="px-8 pb-4">
      <div className="py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <NavLink to={APP_DASHBOARD_PATH}>
                  {t("accountlog.Dashboard")}
                </NavLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>
                {t("accountlog.Account Log Page")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DataTable
        data={data}
        totalCount={totalItems}
        isLoading={isLoading}
        onRefresh={refetchData}
        columns={columns()}
        actions={{
          sampleFilters: [
            {
              type: TableSampleFilterType.DATA_COMBO,
              description: t("accountlog.User —"),
              placeholder: t("accountlog.Select"),
              selectedValue: keyword,
              options: [{ label: "All", value: "All" }, ...transformedOptions],
              handleFilter: (selectedOption: string): void =>
                handleFilteredByUser(selectedOption),
            },
            {
              type: TableSampleFilterType.DATA_COMBO,
              description: t("accountlog.Action —"),
              placeholder: t("accountlog.Select"),
              selectedValue: action,
              options: [{ label: "All", value: "All" }, ...actions],
              handleFilter: (selectedOption: string): void =>
                handleFilteredByAction(selectedOption),
            },
          ],
        }}
        pagination={{
          rowsPerPage: {
            value: pageLimit,
            onChange: (value: number) => handlePageLimitChange(value),
          },
          pages: {
            totalCount: totalItems,
            currentPage,
            limit: pageLimit,
            handlePageChange,
          },
        }}
      />
    </div>
  );
};

export default AccountLog;
