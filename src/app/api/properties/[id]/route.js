import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/propertydata/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return Response.json("Property Not Found.", { status: 404 });

    return Response.json(property);
  } catch (error) {
    console.log(error);
    return new Response("API Error", { status: 500 });
  }
};
