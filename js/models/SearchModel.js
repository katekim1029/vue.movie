export default {
    info: {
        KEY: "06f5b3df94419d30ccbc9a117c93d95b",
        HOST: "http://www.kobis.or.kr",
        DAILY: "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
    },

    list(targetDate) {
        const param = {
            "key" : this.info.KEY,
            "targetDt" : targetDate
        };
        return axios.get(this.info.HOST + this.info.DAILY, {
            params: param
        });
        // .then(response => {
        //     this.data = response.data;
        // });
    }
}
