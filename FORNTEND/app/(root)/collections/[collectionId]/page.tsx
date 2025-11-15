import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-10">
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[550px] object-cover rounded-2xl"


      />
      {/* <p className="text-heading1-bold">{collectionDetails.title}</p> */}
      <h1 className="text-heading1-bold font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl 
               font-sans tracking-wide leading-tight text-shadow-lg">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-400 from-sky-500">
          {collectionDetails.title}
        </span>
      </h1>

      <p className="text-overflow  max-w-[1000px] text-justify">
        {collectionDetails.description}
      </p>

      {/* đường viền */}
      <div className="border-t-2 border-grey-3 my-1.5 max-w-[1230px] w-full"></div>

      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";

