"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteVariantButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this variant?");

    if (!confirmed) return;

    const res = await fetch(`/api/variants/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Unable to delete variant.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}
