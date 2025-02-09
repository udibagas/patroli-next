'use client';
import React from "react";
import { Modal, Form, Input, Select } from "antd";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";
import { CustomFormProps, Site, Station } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/client";

const StationForm: React.FC<CustomFormProps<Station>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {
  const { data: sites } = useQuery({
    queryKey: ["sites"],
    queryFn: () => getItems<Site[]>("/sites"),
    staleTime: 60 * 1000 * 10, // 10 minutes
  });

  return (
    <Modal
      width={450}
      title={isEditing ? "Edit Station" : "Tambah Station"}
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
          name="SiteId"
          label="Group"
          validateStatus={errors.SiteId ? "error" : ""}
          help={errors.SiteId}
        >
          <Select
            placeholder="Pilih site"
            allowClear
            options={sites?.map((site) => ({ label: site.name, value: site.id })) ?? []}
          >
          </Select>
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
          <Input placeholder="Nama Station" />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default StationForm;