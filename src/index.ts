require('dotenv').config();

import { ImperialClient } from "./structures/Client";

export const client = new ImperialClient();

client.start();