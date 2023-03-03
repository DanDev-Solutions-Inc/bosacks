import http from "./http";
import { AddContactRequest } from "@interfaces/api/AddContactRequest";

export const addContact = (addContactRequest: AddContactRequest) => {
  return http.post("/add-contact", addContactRequest);
};
