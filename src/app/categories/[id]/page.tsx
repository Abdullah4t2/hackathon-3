"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image from Next.js
import { urlFor } from "@/sanity/lib/image";
import { fetchCategoryWithProducts } from "@/sanity/lib/queries";
import { Category } from "@/sanity/schemaTypes/types/catfetch";
import { Product } from "@/sanity/schemaTypes/types/profetch";
import { useParams } from "next/navigation";
import Link from "next/link"; // Import Link component for routing
import { addToCart } from "@/app/actions/actions"; // Assuming addToCart is imported here
import Swal from "sweetalert2"; // For sweet alert notifications
import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";

const CategoryPage = () => {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryId = Array.isArray(params.id) ? params.id[0] : params.id;
      if (categoryId) {
        try {
          const data = await fetchCategoryWithProducts(categoryId);
          setCategory(data.category);
          setProducts(data.products);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }
    };

    fetchCategoryData();
  }, [params?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product); // Calls the addToCart function to add the product to the cart
  };

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{category?.title}</h1>
        <p className="text-gray-600 mb-4">{category?.description}</p>

        <h2 className="text-2xl font-bold mb-4">
          Number of Products: {products.length > 0 ? products.length : "No products available"}
        </h2>

        {/* Use grid with responsive classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-md p-4">
              <div className="w-full h-64 overflow-hidden mb-4 relative">
                {/* Link to the product detail page */}
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={urlFor(product.image)} // Generate the image URL
                    alt={product.title}
                    layout="responsive" // Use responsive layout for better resizing
                    width={500} // Define a base width
                    height={500} // Define a base height
                    className="rounded-md object-cover" // Ensure it covers the space
                  />
                </Link>
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>

              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg w-full mt-4 text-center hover:from-blue-600 hover:to-purple-600 transition-all"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
