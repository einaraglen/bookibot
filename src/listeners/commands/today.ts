import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "src/command";

export const Today: Command = {
    name: "today",
    description: "Summary of what the teams is doing today",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        await interaction.followUp({
            // content
        });
    }
};