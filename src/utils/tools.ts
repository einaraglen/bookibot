import { MessageEmbed } from 'discord.js'

export const getTodayKey = (): string => {
  const now = new Date()
  return `${normalizeNumber(now.getFullYear())}-${normalizeNumber(now.getMonth() + 1)}-${normalizeNumber(now.getDate())}`
}

export const normalizeNumber = (number: number): string => {
  return number.toString().length === 1 ? `0${number}` : number.toString()
}

export const formatPostResponse = (type: "will" | "did", username: string, task: string): MessageEmbed => {
  const title = (username: string): string => type === "will" ? `🎯 Today ${username} will:` : `🎉 Today ${username} did:`
  return new MessageEmbed().setTitle(title(username)).setDescription(task).setTimestamp()
}

export const formatTodayResponse = (type: "will" | "did") => {

}

export const formatTodayUserResponse = (type: "will" | "did", username: string, task: string): MessageEmbed => {
  const title = (username: string): string => type === "will" ? `🎯 Today ${username} will:` : `🎉 Today ${username} did:`
  return new MessageEmbed().setTitle(title(username)).setDescription(task).setTimestamp()
}
