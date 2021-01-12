import axios from "axios";
import {SET_ALL_CURRENCIES, SET_FROM_CURRENCY, SET_TO_CURRENCY,
        SET_FROM_AMOUNT, SET_TO_AMOUNT, SET_IS_IN_FROM_CURRENCY,
        SET_EXCHANGE_RATE_FROM, SET_EXCHANGE_RATE_TO, SET_CURRENCY_RATES} from './types';

const url = 'https://api.coingecko.com/api/v3/exchange_rates';

export function setAllCurrencies(allCurrencies) {
    return {
        type: SET_ALL_CURRENCIES,
        payload: allCurrencies,
    };
}

export function setFromCurrency(fromCurrency) {
    return {
        type: SET_FROM_CURRENCY,
        payload: fromCurrency,
    };
}

export function setToCurrency(toCurrency) {
    return {
        type: SET_TO_CURRENCY,
        payload: toCurrency,
    };
}

export function setFromAmount(fromAmount) {
    return {
        type: SET_FROM_AMOUNT,
        payload: fromAmount,
    };
}

export function setToAmount(toAmount) {
    return {
        type: SET_TO_AMOUNT,
        payload: toAmount,
    };
}

export function setIsInFromCurrency(isInFromCurrency) {
    return {
        type: SET_IS_IN_FROM_CURRENCY,
        payload: isInFromCurrency,
    };
}

export function setCurrencyRates(currencyRates) {
    return {
        type: SET_CURRENCY_RATES,
        payload: currencyRates,
    };
}

export function setExchangeRateFrom(nameOfCurrency) {
    return {
        type: SET_EXCHANGE_RATE_FROM,
        payload: nameOfCurrency,
    };
}

export function setExchangeRateTo(nameOfCurrency) {
    return {
        type: SET_EXCHANGE_RATE_TO,
        payload: nameOfCurrency,
    };
}

export const getCurrenciesThunkCreator = () => {
    return  (dispatch) => {
        axios.get(url)
            .then(data => {
                dispatch(setAllCurrencies([...Object.keys(data.data.rates)]));
                dispatch(setCurrencyRates(data.data.rates));
            })
            .catch(err=>{
                console.log(`No data received. ${err}`)
            });
    }
}
