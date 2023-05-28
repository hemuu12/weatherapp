import React, { useMemo } from 'react';
import moment from 'moment';
import '../css/DetailsCard.css';
import convertToFahrenheit from '../helpers/convertToFahrenheit'

function DetailsCard({ weather_icon, data,  degreeSymbol}) {
	const { clouds, main, weather } = data.list[0];

	const formattedData = useMemo(() => {
		return {
			temp: Math.round( convertToFahrenheit(main.temp)),
			feels_like: Math.round( convertToFahrenheit(main.feels_like)),
			temp_min: Math.round( convertToFahrenheit(main.temp_min) ),
			temp_max: Math.round( convertToFahrenheit(main.temp_max) ),
		};
	}, [main.feels_like, main.temp, main.temp_max, main.temp_min])

	return (
		<div className='details'>
			<div className='clouds'>
				<p className='celsius'>{formattedData.temp}°C</p>
				<div className='cloud-icon'>
					{weather[0].main?weather[0].main:null}
					<img src={weather_icon} className='' alt='' />
				</div>
				<p className='des'>
					<span>{weather[0].description}</span>
				</p>
				<p className='time'>
					<span>{moment().format('dddd MMM YYYY')}</span>
				</p>
			</div>
			<div className='more-info'>
				<p className=''>
					realFell: <span>{formattedData.feels_like}°C</span>
				</p>
				<p className=''>
					humidity: <span>{main.humidity}%</span>
				</p>
				<p className=''>
					cover: <span>{clouds.all}</span>
				</p>
				<p className=''>
					min-temp: <span>{formattedData.temp_min}°C</span>
				</p>
				<p className=''>
					max-temp: <span>{formattedData.temp_max}°C</span>
				</p>
			</div>
			
		</div>
	);
}

export default DetailsCard;