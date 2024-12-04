import PropertyHeaderImage from "@/components/Properties/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  await connectDB();

  const property = await Property.findById(params.id).lean();
  console.log(property.images[0]);

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
