"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/sanity/lib/queries"; // A function to fetch all products from Sanity
import { Product } from "@/sanity/schemaTypes/types/profetch";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Footer from "@/app/Components/Footer"; // Import Footer
import Header from "@/app/Components/Header"; // Import Header
import Image from "next/image"; // Import Image from next/image

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching products from Sanity
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchProducts(); // Assuming you have this function to fetch all products
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Include Header here */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Shop Our Products</h1>

        {/* Grid layout for product display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-md p-4">
              <div className="w-full h-64 overflow-hidden mb-4 relative">
                {/* Link to the product detail page */}
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={urlFor(product.image)}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </Link>
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>

              {/* Add to Cart Button */}
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg w-full mt-4 text-center hover:from-blue-600 hover:to-purple-600 transition-all"
                onClick={() => {
                  // Handle add to cart functionality here
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default ShopPage;
