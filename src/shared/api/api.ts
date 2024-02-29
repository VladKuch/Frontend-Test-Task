import axios  from "axios";
import md5 from "crypto-js/md5";

const baseURL = 'http://api.valantis.store:40000/';
const timestamp = new Date().toISOString().slice(0,10).replace(/-/g,"");

export const $api = axios.create({
    baseURL,
    headers: {
        'X-Auth': md5(`Valantis_${timestamp}`).toString()
    }
})