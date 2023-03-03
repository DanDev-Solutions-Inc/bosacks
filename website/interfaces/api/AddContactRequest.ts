import { EmailAddress } from "./EmailAddresses";

export interface AddContactRequest {
  email_addresses: EmailAddress[];
}
