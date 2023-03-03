import React from "react";
import Image from "next/image";
import { urlFor } from "@utils/image-helper";
import { Twitter, LinkedIn } from "./icons";
import { ProfileProps } from "@interfaces/ProfileProps";

const Profile = ({ configuration }: ProfileProps) => {
  return (
    <div>
      <Image
        src={urlFor(configuration.avatarImage).url()}
        alt={configuration.avatarImage.alt}
        width={50}
        height={50}
      />
      <div>{configuration.bio}</div>
      <div
        className="cursor-pointer"
        onClick={() => window.open(configuration.twitter, "_blank")}
      >
        <Twitter />
      </div>
      <div
        className="cursor-pointer"
        onClick={() => window.open(configuration.linkedIn, "_blank")}
      >
        <LinkedIn />
      </div>
    </div>
  );
};

export default Profile;
