import { AddContactRequest } from "@interfaces/api/AddContactRequest";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { api } from "./constant-contact";

const addContact = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let addContactRequest: AddContactRequest = req.body;

    const response = await api.post(
      `lists/${process.env.CONSTANT_CONTACT_LIST_ID}?api_key=${process.env.CONSTANT_CONTACT_API_KEY}`,
      addContactRequest
    );

    console.log(response);

    if (response.ok) {
      return res.status(200).json("");
    } else {
      return res
        .status(response.status ?? 500)
        .json(response.originalError.message);
    }
  } catch (e) {
    return res.status(500).json((e as Error).message);
  }
};

export default nc<NextApiRequest, NextApiResponse>().post(addContact);
