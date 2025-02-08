'use client';
import React from "react";
import { Modal, Form, Input } from "antd";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";
import { CustomFormProps, Site } from "../types";

const SiteForm: React.FC<CustomFormProps<Site>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {

  return (
    <Modal
      width={450}
      title={isEditing ? "Edit Site" : "Tambah Site"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <CancelButton label="Batal" onCancel={onCancel} key='back' />,
        <SaveButton label='Simpan' key='submit' />,
      ]}
    >
      <Form
        variant="filled"
        id="form"
        form={form}
        onFinish={onOk}
        requiredMark={false}
        labelCol={{ span: 8 }}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Kode"
          name="code"
          validateStatus={errors.code ? "error" : ""}
          help={errors.code}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nama"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal >
  );
};

export default SiteForm;