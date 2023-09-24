import axios from 'axios';

export const userFriendlyAddress = async (address: string) => {
    let attempts = 0;

    while (attempts < 3) {
        try {

            const response = await axios.get('https://toncenter.com/api/v2/packAddress', {
                params: {
                    'address': address,
                    'api_key': process.env.TONCENTER_API_KEY
                },
                headers: {
                    'accept': 'application/json'
                }
            });

            return response.data.result.replace(/\+/g, '-').replace(/\//g, '_');
        }
        catch (error) {
            console.log(error)
        }

        attempts++;
    }

    return "";
}
