<template>
    <div class="container">
        <header class="header">
            <h1 class="header__title">오늘의 영화</h1>
        </header>

        <tab-box v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@click="onClickTab"></tab-box>

        <div class="contents">
            <section class="cont" id="search" v-if="(selectedTab === tabs[0].text) && !selected">

                <search-form v-bind:value="movieDate" v-on:@submit="onSubmit"></search-form>

                <div v-if="submitted">
                    <list-area v-bind:data="searchResult" type="result" v-on:@click="onClickMovie"></list-area>
                </div>
            </section>

            <section class="cont" id="favor" v-if="(selectedTab === tabs[1].text) && !selected">
                <list-area v-bind:data="favoriteList" type="favorite" v-on:@click="onClickMovie" v-on:@delete="onClickDelete" v-on:@clear="onClickClear"></list-area>
            </section>
            
            <section class="cont" v-if="selected">
                <view-area v-bind:data="selectedMovie" v-bind:selected-tab="selectedTab" v-on:@click="onClickAdd"></view-area>
            </section>

        </div>
    </div>
</template>

<script>
import SearchModel from './models/SearchModel.js';
import FavoriteModel from './models/FavoriteModel.js';

import FormComponent from './components/FormComponent.vue';
import ListComponent from './components/ListComponent.vue';
import ViewComponent from './components/ViewComponent.vue';
import TabComponent from './components/TabComponent.vue';

export default {
    name: 'app',
    data () {
        return {
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
        }
    },
    components: {
        'search-form': FormComponent,
        'list-area': ListComponent,
        'view-area': ViewComponent,
        'tab-box': TabComponent
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
        onSubmit(query) {
            this.movieDate = query;
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
}
</script>

<style lang="scss" scoped>
.container {
    max-width:500px;
    margin:0 auto;
}
.cont {
    min-height: calc(100vh - 140px);
    margin-top:20px;
    padding:20px;
    border:1px solid #333;
}
.header {
    height:50px;
    &__title {
        padding-left:10px;
        background:#333;
        color:#fff;
        font-size:30px;
        text-align:center;
        line-height:50px;
    }
}
</style>
