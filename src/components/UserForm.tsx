'use client';
import React from "react";
import { Modal, Form, Input, Select } from "antd";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";
import { CustomFormProps, User } from "@/types";

const UserForm: React.FC<CustomFormProps<User>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {

  return (
    <Modal
      width={450}
      title={isEditing ? "Edit User" : "Add User"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <CancelButton label="Cancel" onCancel={onCancel} key='back' />,
        <SaveButton label={isEditing ? "Update" : "Add"} key='submit' />,
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
          label="Name"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role}
        >
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default UserForm;