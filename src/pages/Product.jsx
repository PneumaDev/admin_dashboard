import React, { useContext, useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { lazyload } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import {
  Edit,
  BadgeCheck,
  BarChart,
  Calendar,
  Star,
  Trash,
  Box,
  List,
  Award,
  ClipboardList,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import ProductActions from "../components/ProductActions";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const { products, cloudinary, productAction, backendUrl } =
    useContext(AdminContext);

  const fetchProduct = async () => {
    try {
      if (!product || product.length < 1) {
        const token = localStorage.getItem("adminToken");

        const response = await axios.post(
          `${backendUrl}/api/product/single`,
          { productId: productId },
          { headers: { token: token } }
        );

        setProduct(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const selectedProduct = products.find(
        (product) => product._id === productId
      );
      if (selectedProduct) {
        setProduct(selectedProduct);
      }
    } else {
      fetchProduct();
    }

    if (product?.image?.length > 0) {
      const publicId = product.image[0]
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      const cldFullImg = cloudinary
        .image(publicId)
        .format("auto")
        .quality("auto")
        .resize(scale().width(1000));
      setImage(cldFullImg || "");
      setLoading(false);
    }
  }, [productId, product]);

  const renderRatingStars = () => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={20}
        fill={index < Math.floor(product.ratings) ? "currentColor" : "none"}
        className={
          index < product.ratings ? "text-yellow-400" : "text-gray-400"
        }
      />
    ));
  };

  function DetailItem({ icon, title, children }) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-bg-sidecolor p-2 rounded-lg">{icon}</div>
        <div>
          <p className="text-table-header text-xs font-imprima">{title}</p>
          <div className="font-medium font-muktaVaani">{children}</div>
        </div>
      </div>
    );
  }

  if (loading && !image) {
    return <Spinner />;
  }

  if (!product && product.length < 1 && !loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-[var(--text-color)] transition-standard text-lg">
          Order not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-md flex flex-col gap-y-5 text-text-color bg-[var(--bg-color)]">
      {/* Header Section */}
      <div className="flex flex-col p-6 border-b-2 md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="font-muktaVaani">{product.name}</span>
            {product.bestSeller && (
              <span className="bg-green-100 font-imprima text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award size={16} />
              </span>
            )}
          </h1>
          <div className="text-sm text-table-header mt-1 flex items-center gap-2">
            <div className="flex">
              <div className="font-muktaVaani">SKU: </div>
              <div className="text-sm font-muktaVaani ml-1">
                {product.sku.slice(0, 10)}...
              </div>
            </div>
            <span className="font-bold">•</span>
            <span className="font-muktaVaani flex items-center">
              <Calendar size={14} className="inline mr-1" />
              {new Date(product.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-3 w-full justify-end">
          <button
            onClick={() => {
              productAction("edit", product);
            }}
            className="bg-card-bg cursor-pointer px-4 py-2  bg-green-300 hover:bg-green-400 text-black font-imprima rounded-lg hover:bg-hover-bg transition-standard flex items-center gap-2"
          >
            <Edit size={18} />
            Edit Product
          </button>
          <button className="bg-red-100 cursor-pointer text-red-800 px-4 font-imprima py-2 rounded-lg hover:bg-red-200 transition-standard flex items-center gap-1">
            <Trash size={18} />
            Delete
          </button>
        </div>
      </div>

      <div className="flex sm:gap-12 flex-col sm:flex-row px-6">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex scroller sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image?.map((imgUrl, index) => {
              // Extract the public ID from the full URL
              const publicId = imgUrl
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

              // Create a Cloudinary image instance for thumbnails
              const cldThumb = cloudinary.image(publicId).resize(scale(150));

              // Create a Cloudinary image instance for the main display
              const cldFullImg = cloudinary.image(publicId).resize(scale(1000));

              return (
                <AdvancedImage
                  key={index}
                  cldImg={cldThumb}
                  onClick={() => setImage(cldFullImg)}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md"
                  alt={`Product ${index}`}
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            {image && (
              <AdvancedImage
                cldImg={image}
                alt="Product"
                className="w-full h-auto lg:h-[90%] rounded-lg"
                plugins={[lazyload()]}
              />
            )}
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1 justify-between">
          <div className="bg-card-bg ">
            <h1 className="font-medium text-2xl mt-2 font-muktaVaani">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-medium font-yantramanav">
              Ksh.
              <span className="text-4xl font-bold font-muktaVaani">
                {product.price - (product.discount ? product.discount : 0)}
              </span>
              {product.discount > 0 && (
                <span className="text-1xl font-bold font-muktaVaani line-through ml-2 px-2 rounded-md text-black bg-blue-300">
                  {product.price}
                </span>
              )}
            </p>
          </div>

          {/* Description Card */}
          <div className="bg-card-bg my-6 pb-5  border-b border-[var(--border-color)]">
            <p className="text-sm text-gray-400 font-imprima">
              {product.description}
            </p>
          </div>

          {/* Product Details Card */}
          <div className="bg-card-bg rounded-xl">
            <h2 className="text-xl font-semibold font-yantramanav pt-2 mb-4 flex items-center gap-2 text-green-500">
              <ClipboardList size={20} className="text-green-600" />
              Product Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <DetailItem icon={<BadgeCheck />} title="Authenticity">
                <span className="font-muktaVaani">
                  {product.isOriginal ? "Original Product" : "Replica"}
                </span>
              </DetailItem>
              <DetailItem icon={<Box />} title="Category">
                <span className="font-muktaVaani">
                  {product.category} / {product.subCategory}
                </span>
              </DetailItem>
              <DetailItem icon={<List />} title="Available Sizes">
                {product.sizes.join(", ")}
              </DetailItem>
              <DetailItem icon={<BarChart />} title="Stock Quantity">
                {product.quantity} units
              </DetailItem>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Card */}
      <div className="bg-card-bg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star size={20} />
          Reviews ({product.reviews.length})
        </h2>
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="border-b border-border-color pb-4 last:border-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{review.userName}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-table-header">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ProductActions />
    </div>
  );
}
