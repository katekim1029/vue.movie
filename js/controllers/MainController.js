import TabView from '../views/TabView.js';
import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import FavoriteView from '../views/FavoriteView.js';
import MovieView from '../views/MovieView.js';

import SearchModel from '../models/SearchModel.js';
import FavoriteModel from '../models/FavoriteModel.js';

const tag= '[MainController]';

export default {
    init() {
        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));
        
        FormView.setup(document.querySelector('#search-form'))
            .on('@submit', e => this.onSubmit(e.detail.input));
        
        ResultView.setup(document.querySelector('#search-result'))
            .on('@click', e => this.onClickMovie(e.detail.key));

        FavoriteView.setup(document.querySelector('#favor'))
            .on('@click', e => this.onClickMovie(e.detail.key))
            .on('@delete', e => this.onClickDelete(e.detail.key))
            .on('@clear', e => this.onClickClear());

        MovieView.setup(document.querySelector('#movie'))
            .on('@click', e => this.onClickAdd(e.detail.key, e.detail.info));

        this.selectedTab = '검색하기';
        this.renderView();
    },

    renderView() {
        TabView.setActiveTab(this.selectedTab);
        if(this.selectedTab === '검색하기') {
            document.querySelector('#search').style.display = 'block';
            FavoriteView.hide();
        }
        else {
            document.querySelector('#search').style.display = 'none';
            this.fetchFavorList();
        }
        MovieView.hide();
    },

    fetchFavorList() {
        this.list();
    },

    search(query) {
        SearchModel.list(query).then(response => {
            this.onSearchResult(response.data);
        });
    },

    list() {
        const data = FavoriteModel.list();
        FavoriteView.render(data);
    },

    view(query) {
        if(!SearchModel.isResolved) { return; }
        SearchModel.view(query).then(response => {
            SearchModel.isResolved = true;
            MovieView.render(response.data);
        });
    },

    add(key, data) {
        FavoriteModel.add(key, data);
        alert("추가되었습니다!");
    },

    delete(key) {
        FavoriteModel.delete(key);
        alert("삭제되었습니다!");
    },

    clear() {
        FavoriteModel.clear();
        alert("모두 삭제되었습니다!");
    },

    onSearchResult(data) {
        MovieView.hide();
        ResultView.render(data);
    },

    onSubmit(input) {
        let targetDate = input.split('-').join('');
        this.search(targetDate);
    },

    onChangeTab(tabName) {
        this.selectedTab = tabName;
        this.renderView();
    },

    onClickMovie(key) {
        document.querySelector('#search').style.display = 'none';
        FavoriteView.hide();
        this.view(key);
    },

    onClickAdd(key, data) {
        this.add(key, data);
    },

    onClickDelete(key) {
        this.delete(key);
        this.renderView();
    },

    onClickClear() {
        this.clear();
        this.renderView();
    }
}
