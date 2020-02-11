export default function (state) {
    return {
        showPage (key, data = '') { return state.addAction('web/page_shown', 'web', 'showPage', data, key ); },
        updatePage (pairs, data = '') { return state.addAction('web/page_updated', 'web', 'updatePage', data, pairs ); },
        log (msg, data = '') { return state.addAction('web/logged', 'web', 'log', data, msg ); },
    }
}