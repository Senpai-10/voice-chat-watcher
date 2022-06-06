import editjsonfile from "edit-json-file";

const config = editjsonfile("./config.json", { autosave: true });

export default {
    discord_token: config.get("discord_token") as string,
    channels_list: config.get("channels_list") as Array<string>,
};
