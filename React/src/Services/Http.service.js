import axios from 'axios';

export default axios.create({
    baseURL: 'https://us-central1-mandatory-to-do-list.cloudfunctions.net',
});
