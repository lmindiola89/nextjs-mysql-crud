// import { conn } from "@/libs/mysql";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

async function loadproducts() {
  //   const result = await conn.query("SELECT * FROM product");
  //   console.log(result);

  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

async function Productspage() {
  const products = await loadproducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Productspage;
