import React from "react";
import "@/assets/styles/globals.css";

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
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
    // </AuthProvider>
  );
};

export default MainLayout;
