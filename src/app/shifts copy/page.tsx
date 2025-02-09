'use client';
import React from "react";
import { Switch, Table } from "antd";
import ShiftForm from "../components/ShiftForm";
import PageHeader from "../components/PageHeader";
import { ReloadOutlined } from "@ant-design/icons";
import ActionButton from "../components/buttons/ActionButton";
import AddButton from "../components/buttons/AddButton";
import { Shift } from "../../types";
import useCrud from "../../hooks/useCrud";

const ShiftPage: React.FC = () => {
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
  } = useCrud<Shift>("/shifts", "shifts");

  const { isPending, data } = useFetch();


  const columns = [
    {
      title: "No.",
      width: 60,
      render: (_: string, __: Shift, index: number) => index + 1
    },
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Mulai", dataIndex: "start", key: "start" },
    { title: "Selesai", dataIndex: "end", key: "end" },
    {
      title: "Hari Berikutnya", render: (_: string, record: Shift) => {
        return <Switch checked={record.nextDay} disabled />
      }
    },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      align: "center" as const,
      width: 80,
      render: (_: string, record: Shift) => (
        <ActionButton
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Shift" subtitle="Kelola data shift">
        <AddButton label="Tambah Shift" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: Shift) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <ShiftForm
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

export default ShiftPage;