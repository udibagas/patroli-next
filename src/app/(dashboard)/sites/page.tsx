'use client';
import React from "react";
import { Table } from "antd";
import SiteForm from "@/components/SiteForm";
import PageHeader from "@/components/PageHeader";
import { ReloadOutlined } from "@ant-design/icons";
import ActionButton from "@/components/buttons/ActionButton";
import AddButton from "@/components/buttons/AddButton";
import { Site } from "@/types";
import useCrud from "@/hooks/useCrud";

const SitePage: React.FC = () => {
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
  } = useCrud<Site>("/sites", "sites");

  const { isPending, data } = useFetch();

  const columns = [
    {
      title: "No.",
      width: 60,
      render: (_: string, __: Site, index: number) => index + 1
    },
    { title: "Kode", dataIndex: "code", key: "code" },
    { title: "Nama", dataIndex: "name", key: "name" },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      align: "center" as const,
      width: 80,
      render: (_: string, record: Site) => (
        <ActionButton
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Site" subtitle="Kelola data site">
        <AddButton label="Tambah Site" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: Site) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <SiteForm
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

export default SitePage;