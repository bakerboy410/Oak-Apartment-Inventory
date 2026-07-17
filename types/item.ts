export interface Variant {
  name: string;
  images: string[];

  hasQuantity: boolean;
  quantity?: number;
  unit?: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;

  store: 1 | 2 | 3;

  images: string[];

  hasQuantity: boolean;
  quantity?: number;
  unit?: string;

  variants: Variant[];
}
