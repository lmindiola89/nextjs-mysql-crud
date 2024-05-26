import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-200 hover:cursor-pointer"
    >
      {product.image && <img src={product.image} alt="" className="w-full" />}
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <h2 className="text-2xl text-slate-600">{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
