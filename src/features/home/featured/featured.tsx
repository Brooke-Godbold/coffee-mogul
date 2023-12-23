import ErrorToast from "@/ui/error-toast/error-toast";
import ProductSection from "@/ui/product-section/product-section";
import { itemClient } from "@/utils/db";

async function getFeaturedItems() {
  const client = await itemClient;

  try {
    const items = await client
      ?.db()
      .collection("coffee")
      .find({ featured: true }, { projection: { _id: 0 }, sort: { _id: -1 } })
      .limit(3)
      .toArray();

    return { items };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}

export default async function Featured() {
  const featured = await getFeaturedItems();

  return (
    <>
      <ErrorToast errors={featured.error ? [featured.error] : []} />
      <ProductSection items={featured.items || []} />
    </>
  );
}
