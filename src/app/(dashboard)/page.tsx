'use client';
import React from "react";
import { Button, Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import PageHeader from "@/components/PageHeader";
import { PaginatedData, Inspection } from "@/types";
import useCrud from "@/hooks/useCrud";
import moment from "moment";

const Recipient: React.FC = () => {
  const {
    useFetch,
    refreshData,
    setCurrentPage,
    setPageSize,
    currentPage,

  } = useCrud<Inspection>("/inspections", "inspections");

  const { data, isPending } = useFetch<PaginatedData<Inspection>>();

  const columns = [
    {
      title: "No.",
      width: 60,
      key: "id",
      render: (_: string, __: Inspection, index: number) => currentPage > 1 ? (currentPage - 1) * 10 + index + 1 : index + 1,
    },
    { title: "Site", dataIndex: ["Site", "name"], key: "site", ellipsis: true },
    {
      title: "Tanggal",
      dataIndex: "reportDate",
      key: "reportDate",
      render: (_: string, record: Inspection) => {
        return moment(record.reportDate).format("DD-MMM-YYYY");
      }
    },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    {
      title: "Waktu",
      key: "waktu",
      ellipsis: true,
      render: (_: string, record: Inspection) => {
        return moment(record.createdAt).format("DD-MMM-YYYY HH:mm");
      }
    },
    { title: "Petugas", dataIndex: ["User", "name"], key: "user", ellipsis: true },
    { title: "Station", dataIndex: ["Station", "name"], key: "station", ellipsis: true },
  ];

  return (
    <>
      <PageHeader
        title="Laporan"
        subtitle="Laporan hasil patroli"
      >
        <Button
          icon={<ReloadOutlined />}
          onClick={refreshData}
        >
          Refresh
        </Button>
      </PageHeader>

      <Table
        scroll={{ y: 41 * 10 }}
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data?.rows ?? []}
        rowKey="id"
        pagination={{
          size: "small",
          current: currentPage,
          total: data?.total ?? 0,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
            setCurrentPage(page);
          },
        }}
      />

      {/* <RecipientForm
        visible={showForm}
        isEditing={isEditing}
        onCancel={handleModalClose}
        onOk={handleSubmit}
        errors={errors}
        form={form}
      /> */}
    </>
  );
};

export default Recipient;