"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteItemButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this item?");

    if (!confirmed) return;

    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Unable to delete item.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}
