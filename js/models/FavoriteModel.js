export default {

    add(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    list() {
        const data = [];
        if(localStorage.length === 0 ) { return; }
        Object.keys(localStorage).forEach(key => {
            data.push(JSON.parse(localStorage.getItem(key)));
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
