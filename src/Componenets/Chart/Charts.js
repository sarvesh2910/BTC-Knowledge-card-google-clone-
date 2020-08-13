import React from 'react';
import PropTypes from 'prop-types';
import Chart from "react-google-charts";
import style from './Charts.module.scss'
import dayjs from "dayjs";

const DROPDOWN_OPTIONS = [
	{value:'5D',text : '5 Days'},
	{value:'1M',text : '1 Month'},
	{value:'6M',text : '6 Months'},
	{value:'1Y',text : '1 Year'},
]

function Charts (props) {
	const chartOptions = {
		curveType: "function",
		legend: 'none',
	};
	let handleDateRange = (e) => {
		let startDate = dayjs().format('YYYY-MM-DD')
		let endDate = dayjs().format('YYYY-MM-DD')
		switch (e.target.value) {
			case '1D':
				startDate = dayjs().format('YYYY-MM-DD')
				break;
			case '5D':
				startDate = dayjs().subtract(5, "day").format('YYYY-MM-DD')
				break;
			case '1M':
				startDate = dayjs().subtract(1, "month").format('YYYY-MM-DD')
				break;
			case '6M':
				startDate = dayjs().subtract(6, "month").format('YYYY-MM-DD')
				break;
			case '1Y':
				startDate = dayjs().subtract(1, "year").format('YYYY-MM-DD')
				break;
			default:
				return
		}
		props.setDateRange({value: e.target.value, startDate, endDate})
	}
	return <>
		 <div className={style.container}>
			<select value={props.dateRange.value} onChange={handleDateRange} name="" id="">
				{DROPDOWN_OPTIONS.map((option,i)=>{
					return <option key={i} value={option.value}>{option.text}</option>
				})}
			</select>

			 {!props.chartData.isLoading ?
				 <Chart
					 chartType="AreaChart"
					 width="350px"
					 loader={<div>Loading Chart</div>}
					 data={props.chartData.priceArray}
					 options={chartOptions}
				 />:<div>Loading Chart</div>
			 }
		 </div>

	</>;
}

Chart.propTypes = {
	chartData:PropTypes.shape({
		priceArray: PropTypes.array,
		isLoading: PropTypes.bool,
	}),
	dateRange:PropTypes.shape({
		value: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
	}),
	setDateRange:PropTypes.func
};

export default Charts;