import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Swords, Gavel } from "lucide-react";

const Rules = () => {
  const discordRules = [
    "Follow the terms of service stated on discord's website.",
    "Follow the guidelines stated on discord's website.",
    "Be respectful, mindful and kind to other members.",
    "All channel discussions must be in English.",
    "No NSFW, NSFW comments, sexual comments etc.",
    "Please do not spam any of the channels.",
    "Advertising is strictly prohibited in any channel or voice channel.",
    "Advertising in DMs through Derpublic is strictly prohibited.",
    "Pinging any higher member of staff when it is not right to do so is strictly prohibited.",
    "Talking about any sensitive topics is not allowed.",
    "You MUST be at least 13 years of age as it states in the discord terms of service.",
    "The usage of clients to see hidden content, deleted messages. (Show you anything you don't have permission to view) is strictly prohibited.",
    "Do not reveal any personal information of anyone. Doxing is prohibited as well as DDosing.",
    "Do not impersonate staff members or other community members.",
    "Alt accounts are not permitted. One account per person.",
    "Do not mic spam, use voice changers excessively, or play music in voice channels without permission.",
    "Do not beg for roles, ranks, or any form of special treatment.",
    "Report rule-breaking behavior to staff privately. Do not mini-mod.",
    "Avoid excessive caps lock or repeated characters in messages.",
    "No toxicity, hate speech, racism, or discriminatory language of any kind.",
  ];

  const minecraftRules = [
    "Be respectful, mindful and kind to other players.",
    "Follow all rules and instructions given to you by the event staff.",
    "You may be asked to re-record parts of videos that need to be re-recorded for content creation.",
    "Follow all rules that apply to Minecraft from the Discord rules stated above in the previous embed.",
    "No spamming in chat.",
    "No requesting general help in chat. This is so the content is always usable in any scenario. Please open a ticket if you need help or guidance.",
    "Depending on the event, you may be asked to alert event staff before anything happens in game. For example, a leader gets killed, you're planning an assassination attempt. Failure to do so will result in a ban from the network.",
    "Depending on the event, you MUST record your POV either with OBS or Flashback. ReplayMod is not recommended but still allowed.",
    "Depending on the rules stated before the event, you must have Simple Voice Chat installed and ready to use in the event.",
    "Do not use any unfair advantages. For clarification, please open a ticket.",
    "Griefing builds outside of war events is strictly prohibited unless authorized by staff.",
    "No exploiting glitches, duplication bugs, or any game-breaking mechanics.",
    "Stealing from other players is only allowed during sanctioned raid/war events.",
    "No building offensive or inappropriate structures.",
    "Respect claimed territories and borders established by other factions/nations.",
    "AFK machines and auto-farms must comply with server performance guidelines.",
    "Do not intentionally lag the server with redstone, entities, or other means.",
    "PvP is only allowed in designated areas or during events unless otherwise stated.",
    "Trading scams are strictly prohibited. Honor all agreed trades.",
    "All builds within 100 blocks of spawn are subject to staff approval.",
  ];

  const punishmentGuidelines = [
    "First offense: Verbal warning from staff.",
    "Second offense: Temporary mute (1-24 hours depending on severity).",
    "Third offense: Temporary ban (1-7 days depending on severity).",
    "Severe offenses (hacking, doxing, DDoS threats): Immediate permanent ban.",
    "Ban appeals can be submitted through the ticket system after 30 days.",
    "Staff decisions are final. Arguing with staff about punishments may result in extended penalties.",
  ];

  return (
    <div className="space-y-8">
      <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Discord Rules and Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="space-y-3">
            {discordRules.map((rule, index) => (
              <li key={index} className="text-base leading-relaxed text-foreground flex gap-3">
                <span className="font-semibold text-primary min-w-8">{index + 1})</span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
          <div className="pt-4 mt-6 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              These rules and regulations are subject to change. You will/may not be notified upon change of this channel so check it often. 
              By joining this server, you automatically agree to follow these rules. If you do not wish to follow the rules, you may leave at any time. 
              The moderation and staff team have the right to enforce any rule that may not be stated above. Staff have the final say.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-accent transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Swords className="h-8 w-8 text-accent" />
            Minecraft Rules and Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="space-y-3">
            {minecraftRules.map((rule, index) => (
              <li key={index} className="text-base leading-relaxed text-foreground flex gap-3">
                <span className="font-semibold text-accent min-w-8">{index + 1})</span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
          <div className="pt-4 mt-6 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              These rules and regulations are subject to change. You will/may not be notified upon change of this channel so check it often. 
              By joining this server, you automatically agree to follow these rules. If you do not wish to follow the rules, you may leave at any time. 
              The moderation and staff team have the right to enforce any rule that may not be stated above. Staff have the final say.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-destructive transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Gavel className="h-8 w-8 text-destructive" />
            Punishment Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="space-y-3">
            {punishmentGuidelines.map((rule, index) => (
              <li key={index} className="text-base leading-relaxed text-foreground flex gap-3">
                <span className="font-semibold text-destructive min-w-8">{index + 1})</span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
