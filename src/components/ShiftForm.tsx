'use client';
import React from "react";
import { Modal, Form, Input, Switch } from "antd";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";
import { CustomFormProps, Shift } from "@/types";

const ShiftForm: React.FC<CustomFormProps<Shift>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {
  return (
    <Modal
      width={450}
      title={isEditing ? "Edit Shift" : "Tambah Shift"}
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
          label="Nama"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name}
        >
          <Input placeholder="Nama Shift" />
        </Form.Item>

        <Form.Item
          label="Mulai"
          name="start"
          validateStatus={errors.start ? "error" : ""}
          help={errors.start}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Selesai"
          name="end"
          validateStatus={errors.end ? "error" : ""}
          help={errors.end}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hari Berikutnya"
          name="nextDay"
          validateStatus={errors.nextDay ? "error" : ""}
          help={errors.nextDay}
        >
          <Switch />
        </Form.Item>

      </Form>
    </Modal >
  );
};

export default ShiftForm;