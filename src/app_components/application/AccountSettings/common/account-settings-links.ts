import { Bell, Box, CreditCard, Hexagon, Shield } from "react-feather";
import { 
    AccountSettingsNavigationLink,
    type AccountSettingsLinksInterface
} from "./interfaces";

export const accountSettingsLinks: AccountSettingsLinksInterface[] = [
    {
        name: "Vue d'ensemble",
        link: AccountSettingsNavigationLink.Overview,
        icon: Hexagon,
        isAvailable: true,
    },
    {
        name: "Sécurité",
        link: AccountSettingsNavigationLink.Security,
        icon: Shield,
        isAvailable: true,
    },
    {
        name: "Notifications",
        link: AccountSettingsNavigationLink.Notifications,
        icon: Bell,
        isAvailable: true,
    },
    {
        name: "Facturation",
        link: AccountSettingsNavigationLink.Billing,
        icon: CreditCard,
        isAvailable: true,
    },
    {
        name: "Services",
        link: AccountSettingsNavigationLink.Services,
        icon: Box,
        isAvailable: false,
    },
];