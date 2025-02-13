import React, { useContext, useMemo } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { lazyload } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";

import { AdminContext } from "../context/AdminContext";

export default function OrderItem({ item }) {
  const { cloudinary, navigate } = useContext(AdminContext);

  return (
    <>
      {item.sizes.map((sizeObj, index) => {
        // Memoize processed Cloudinary image for each size variant
        const processedImage = useMemo(() => {
          if (!item.image || item.image.length === 0) return null;

          // Extract public ID from the first image
          const publicId = item.image[0]
            .split("/")
            .slice(-2)
            .join("/")
            .split(".")[0];

          return cloudinary
            .image(publicId)
            .format("auto")
            .quality("auto")
            .resize(scale().width(150));
        }, [item]);

        return (
          <div
            key={`${item._id}-${sizeObj.size}-${index}`}
            className="flex items-center space-x-4 py-4 border-b border-gray-700 last:border-b-0"
          >
            {/* Product Image */}
            {processedImage ? (
              <AdvancedImage
                cldImg={processedImage}
                className="w-20 h-28 object-cover aspect-auto rounded-md"
                plugins={[lazyload()]}
                alt={`Product ${item.name} - Size ${sizeObj.size}`}
              />
            ) : (
              <p className="w-20 h-28 flex items-center justify-center text-gray-500 bg-gray-100 rounded-md">
                No Image
              </p>
            )}

            {/* Product Details */}
            <div className="flex-1 space-y-2">
              {/* Product Name */}
              <p
                className="font-medium text-[var(--text-color)] line-clamp-1 font-muktaVaani underline cursor-pointer mb-1 underline-offset-4"
                onClick={() => navigate(`/products/${item._id}`)}
              >
                {item.name}
              </p>

              {/* Quantity, Size, and Price */}
              <div className="flex items-center text-sm text-gray-400 font-yantramanav">
                <p>Qty: {sizeObj.quantity}</p>
                <span className="mx-1 font-bold">•</span>
                <p>Size: {sizeObj.size}</p>
                <span className="mx-1 font-bold">•</span>
                <p>Ksh. {item.price}</p>
              </div>
              {/* Product Description */}
              <p className="text-sm text-gray-400 font-imprima line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
