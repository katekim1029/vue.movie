export default {
    info: {
        key: "06f5b3df94419d30ccbc9a117c93d95b",
        host: "http://www.kobis.or.kr",
        daily: "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
    },

    list(targetDate) {
        const param = {
            "key" : this.info.key,
            "targetDt" : targetDate
        };
        return axios.get(this.info.host + this.info.daily, {
            params: param
        });
        // .then(response => {
        //     this.data = response.data;
        // });
    }
}
