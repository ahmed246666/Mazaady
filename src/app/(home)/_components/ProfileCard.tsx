import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicStar, Profile2User, UserTick } from "iconsax-react";
import Image from "next/image";
import avatar from "@/images/avatar.webp";

const STATS = [
  {
    icon: UserTick,
    value: "5",
    label: "Following",
    color: "#FF951D",
  },
  {
    icon: Profile2User,
    value: "20",
    label: "Followers",
    color: "#FF951D",
  },
  {
    icon: MagicStar,
    value: "4.2",
    subText: "( 15 )",
    label: "Rate",
    color: "#FF951D",
  },
] as const;

const ProfileCard = () => {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <ProfileImage />
        <CardTitle className="text-2xl max-sm:text-xl font-bold mb-0">Hala Ahmed</CardTitle>
        <CardDescription className="text-[#4F4F4F] text-sm">
          I am Hala Ahmed, I am the owner of the local brand called Beauty which
          is for Makeup and Skin Care.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 2xl:gap-5 lg:gap-3 sm:gap-5 gap-2">
        {STATS.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </CardContent>
      <CardFooter>
        <Button
          variant="main"
          className="w-full"
          aria-label="Follow" 
          role="button"
        >
          Follow
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProfileCard;

// ProfileImage Component
const ProfileImage = () => (
  <Image
    src={avatar}
    alt="Avatar"
    className="w-[100px] h-[100px] object-cover rounded-3xl shrink-0"
  />
);

// StatCard Component
const StatCard = ({
  icon: Icon,
  value,
  subText,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string;
  subText?: string;
  label: string;
  color: string;
}) => (
  <div className="flex justify-start items-center sm:gap-2 gap-1 bg-pale rounded-2xl py-4 2xl:px-4 sm:px-2 px-1">
    <Icon size="20" color={color} variant="TwoTone" className="shrink-0 sm:size-6" />
    <div>
      <p className="text-sm font-bold text-nowrap">
        {value}{" "}
        {subText && (
          <span className="text-gray text-[10px] font-normal">{subText}</span>
        )}
      </p>
      <p className="text-xs text-secondary">{label}</p>
    </div>
  </div>
);
