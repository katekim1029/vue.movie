export default {

    add(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    delete(key) {
        localStorage.removeItem(key);
        alert("삭제되었습니다!");
    },

    clear() {
        localStorage.clear();
        alert("모두 삭제되었습니다!");
    },
}
