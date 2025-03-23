export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface Property {
  id: number;
  name: string;
  options: Array<{ id: number; name: string }>;
}

export interface TableData {
  key: string;
  value: string;
  key_name: string;
  value_name: string;
  other_value: string;
}

export interface TableProps {
  data: TableData[];
}

export interface SubmittedData {
  key: string;
  key_name: string;
  value: string;
  value_name: string;
  other_value: string;
}