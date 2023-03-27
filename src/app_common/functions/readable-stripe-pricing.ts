const readableStripePricing = (price: number, currency: string = 'eur'): string => {
    if (currency === 'eur') {
        return `${price / 100} €`;
    } else if (currency === 'usd') {
        return `$ ${price / 100}`;
    } else {
        return `${price / 100} €`;
    }
};

export default readableStripePricing;