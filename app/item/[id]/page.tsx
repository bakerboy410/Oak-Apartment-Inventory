import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      variants: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl p-8">
        <Image
          src={item.images[0].url}
          alt={item.name}
          width={900}
          height={600}
          className="rounded-xl bg-white object-contain p-4 shadow"
        />

        <h1 className="mt-8 text-4xl font-semibold text-gray-800">
          {item.name}
        </h1>

        <p className="mt-2 text-center text-sm font-semibold text-gray-800">
          Store {item.store}
        </p>
        <div className="mt-8 rounded-xl bg-white p-6 shadow font-semibold text-gray-500">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Description</h2>
          <p className="text-gray-800 leading-7">{item.description}</p>{" "}
        </div>

        {item.hasQuantity && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow font-semibold text-gray-800">
            <h2 className="text-2xl font-bold text-gray-900">Quantity</h2>
            <p className="mt-2 text-xl font-semibold text-gray-800">
              {item.quantity} {item.unit}
            </p>{" "}
          </div>
        )}

        {item.variants.length > 0 && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow font-semibold text-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Variants</h2>
            <div className="grid gap-6 md:grid-cols-2 text-gray-500">
              {item.variants.map((variant) => (
                <div key={variant.id} className="rounded-lg border p-4">
                  {variant.images.length > 0 && (
                    <Image
                      src={variant.images[0].url}
                      alt={variant.name}
                      width={400}
                      height={250}
                      className="mb-4 rounded-lg bg-white object-contain p-2"
                    />
                  )}
                  <h3 className="text-lg font-bold text-gray-900">
                    {variant.name}
                  </h3>{" "}
                  {variant.hasQuantity && (
                    <p className="mt-2 font-medium text-gray-800">
                      Quantity: {variant.quantity} {variant.unit}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
