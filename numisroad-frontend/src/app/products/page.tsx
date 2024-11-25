type Product = {
  id: number;
  name: string;
  price: string;
};

const Products = ({ products }: { products: Product[] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Product Listing</h1>
      {products.length === 0 ? (
        <p className="text-lg text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-lg text-gray-600">$ {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default async function ProductsPage() {
  try {
    const res = await fetch('http://localhost:8000/api/products/', {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products: Product[] = await res.json();

    return <Products products={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div className="container mx-auto p-4"><p className="text-center text-red-500">Error fetching products. Please try again later.</p></div>;
  }
}


