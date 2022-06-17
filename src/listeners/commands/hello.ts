import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "src/command";

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Hello there!";
        const channelid = interaction.channelId
        if (interaction) {
            console.log(interaction.guild!.channels.cache.get(channelid))
        }
        
        console.log(interaction.channel)

        await interaction.followUp({
            ephemeral: true, // only make user who accessed command see response
            content 
        });
    }
};