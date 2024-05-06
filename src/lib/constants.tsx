import {
  HomeIcon,
  NewspaperIcon,
  MessageSquareIcon,
  BriefcaseIcon,
  SunIcon,
  MoonIcon,
  LaptopIcon,
} from "lucide-react";

export const MENU_ROUTES = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    name: "Articles",
    href: "/articles",
    icon: <NewspaperIcon className="h-4 w-4" />,
  },
  {
    name: "Discussions",
    href: "/discussions",
    icon: <MessageSquareIcon className="h-4 w-4" />,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
];

export const THEMES = [
  {
    name: "system",
    icon: <LaptopIcon className="h-4 w-4" />,
  },
  {
    name: "light",
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    name: "dark",
    icon: <MoonIcon className="h-4 w-4" />,
  },
];
