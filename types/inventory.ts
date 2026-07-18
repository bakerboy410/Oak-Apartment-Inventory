export type InventoryItem = {
  id: string;
  name: string;
  description: string;
  store: string;

  hasQuantity: boolean;
  quantity: number | null;
  unit: string | null;

  images: {
    id: string;
    url: string;
  }[];

  variants: {
    id: string;
    name: string;

    hasQuantity: boolean;
    quantity: number | null;
    unit: string | null;

    images: {
      id: string;
      url: string;
    }[];
  }[];
};
