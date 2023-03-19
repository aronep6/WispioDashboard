import type { ReactNode } from "react";
import type { Icon } from "react-feather";

export enum AccountSettingsNavigationLink {
    Overview = "/account-settings/overview",
    Security = "/account-settings/security",
    Notifications = "/account-settings/notifications",
    Billing = "/account-settings/billing",
    Services = "/account-settings/services",
}

export interface AccountSettingsLinksInterface {
    name: string;
    link: AccountSettingsNavigationLink;
    icon: Icon;
    active?: boolean;
    isAvailable: boolean;
}

export interface SingleSettingPageWrapperProps {
    title: string;
    description: string;
    children: ReactNode;
}