import React, { useEffect } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCurrenciesThunkCreator, setFromCurrency, setToCurrency, 
        setFromAmount, setToAmount, setIsInFromCurrency,
        setExchangeRateFrom, setExchangeRateTo} from "./redux/actions"
import CurrencyRow from "./CurrencyRow";

function App(props) {
  
  useEffect(() => {
    props.getCurrenciesThunkCreator();
  }, [props.currencies.fromCurrency, props.currencies.toCurrency,
      props.currencies.fromAmount, props.currencies.toAmount])

  useEffect(() => {
    if(props.isInFromCurrency){
      if(props.exchachangeRateFrom && props.currencies.fromAmount && props.exchachangeRateTo){
        props.setToAmount((props.currencies.fromAmount / props.exchachangeRateFrom * props.exchachangeRateTo).toFixed(3))
      } else if (props.exchachangeRateFrom && props.currencies.fromAmount) {
        props.setToAmount((props.currencies.fromAmount / props.exchachangeRateFrom).toFixed(3))
      } else if (props.currencies.fromAmount && props.exchachangeRateTo) {
        props.setToAmount((props.currencies.fromAmount * props.exchachangeRateTo).toFixed(3))
      } else if (props.currencies.fromAmount) {
        props.setToAmount((props.currencies.fromAmount).toFixed(3))
      } else {props.setToAmount(1)}
    } else {
      if(props.exchachangeRateFrom && props.currencies.toAmount && props.exchachangeRateTo){
        props.setFromAmount((props.currencies.toAmount / props.exchachangeRateTo * props.exchachangeRateFrom).toFixed(3))
      } else if (props.exchachangeRateTo && props.currencies.toAmount) {
        props.setFromAmount((props.currencies.toAmount / props.exchachangeRateTo).toFixed(3))
      } else if (props.currencies.toAmount) {
        props.setFromAmount((props.currencies.toAmount * props.exchachangeRateFrom).toFixed(3))
      } else {props.setFromAmount(1)}
    }
  }, [props.currencies.fromCurrency,props.currencies.toCurrency, props.currencies.fromAmount, props.currencies.toAmount]);

  return (
    <div className="wrapper">
      <h1>Convert</h1>
      <CurrencyRow 
        selectedCurrency={props.currencies.fromCurrency}
        onChangeCurrency={e=> {
          props.setIsInFromCurrency(true);
          props.setExchangeRateFrom(e.target.value);
          props.setFromCurrency(e.target.value);
          }
        }
        onChangeAmount={e => {
          props.setFromAmount(e.target.value);
          props.setIsInFromCurrency(true)}
        }
        amount={+props.currencies.fromAmount} />
      <div className="equals">=</div>
      <CurrencyRow 
        selectedCurrency={props.currencies.toCurrency}
        onChangeCurrency={e => {
        props.setIsInFromCurrency(false)
        props.setToCurrency(e.target.value); 
        props.setExchangeRateTo(e.target.value)}
      }
      onChangeAmount={e => {
        props.setToAmount(e.target.value);
        props.setIsInFromCurrency(false)}
      }
      amount={+props.currencies.toAmount} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
    exchachangeRateFrom: state.currencies.exchachangeRateFrom,
    exchachangeRateTo: state.currencies.exchachangeRateTo,
    isInFromCurrency:state.currencies.isInFromCurrency,
  }
}
const mapDispatchToProps = {
  getCurrenciesThunkCreator, setFromCurrency, setToCurrency, 
  setFromAmount, setToAmount, setIsInFromCurrency, 
  setExchangeRateFrom, setExchangeRateTo
};

App.propTypes = {
  getCurrenciesThunkCreator: PropTypes.func,
  currencies: PropTypes.object,
  isInFromCurrency: PropTypes.bool,
  exchachangeRateFrom: PropTypes.number,
  exchachangeRateTo: PropTypes.number,
  setFromCurrency: PropTypes.func,
  setToCurrency: PropTypes.func,
  setFromAmount: PropTypes.func,
  setToAmount: PropTypes.func,
  setIsInFromCurrency: PropTypes.func,
  setExchangeRateFrom: PropTypes.func,
  setExchangeRateTo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
