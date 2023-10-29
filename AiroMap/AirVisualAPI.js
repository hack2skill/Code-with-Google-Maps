import axios from 'axios';
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const lastRequestInfo = {
    timestamp: 0,
    delay: 1000,
};

export const getAirQualityData = async (location, retry = 0) => {
    const currentTime = new Date().getTime();
    const timeSinceLastRequest = currentTime - lastRequestInfo.timestamp;

    if (timeSinceLastRequest < lastRequestInfo.delay) {
        const waitTime = lastRequestInfo.delay - timeSinceLastRequest;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    return makeAirQualityRequest(location, retry).then(response => {
        lastRequestInfo.timestamp = new Date().getTime();
        return response;
    });
};

function makeAirQualityRequest(location, retry) {
    const [latitude, longitude] = location.split(',');
    const apiUrl = `http://api.airvisual.com/v2/nearest_city?key=${apiKey}&lat=${latitude}&lon=${longitude}`;

    return axios.get(apiUrl)
        .then(response => {
            lastRequestInfo.timestamp = new Date().getTime();
            return response.data;
        })
        .catch(error => {
            if (error.response.status === 429 && retry < 3) {
                const retryDelay = Math.pow(2, retry) * 1000;
                return new Promise(resolve => setTimeout(resolve, retryDelay)).then(() => {
                    return getAirQualityData(location, retry + 1);
                });
            }
            throw error;
        });
}