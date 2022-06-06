import editjsonfile from "edit-json-file";

let config_path: string =
    Number(process.env.dev) == 1 || Boolean(process.env.dev) == true
        ? "./.config.dev.json"
        : "./config.json";

const config = editjsonfile(config_path, { autosave: true });

export default {
    discord_token: config.get("discord_token") as string,
    channels_list: config.get("channels_list") as Array<string>,
};
