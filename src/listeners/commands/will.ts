import { BaseCommandInteraction, Client, User } from 'discord.js'
import { post } from '../../firebase/will'
import { Command } from '../../command'
import { addUser, isUser } from '../../firebase/users'

const TASK_INDEX = 0

export const Will: Command = {
  name: 'will',
  description: "Adds your '🎯 Today I Will' Statement",
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'task',
      description: 'Describe today`s task',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    let content = 'No Task was Received, Try Again 😬'
    const user: User | any | undefined = interaction.member?.user
    const options: any = interaction.options.data
    if (user) {
      const exists = await isUser(user.id)
      if (exists) {
      } else {
        await addUser(user.id, user.username)
      }
      const task = options[TASK_INDEX]
      if (task) {
        post(user.id, task.value)
        content = `${user.username} - ${task.value}`
      }
    }
    await interaction.followUp({
      content,
    })
  },
}
