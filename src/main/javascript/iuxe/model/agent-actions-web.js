export default function (state) {
    return {
        showPage (key, data = '') { return state.addAction('web/page_shown', 'web', 'showPage', data, key ); },
    }
}