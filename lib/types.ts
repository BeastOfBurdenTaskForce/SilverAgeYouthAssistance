export interface ServiceField {
  key: string;
  label: string;
  ph: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  color: 'primary' | 'accent';
  brief: string;
  detail: string;
  fields: ServiceField[];
}

export interface Volunteer {
  name: string;
  school: string;
  major: string;
  count: number;
  seed: string;
  tag: string;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  serviceColor: 'primary' | 'accent';
  name: string;
  phone: string;
  addr: string;
  time: string;
  note: string;
  status: 0 | 1 | 2 | 3;
  createdAt: string;
  volunteer: string | null;
  details: Record<string, string>;
}

export type ToastType = 'success' | 'info' | 'warn';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

export type ModalType = 'order' | 'orders' | 'detail' | 'hotline' | null;
