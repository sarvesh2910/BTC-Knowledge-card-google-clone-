import React, {useEffect, useState} from 'react';
import style from './App.module.scss';
import {fetchCurrentPrice, fetchPrice} from './API/api'
import Charts from './Componenets/Chart/Charts.js'
import Info from './Componenets/Info/Info'

function App() {

	let [currency, setCurrency] = useState('INR')
	let [chartData, setChartData] = useState({isLoading: true})
	let [conversionData, setConversionData] = useState({
		rate: '',
		description: 'INR',
		lastUpdated: '',
	})
	let [dateRange, setDateRange] = useState({value: '1M', startDate: '', endDate: ''})
	let [inputBTCUnit, setInputBTCPrice] = useState(0)
	let [inputUserCurrencyPrice, setInputUserCurrencyPrice] = useState(0)


	useEffect(() => {
			(async () => {
				let {startDate, endDate} = dateRange
				setChartData({isLoading: true,})
				try {
					let historicalData = await fetchPrice(startDate, endDate, currency).then(res=>res.json())
					const {bpi, time: {updated}} = historicalData
					let priceArray = [['Date', 'Price']]
					for (const [date, price] of Object.entries(bpi)) {
						priceArray.push([date, price])
					}
					setChartData({isLoading: false, priceArray, lastUpdate: updated})

				} catch (e) {
					setChartData({isLoading: true,})
				}
			})()
		},
		[currency, dateRange]
	)

	useEffect(() => {
		(async () => {
			try{
				let currentPrice = await fetchCurrentPrice(currency).then(res => res.json())
				let conversionData = {
					rate: currentPrice?.bpi[currency]?.rate,
					description: currentPrice?.bpi[currency]?.description,
					lastUpdated: currentPrice.time.updated
				}
				setConversionData(conversionData)
				setInputUserCurrencyPrice(parseFloat((currentPrice?.bpi[currency]?.rate).replace(/,/gm, '')))
				setInputBTCPrice(1)
			}
			catch (e) {
				console.log(e);
			}
		})()
	}, [currency])

	return (
		<div className="App">
			<div className={style.card}>
				<Info
					setCurrency={setCurrency}
					setInputBTCPrice={setInputBTCPrice}
					setInputUserCurrencyPrice={setInputUserCurrencyPrice}
					conversionData={conversionData}
					inputBTCUnit={inputBTCUnit}
					inputUserCurrencyPrice={inputUserCurrencyPrice}
					currency={currency}/>
				<Charts
					chartData={chartData}
					dateRange={dateRange}
					setDateRange={setDateRange}/>
			</div>
		</div>
	);
}

export default App;
