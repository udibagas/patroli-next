'use client';
import React from "react";
import { Table } from "antd";
import InspectionTemplateForm from "../components/InspectionTemplateForm";
import PageHeader from "../components/PageHeader";
import { ReloadOutlined } from "@ant-design/icons";
import ActionButton from "../components/buttons/ActionButton";
import AddButton from "../components/buttons/AddButton";
import { InspectionTemplate } from "../types";
import useCrud from "../hooks/useCrud";

const InspectionTemplatePage: React.FC = () => {
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
  } = useCrud<InspectionTemplate>("/inspection-templates", "inspection-templates");

  const { isPending, data } = useFetch();


  const columns = [
    {
      title: "No.",
      width: 60,
      render: (_: string, __: InspectionTemplate, index: number) => index + 1
    },
    { title: "Hasil", dataIndex: "result", key: "result" },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      align: "center" as const,
      width: 80,
      render: (_: string, record: InspectionTemplate) => (
        <ActionButton
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Template Inspeksi" subtitle="Kelola data template">
        <AddButton label="Tambah Template" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: InspectionTemplate) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <InspectionTemplateForm
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

export default InspectionTemplatePage;