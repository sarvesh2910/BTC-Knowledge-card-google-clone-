import React from 'react';
import PropTypes from 'prop-types';
import style from './Info.module.scss'

const CURRENCY = ['USD','INR','AED','GBP','CAR']
function Info(props) {

	let handleInputChange = e => {
		switch (e.target.name) {
			case 'input_bitcoin':
				//sets the unit of bitcoin
				props.setInputBTCPrice(parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : '');
				//sets the unit of user selected currency equal to selected bitcoin unit
				props.setInputUserCurrencyPrice(((parseFloat(e.target.value) * parseFloat(props.conversionData.rate.replace(/,/gm, '')))) ? ((parseFloat(e.target.value) * parseFloat(props.conversionData.rate.replace(/,/gm, '')))) : '')
				break
			case 'input_user_currency':
				//sets the unit of user selected currency
				props.setInputUserCurrencyPrice(parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : '')
				//sets the unit of bitcoin equal to user selected currency
				props.setInputBTCPrice(((parseFloat(e.target.value) / parseFloat(props.conversionData.rate.replace(/,/gm, '')))) ? (parseFloat(e.target.value) / parseFloat(props.conversionData.rate.replace(/,/gm, ''))) : '');
				break
			default:
				return
		}
	}
	let handleCurrencyChange = (e) => {
		props.setCurrency(e.target.value)
	}
	return <div className={style.info}>
		<div className={style.text}>
			<h4>1 Bitcoin equals</h4>
			<h1>{`${props.conversionData.rate} ${props.conversionData.description}`}</h1>
			<p>Updated : {props.conversionData.lastUpdated}</p>
		</div>
		<div className={style.drivers}>
			<div className={style.from}>
				<input name={"input_bitcoin"} value={props.inputBTCUnit} onChange={handleInputChange}
				       type="number" min={0}/>
				<select name="bitcoin" id="">
					<option value="bitcoin">bitcoin</option>
				</select>
			</div>
			<div className="to">
				<input name={"input_user_currency"} value={props.inputUserCurrencyPrice}
				       onChange={handleInputChange} type="number" min={0}/>
				<select value={props.currency} onChange={handleCurrencyChange} name="" id="">
					{CURRENCY.map((currency,i)=>{
						return <option key={i} value={currency}>{currency}</option>
					})}
				</select>
			</div>
		</div>
	</div>;
}

Info.propTypes = {
	setCurrency:PropTypes.func,
	setInputBTCPrice:PropTypes.func,
	setInputUserCurrencyPrice:PropTypes.func,
	conversionData:PropTypes.shape({
		rate: PropTypes.string,
		description: PropTypes.string,
		lastUpdated: PropTypes.string,
	}),
	inputBTCUnit:PropTypes.number,
	inputUserCurrencyPrice:PropTypes.number,
	currency:PropTypes.string,
};

export default Info;