// import ProductGrid, { PriceFilter } from "@/components/ProductGrid";

// type ProductsPageProps = {
//   searchParams?: Promise<{
//     category?: string;
//     price?: PriceFilter;
//   }>;
// };

// export default async function ProductsPage({ searchParams }: ProductsPageProps) {
//   const params = await searchParams;

//   const selectedCategory = params?.category || "all";

//   const priceFilter: PriceFilter =
//     params?.price === "lowToHigh" || params?.price === "highToLow"
//       ? params.price
//       : "default";

//   return (
//     <ProductGrid
//       selectedCategory={selectedCategory}
//       priceFilter={priceFilter}
//     />
//   );
// }
import ProductGrid, { PriceFilter } from "@/components/ProductGrid";

type ProductsPageSearchParams = {
  category?: string;
  price?: string;
  search?: string;
};

type ProductsPageProps = {
  searchParams?: ProductsPageSearchParams | Promise<ProductsPageSearchParams>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await Promise.resolve(searchParams);

  const selectedCategory = params?.category || "all";

  const priceFilter: PriceFilter =
    params?.price === "lowToHigh" || params?.price === "highToLow"
      ? params.price
      : "default";

  const searchQuery = params?.search || "";

  return (
    <ProductGrid
      selectedCategory={selectedCategory}
      priceFilter={priceFilter}
      searchQuery={searchQuery}
    />
  );
}
