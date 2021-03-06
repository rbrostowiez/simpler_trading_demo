import UUID from 'uuid/v4';

//TODO: Organize constants better
export default {
    SET_CURRENT_SECURITY: 'SET_CURRENT_SECURITY',
    DATE_FORMAT: 'YYYY-MM-DD',
    DATE_FORMAT_EPOCH: '1970-01-01',
    CURRENCY_OPTIONS: {
        style: 'currency',
        currency: 'USD'
    },
    PERFORM_REQUEST: 'PERFORM_REQUEST',
    REQUEST_COMPLETED: 'REQUEST_COMPLETED',
    API_SECURITY: '/api/security',
    SITE_URL: 'http://localhost:3000',
    UPDATE_SECURITY_SEARCH_FILTER: 'UPDATE_SECURITY_SEARCH_FILTER',
    UPDATE_SECURITY_SEARCH_UPDATE_PARTIAL: 'UPDATE_SECURITY_SEARCH_UPDATE_PARTIAL',
    GENERATED_SYMBOL_LETTERS: 'BCDFGHJKLMNQRSTVXYZ',
    README_URL: '/api/readme',
    APP_SESSION_CONFIG: {
        secret: 'superSecret', //Not secret here as this is shared w/ client-side
    }
};
