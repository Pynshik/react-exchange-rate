import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const CurrencyRow = (props) => {
  return (
    <div>
      <input type="number" className="input" value={props.amount} onChange={props.onChangeAmount} />
        <select value={props.selectedCurrency} onChange={props.onChangeCurrency}>
          {props.allCurrencies.map(option => {
            const newOption = option.toUpperCase();
            return <option key={option} value={newOption}>{newOption}</option>
          })}
        </select>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allCurrencies: state.currencies.allCurrencies,
    currencyRates: state.currencies.currencyRates,
    exchachangeRate: state.currencies.exchachangeRate,
  };
}

CurrencyRow.propTypes = {
  amount: PropTypes.number,
  onChangeAmount: PropTypes.func,
  selectedCurrency: PropTypes.string,
  onChangeCurrency: PropTypes.func,
  allCurrencies: PropTypes.array
}

export default connect(mapStateToProps)(CurrencyRow);
