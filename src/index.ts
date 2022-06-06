import { Client } from "discord.ts-selfbot";
import config from "./config";
import notifier from "node-notifier";
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
        if (
            config.channels_list.includes(newChannel.channelID) == false ||
            newChannel.channel.members.size != 1
        )
            return;

        let message = `'${newChannel.member.user.username}' has joined '${newChannel.channel.name}'\nchannel ID: ${newChannel.channel.id}`;

        notifier.notify({
            title: "voice chat watcher",
            message: message,
            timeout: 0,
        });

        console.log(message);
    });
}

main();
