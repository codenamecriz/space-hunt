import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "SpaceHunt | Find Rental",
  description: "Find property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    // <AuthProvider>
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
    // </AuthProvider>
  );
};

export default MainLayout;
