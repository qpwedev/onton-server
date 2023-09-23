import axios from 'axios';


const withdraw = async (txs: any, comment: string): Promise<boolean> => {
    const params = {
        send_mode: "1",
        comment: comment,
    };

    try {
        const response = await axios.post('http://localhost:8888/sendTransactions', JSON.stringify(txs), {
            params: params,
            headers: { 'Content-Type': 'application/json' }, // Setting Content-Type header to `application/json`
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in withdrawBonuses:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
    }
    return false;
};


export { withdraw };
