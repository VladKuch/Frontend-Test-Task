import axios  from "axios";
import md5 from "crypto-js/md5";

const baseURL = __IS_DEV__ ? 'http://api.valantis.store:40000/' : 'https://api.valantis.store:41000/';
const timestamp = new Date().toISOString().slice(0,10).replace(/-/g,"");

export const $api = axios.create({
    baseURL,
    headers: {
        'X-Auth': md5(`Valantis_${timestamp}`).toString()
    }
})