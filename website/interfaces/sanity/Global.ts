import { Image } from "./Image";

export interface Global {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  twitter: string;
  linkedIn: string;
  avatarImage: Image;
  bio: string;
}
