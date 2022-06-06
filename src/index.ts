import { Client } from "discord.ts-selfbot";
import config from "./config";
import { panic } from "./util/panic";

// Main function
function main() {
    // panic if
    if (config.channels_list.length == 0) {
        panic(
            `'channels_list' can't be empty\nplease add ids to 'channels_list' (in config.json)`
        );
    }

    const client = new Client();

    client.on("ready", () => {
        console.log(`Watching ${config.channels_list.length} channels.`);
    });

    client.login(config.discord_token);
}

// Check if id is not valid or a text chat channel
function is_valid_id() {}

main();
