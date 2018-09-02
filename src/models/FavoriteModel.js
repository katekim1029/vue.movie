export default {

    add(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    list() {
        const data = [];
        Object.keys(localStorage).forEach(key => {
            let string = localStorage.getItem(key);
            if(string.indexOf('movieCd') < 0 ) { return; }
            data.push(JSON.parse(string));
        });
        return data;
    },

    delete(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },
}
