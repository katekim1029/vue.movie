export default {
    MOVIE: {
        KEY: "06f5b3df94419d30ccbc9a117c93d95b",
        HOST: "http://www.kobis.or.kr",
        DAILY: "/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
        INFO: "/kobisopenapi/webservice/rest/movie/searchMovieInfo.json"
    },

    list(targetDate) {
        const param = {
            "key" : this.MOVIE.KEY,
            "targetDt" : targetDate
        };
        return axios.get(this.MOVIE.HOST + this.MOVIE.DAILY, {
            params: param
        });
        // .then(response => {
        //     this.data = response.data;
        // });
    },

    view(targetKey) {
        const param = {
            "key" : this.MOVIE.KEY,
            "movieCd" : targetKey
        };
        return axios.get(this.MOVIE.HOST + this.MOVIE.INFO, {
            params: param
        });
        // .then(response => {
        //     this.data = response.data;
        // });
    }
}
