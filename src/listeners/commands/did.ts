import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "src/command";

export const Did: Command = {
    name: "did",
    description: "Adds your '🎉 Today I Did' Statement",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        await interaction.followUp({
            // content
        });
    }
};