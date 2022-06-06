import { Client } from "discord.ts-selfbot";

// Main function
function main() {
    const client = new Client();

    client.on("ready", () => {
        console.log("Watching {number of channels being watched} channels.");
    });

    client.login(process.env.discord_token);
}

// Check if id is not valid or a text chat channel
function is_valid_id() {}

main();
