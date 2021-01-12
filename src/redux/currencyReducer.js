import {SET_ALL_CURRENCIES, SET_FROM_CURRENCY, SET_TO_CURRENCY, 
        SET_FROM_AMOUNT, SET_TO_AMOUNT, SET_IS_IN_FROM_CURRENCY, 
        SET_EXCHANGE_RATE_FROM, SET_EXCHANGE_RATE_TO, SET_CURRENCY_RATES} from './types';

const initialState = {
        allCurrencies: [],
        fromCurrency: '',
        toCurrency: '',
        fromAmount: 1,
        toAmount: 1,
        isInFromCurrency: true,
        exchangeRateFrom: 1,
        exchangeRateTo: 1,
        currencyRates: []
};

export const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CURRENCIES:
            return {...state, allCurrencies: action.payload};
        case SET_FROM_CURRENCY:
            return {...state, fromCurrency: action.payload};
        case SET_TO_CURRENCY:
            return {...state, toCurrency: action.payload};
        case SET_FROM_AMOUNT:
            return {...state, fromAmount: action.payload};
        case SET_TO_AMOUNT:
            return {...state, toAmount: action.payload};
        case SET_IS_IN_FROM_CURRENCY:
            return {...state, isInFromCurrency: action.payload};
        case SET_CURRENCY_RATES:
            return {...state, currencyRates: action.payload};
        case SET_EXCHANGE_RATE_FROM:
            const fromCcurrencyInLowerCase = action.payload.toLowerCase();
            const fromRateOfCurrency = state.currencyRates[fromCcurrencyInLowerCase].value;
            return {...state, exchachangeRateFrom: fromRateOfCurrency};
        case SET_EXCHANGE_RATE_TO:
            const toCurrencyInLowerCase = action.payload.toLowerCase();
            const toRateOfCurrency = state.currencyRates[toCurrencyInLowerCase].value;
            return {...state, exchachangeRateTo: toRateOfCurrency};
        default: return state;
    }
}
