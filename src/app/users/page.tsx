'use client';
import React from "react";
import { Table } from "antd";
import UserForm from "../components/UserForm";
import PageHeader from "../components/PageHeader";
import { ReloadOutlined } from "@ant-design/icons";
import ActionButton from "../components/buttons/ActionButton";
import AddButton from "../components/buttons/AddButton";
import { User } from "../types";
import useCrud from "../hooks/useCrud";

const UserPage: React.FC = () => {
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
  } = useCrud<User>("/users", "users");

  const { isPending, data } = useFetch();


  const columns = [
    {
      title: "No.",
      width: 60,
      render: (_: string, __: User, index: number) => index + 1
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      align: "center" as const,
      width: 80,
      render: (_: string, record: User) => (
        <ActionButton
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader title="User" subtitle="Kelola data pengguna">
        <AddButton label="Tambah User" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: User) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <UserForm
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

export default UserPage;