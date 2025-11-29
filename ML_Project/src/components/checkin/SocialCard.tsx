
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

interface SocialCardProps {
  socialInteraction: string;
  setSocialInteraction: (value: string) => void;
}

const SocialCard = ({ socialInteraction, setSocialInteraction }: SocialCardProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-500" />
          <span>Social Interaction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={socialInteraction}
          onValueChange={setSocialInteraction}
        >
          <SelectTrigger>
            <SelectValue placeholder="How much did you interact with others today?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">
              High - Lots of meaningful conversations
            </SelectItem>
            <SelectItem value="medium">
              Medium - Some interactions
            </SelectItem>
            <SelectItem value="low">
              Low - Minimal interactions
            </SelectItem>
            <SelectItem value="none">
              None - Mostly alone
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default SocialCard;
