import ProductGrid, { PriceFilter } from "@/components/ProductGrid";

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
    price?: PriceFilter;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const selectedCategory = params?.category || "all";

  const priceFilter: PriceFilter =
    params?.price === "lowToHigh" || params?.price === "highToLow"
      ? params.price
      : "default";

  return (
    <ProductGrid
      selectedCategory={selectedCategory}
      priceFilter={priceFilter}
    />
  );
}