const Buffer = require('buffer');

export const config = {
    WC_BASE_URL: 'https://drugbee.online',
    WC_API_URL: '/wp-json/wc/v3',
    WC_CONSUMER_KEY: 'ck_5cf33d121280e4a1a58c734f799511e0b88787f6',
    WC_CONSUMER_SECRET: 'cs_4cda9397a7690bd6e7ab8adf2025c82fd754722d'
};

let encodedAuth = new Buffer(`${config.WC_CONSUMER_KEY}:${config.WC_CONSUMER_SECRET}`).toString("base64");

const get = async (path) => {
    const request = {
        url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
        method: 'GET'
    };

    let response = await fetch(request.url, {
        method: request.method,
        headers: {
            'Authorization': `Basic ${encodedAuth}`
        }
    });

    response = await response.json();

    return response;
};


const post = async (path, body) => {
    const request = {
        url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
        method: 'POST'
    };

    let response = await fetch(
        request.url,
        {
            method: request.method,
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Basic ${encodedAuth}`
            }
        }
    );

    response = await response.json();

    return response;
};

export default {
    get, post, config
}