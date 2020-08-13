const BASE_URL = 'https://api.coindesk.com/'

export const fetchPrice = async (startDate = null, endDate = null, currency = 'INR') => {
	const URL = `${BASE_URL}v1/bpi/historical/close.json?currency=${currency}${startDate ? `&start=${startDate}` : ''}${endDate ? `&end=${endDate}` : ''}`
	return await fetch(URL)
}
export const fetchCurrentPrice = async  (currency='INR')=> {
	const URL = `${BASE_URL}v1/bpi/currentprice/${currency}.json'}`
	return await fetch(URL)
}