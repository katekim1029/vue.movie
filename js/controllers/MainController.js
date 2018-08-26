import TabView from '../views/TabView.js';
import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import FavorView from '../views/FavorView.js';
import MovieView from '../views/MovieView.js';

import SearchModel from '../models/SearchModel.js';
import FavorModel from '../models/FavorModel.js';

const tag= '[MainController]';

export default {
    init() {
        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));
        
        FormView.setup(document.querySelector('#search-form'))
            .on('@submit', e => this.onSubmit(e.detail.input));
        
        ResultView.setup(document.querySelector('#search-result'))
            .on('@click', e => this.onClickMovie(e.detail.key));

        FavorView.setup(document.querySelector('#favor'))
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
            MovieView.hide();
            FavorView.hide();
        }
        else {
            document.querySelector('#search').style.display = 'none';
            MovieView.hide();
            FavorView.hide();
            this.fetchFavorList();
        }
    },

    fetchFavorList() {
        this.list();
    },

    search(query) {
        SearchModel.list(query).then(response => {
            MovieView.hide();
            ResultView.render(response.data);
        });
    },

    list() {
        const data = FavorModel.list();
        FavorView.render(data);
    },

    view(query) {
        SearchModel.view(query).then(response => {
            document.querySelector('#search').style.display = 'none';
            FavorView.hide();
            MovieView.render(response.data);
        });
    },

    add(key, data) {
        FavorModel.add(key, data);
        alert("추가되었습니다!");
    },

    delete(key) {
        FavorModel.delete(key);
        alert("삭제되었습니다!");
    },

    clear() {
        FavorModel.clear();
        alert("모두 삭제되었습니다!");
    },

    onSubmit(input) {
        let targetDate = input.split('-').join('');
        this.search(targetDate);
    },

    onChangeTab(tabName) {
        this.selectedTab = tabName
        this.renderView()
    },

    onClickMovie(key) {
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
