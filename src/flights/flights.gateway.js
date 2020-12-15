import { TODAY_DATE } from './utils/constants';

const baseUrl = 'https://api.iev.aero/api/flights';

export const fetchFlightsList = flightDate => {
    const updatedUrl = flightDate ? `${baseUrl}/${flightDate}` : `${baseUrl}/${TODAY_DATE}`;

    return fetch(updatedUrl).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch flights list');
    });
};
