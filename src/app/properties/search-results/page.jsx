import PropertyCard from "@/components/Properties/PropertyCard";
import PropertySearchForm from "@/components/Properties/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import Link from "next/link";
import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  // Create a pattern to match the location
  const locationPattern = new RegExp(location, "i");

  // Create a query object
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zip": locationPattern },
    ],
  };

  // If propertyType is not "All", add it to the query object
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);
  console.log(properties);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:text-zinc-600 mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Result</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
