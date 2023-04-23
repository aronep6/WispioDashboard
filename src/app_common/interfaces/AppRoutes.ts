export enum AppRoutes {
    AuthSignIn = '/auth/signin',
    AuthSignUp = '/auth/signup',
    AuthAccountCheckup = '/auth/checkup',

    Dashboard = '/',

    NotFound = '*',
    Loading = '/loading',

    AccountSettings = '/account-settings/overview',
    BillingSettingsSelectPlan = '/account-settings/billing?action=select-plan',
};