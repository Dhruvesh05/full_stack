import mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const client = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

export default client;
