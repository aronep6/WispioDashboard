import { type Icon } from "react-feather"

export interface NavigationLink {
    name: string
    link: string
    icon: Icon
    badgeCount: number | null
}