export interface OrderModel {
  id: string;
  createdAt: Date;
  name: string;
  numbers: number[];
  option: number;
  phone: string;
  confirmed: boolean;
}