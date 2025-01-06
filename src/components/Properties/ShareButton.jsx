"use client";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        {/* Facebook */}
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          {console.log(`FB URL: ${shareUrl}`)}
          <FacebookIcon size={40} round={true}></FacebookIcon>
        </FacebookShareButton>

        {/* Twitter */}
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true}></TwitterIcon>
        </TwitterShareButton>

        {/* Viber */}
        <ViberShareButton url={shareUrl} title={property.name} separator=":: ">
          <ViberIcon size={40} round={true}></ViberIcon>
        </ViberShareButton>

        {/* Email */}
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true}></EmailIcon>
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
