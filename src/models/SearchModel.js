const MOVIE = {
    KEY: "06f5b3df94419d30ccbc9a117c93d95b",
    HOST: "http://www.kobis.or.kr",
    DAILY: "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
    INFO : "/kobisopenapi/webservice/rest/movie/searchMovieInfo.json"
}

export default {
    isResolved: true,

    list(targetDate) {
        const param = {
            "key" : MOVIE.KEY,
            "targetDt" : targetDate
        };
        return axios.get(MOVIE.HOST + MOVIE.DAILY, {
            params: param
        });
        // .then(response => {
        //     this.data = response.data;
        // });
    },

    view(targetKey) {
        const param = {
            "key" : MOVIE.KEY,
            "movieCd" : targetKey
        };
        this.isResolved = false;
        return axios.get(MOVIE.HOST + MOVIE.INFO, {
            params: param
        });
        // .then(response => {
        //     this.data = response.data;
        // });
    }
}
