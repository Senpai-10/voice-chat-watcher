import { Client } from "discord.ts-selfbot";
import config from "./config";
import { panic } from "./util/panic";

// Main function
function main() {
    if (config.channels_list.length == 0) {
        panic(
            `'channels_list' can't be empty\nplease add ids to 'channels_list' (in config.json)`
        );
    }

    const client = new Client();
    client.login(config.discord_token);

    client.once("ready", () => {
        console.log(`Watching ${config.channels_list.length} channels.`);
    });

    client.on("voiceStateUpdate", (oldChannel, newChannel) => {
        if (config.channels_list.includes(newChannel.channelID) == false)
            return;

        console.log(`${oldChannel.channelID} - ${newChannel.channelID}`);
    });
}

main();
