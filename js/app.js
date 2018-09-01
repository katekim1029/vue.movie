import SearchModel from './models/SearchModel.js';
import FavoriteModel from './models/FavoriteModel.js';

new Vue({
    el: '#app',
    data: {
        movieDate: '',
        submitted: false,
        selected: false,
        tabs: 
            [{ text: '검색하기', link: '#search' },
            { text: '즐겨찾기', link: '#favor' }],
        selectedTab: '',
        searchResult: [],
        favoriteList: [],
        selectedMovie: {}
    },
    created() {
        this.selectedTab = this.tabs[0].text;
        this.fetchFavorList();
    },
    methods: {
        search(query) {
            SearchModel.list(query).then(response => {
                this.submitted = true;
                this.searchResult = response.data.boxOfficeResult.dailyBoxOfficeList;
            });
        },
        fetchFavorList() {
            this.favoriteList = FavoriteModel.list();
        },
        onClickTab(tab) {
            this.selectedTab = tab;
            this.selected = false;
        },
        onChange(e) {
            let targetDate = this.movieDate.split('-').join('');
            this.search(targetDate);
        },
        onClickMovie(query) {
            if(!SearchModel.isResolved) { return; }
            this.selected = true;
            SearchModel.view(query).then(response => {
                SearchModel.isResolved = true;
                this.selectedMovie = response.data.movieInfoResult.movieInfo;
            });
        },
        onClickAdd() {
            const key = this.selectedMovie.movieCd;
            const info = { movieCd: this.selectedMovie.movieCd, movieNm: this.selectedMovie.movieNm };
            FavoriteModel.add(key, info);
            this.fetchFavorList();
            alert("추가되었습니다!");
            this.onClickTab(this.tabs[0].text);
        },
        onClickDelete(query) {
            FavoriteModel.delete(query);
            this.fetchFavorList();
            alert("삭제되었습니다!");
        },
        onClickClear() {
            FavoriteModel.clear();
            this.fetchFavorList();
            alert("모두 삭제되었습니다!");
        }
    }
});
