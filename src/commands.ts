import { Command } from "./command";
import { Did } from "./listeners/commands/did";
import { Reminder } from "./listeners/commands/reminder";
import { Today } from "./listeners/commands/today";
import { Will } from "./listeners/commands/will";

export const Commands: Command[] = [Will, Did, Today, Reminder];