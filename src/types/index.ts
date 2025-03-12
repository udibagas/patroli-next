import { FormInstance } from "antd";
import { NextRequest } from "next/server";

export type Site = {
  id: number;
  code: string;
  name: string;
};

export type Station = {
  id: number;
  code: string;
  name: string;
  SiteId: number;
  Site: Site;
  Areas: Area[];
};

export type Area = {
  id: number;
  name: string;
  StationId: number;
};

export type Inspection = {
  id: number;
  UserId: number;
  User: User;
  shift: string;
  reportDate: string;
  createdAt: string;
  StationId: number;
  Station: Station;
  SiteId: number;
  Site: Site;
  result: string;
  InspectionImages: InspectionImage[];
};

export type InspectionImage = {
  id: number;
  name: string;
  path: string;
  InspectionId: number;
  SiteId: number;
};

export type InspectionTemplate = {
  id: number;
  result: string;
};

export type Shift = {
  id: number;
  name: string;
  start: string;
  end: string;
  nextDay: boolean;
};

export type User = {
  id: number;
  name: string;
  role: "admin" | "user";
  SiteId: number;
};

export type PaginatedData<T> = {
  from: number;
  to: number;
  page: number;
  rows: T[];
  total: number;
};

export type AxiosErrorResponseType = {
  message: string;
  errors?: Record<string, string>;
};

export type RecursivePartial<T> = NonNullable<T> extends object
  ? {
      [P in keyof T]?: NonNullable<T[P]> extends (infer U)[]
        ? RecursivePartial<U>[]
        : NonNullable<T[P]> extends object
        ? RecursivePartial<T[P]>
        : T[P];
    }
  : T;

export type CustomFormProps<T> = {
  visible: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onOk: (values: T) => void;
  errors: Record<string, string>;
  form: FormInstance<T>;
};

export interface ExtendedRequest extends NextRequest {
  user?: User;
}
