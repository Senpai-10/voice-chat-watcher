import { Client } from "discord.ts-selfbot";
import notifier from "node-notifier";
import editjsonfile from "edit-json-file";
import inquirer from "inquirer";
import { panic } from "./util/panic";

// Main function
async function main() {
    const is_dev = (): boolean =>
        Number(process.env.dev) == 1 || Boolean(process.env.dev) == true;

    let config_path: string = is_dev() ? "./.config.dev.json" : "./config.json";

    const config = editjsonfile(config_path, {
        autosave: true,
        stringify_width: 4,
    });

    let discord_token: string = config.get("discord_token");
    let channels_list: Array<string> = config.get("channels_list");

    if (!discord_token) {
        let { token } = await inquirer.prompt({
            name: "token",
            message: "Enter you discord token",
            type: "input",
        });

        discord_token = token;
        config.set("discord_token", token);
    }

    if (channels_list.length == 0) {
        let { channelID } = await inquirer.prompt({
            name: "channelID",
            message: "Enter channel ID",
            type: "number",
        });

        channels_list.push(channelID);
        config.set("channels_list", channels_list);
    }

    const client = new Client();
    client.login(discord_token);

    client.once("ready", () => {
        console.log(`Watching ${channels_list.length} channels.`);
    });

    client.on("voiceStateUpdate", (_, newChannel) => {
        if (
            channels_list.includes(newChannel.channelID) == false ||
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
