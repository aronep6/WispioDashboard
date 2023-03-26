export interface StripeSubscription {
    id: string;
    object: string;
    application: null | any;
    application_fee_percent: null | any;
    automatic_tax: {
        enabled: boolean;
    };
    billing_cycle_anchor: number;
    billing_thresholds: null | any;
    cancel_at: null | number;
    cancel_at_period_end: boolean;
    canceled_at: null | number;
    cancellation_details: {
        comment: null | string;
        feedback: null | string;
        reason: null | string;
    };
    collection_method: string;
    created: number;
    currency: string;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    days_until_due: null | number;
    default_payment_method: null | any;
    default_source: null | any;
    default_tax_rates: any[];
    description: null | string;
    discount: null | any;
    ended_at: null | number;
    items: {
        object: string;
        data: {
            id: string;
            object: string;
            billing_thresholds: null | any;
            created: number;
            metadata: any;
            price: {
                id: string;
                object: string;
                active: boolean;
                billing_scheme: string;
                created: number;
                currency: string;
                custom_unit_amount: null | any;
                livemode: boolean;
                lookup_key: null | any;
                metadata: any;
                nickname: null | any;
                product: string;
                recurring: {
                    aggregate_usage: null | any;
                    interval: string;
                    interval_count: number;
                    usage_type: string;
                };
                tax_behavior: string;
                tiers_mode: null | any;
                transform_quantity: null | any;
                type: string;
                unit_amount: number;
                unit_amount_decimal: string;
            };
            quantity: number;
            subscription: string;
            tax_rates: any[];
        }[];
        has_more: boolean;
        url: string;
    };
    latest_invoice: null | any;
    livemode: boolean;
    metadata: any;
    next_pending_invoice_item_invoice: null | any;
    on_behalf_of: null | any;
    pause_collection: null | any;
    payment_settings: {
        payment_method_options: null | any;
        payment_method_types: null | any;
        save_default_payment_method: null | any;
    };
    pending_invoice_item_interval: null | any;
};