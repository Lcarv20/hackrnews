import { HomeIcon, NewspaperIcon, MessageSquareIcon, BriefcaseIcon } from "lucide-react";

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
