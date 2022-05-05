import chalk from "chalk";
import { client } from "..";
import { Event } from "../structures/Event";

export default new Event('ready', () => {
     client.log(`${chalk.yellow('[DISCORD_GATEWAY]')} Connected to Discord Gateway`);
});