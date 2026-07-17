import Image from "next/image";
import Link from "next/link";
import { Item, ItemImage, Variant, VariantImage } from "@prisma/client";

type InventoryItem = Item & {
  images: ItemImage[];
  variants: (Variant & {
    images: VariantImage[];
  })[];
};

interface ItemCardProps {
  item: InventoryItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const image = item.images[0]?.url;

  return (
    <Link href={`/item/${item.id}`}>
      <div className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-xl">
        {image && (
          <Image
            src={image}
            alt={item.name}
            width={400}
            height={300}
            className="h-56 w-full bg-white object-contain p-3"
          />
        )}
        <div className="p-4">
          <h2 className="text-center text-lg font-semibold text-gray-900">
            {item.name}
          </h2>

          <p className="mt-2 text-center text-sm font-medium text-gray-600">
            Store {item.store}
          </p>
        </div>{" "}
      </div>
    </Link>
  );
}
