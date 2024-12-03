import React from "react";
import Link from "next/link";
import PropertyCard from "@/components/Properties/PropertyCard";

const HomeProperties = () => {
  const properties = [
    {
      _id: 1,
      owner: "1",
      name: "Boston Commons Retreat",
      type: "Apartment",
      description:
        "This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.",
      location: {
        street: "120 Tremont Street",
        city: "Boston",
        state: "MA",
        zipcode: "02108",
      },
      beds: 2,
      baths: 1,
      square_feet: 1500,
      amenities: [
        "Wifi",
        "Full kitchen",
        "Washer & Dryer",
        "Free Parking",
        "Hot Tub",
        "24/7 Security",
        "Wheelchair Accessible",
        "Elevator Access",
        "Dishwasher",
        "Gym/Fitness Center",
        "Air Conditioning",
        "Balcony/Patio",
        "Smart TV",
        "Coffee Maker",
      ],
      rates: {
        weekly: 1100,
        monthly: 4200,
      },
      seller_info: {
        name: "John Doe",
        email: "john@gmail.com",
        phone: "617-555-5555",
      },
      images: ["a1.jpg", "a2.jpg", "a3.jpg"],
      is_featured: false,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "2",
      owner: "1",
      name: "Cozy Downtown Loft",
      type: "Apartment",
      description: "A cozy downtown loft with great city views.",
      location: {
        street: "45 Main Street",
        city: "New York",
        state: "NY",
        zipcode: "10001",
      },
      beds: 1,
      baths: 1,
      square_feet: 1800,
      amenities: [
        "Wifi",
        "Full kitchen",
        "Washer & Dryer",
        "Free Parking",
        "Hot Tub",
        "24/7 Security",
        "Wheelchair Accessible",
        "Elevator Access",
        "Dishwasher",
        "High-Speed Internet",
        "Air Conditioning",
        "Smart TV",
        "Outdoor Grill/BBQ",
      ],
      rates: {
        weekly: 1000,
        monthly: 4000,
      },
      seller_info: {
        name: "Jane Smith",
        email: "jane@gmail.com",
        phone: "212-555-5555",
      },
      images: ["b1.jpg", "b2.jpg", "b3.jpg"],
      is_featured: false,
      createdAt: "2024-01-02T00:00:00.000Z",
      updatedAt: "2024-01-02T00:00:00.000Z",
    },
  ];

  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.lenght === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;