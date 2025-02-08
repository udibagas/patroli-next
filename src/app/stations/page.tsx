'use client';
import React from "react";
import { Table } from "antd";
import StationForm from "../components/StationForm";
import PageHeader from "../components/PageHeader";
import { ReloadOutlined } from "@ant-design/icons";
import ActionButton from "../components/buttons/ActionButton";
import AddButton from "../components/buttons/AddButton";
import { Station } from "../types";
import useCrud from "../hooks/useCrud";

const StationPage: React.FC = () => {
  const {
    useFetch,
    refreshData,
    handleEdit,
    handleDelete,
    handleAdd,
    handleModalClose,
    handleSubmit,
    form,
    showForm,
    errors,
    isEditing
  } = useCrud<Station>("/stations", "stations");

  const { isPending, data } = useFetch();


  const columns = [
    { title: "Kode", dataIndex: "code", key: "code", width: 60 },
    { title: "Site", dataIndex: ["Site", "name"], key: "site" },
    { title: "Nama", dataIndex: "name", key: "name" },
    {
      title: "Area", render: (_: string, record: Station) => {
        return record.Areas.map((area) => area.name).join(", ");
      }
    },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      align: "center" as const,
      width: 80,
      render: (_: string, record: Station) => (
        <ActionButton
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Station" subtitle="Kelola data station">
        <AddButton label="Tambah Station" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: Station) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <StationForm
        visible={showForm}
        isEditing={isEditing}
        errors={errors}
        form={form}
        onCancel={handleModalClose}
        onOk={handleSubmit}
      />
    </>
  );
};

export default StationPage;