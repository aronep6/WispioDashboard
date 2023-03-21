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
        name: "Sécurité & confidentialité",
        link: AccountSettingsNavigationLink.Security,
        icon: Shield,
        isAvailable: true,
    },
    {
        name: "Facturation & abonnement",
        link: AccountSettingsNavigationLink.Billing,
        icon: CreditCard,
        isAvailable: true,
    },
    {
        name: "Gestion des notifications",
        link: AccountSettingsNavigationLink.Notifications,
        icon: Bell,
        isAvailable: false,
    },
    {
        name: "Paramètres des services",
        link: AccountSettingsNavigationLink.Services,
        icon: Box,
        isAvailable: false,
    },
];