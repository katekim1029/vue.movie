import TabView from '../views/TabView.js';
import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
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

        MovieView.setup(document.querySelector('#search-view'))
            .on('@click', e => this.onClickAdd(e.detail.key, e.detail.info));

        this.selectedTab = '검색하기';
        this.renderView();
    },

    renderView() {
        TabView.setActiveTab(this.selectedTab);
        if(this.selectedTab === '검색하기') {
            MovieView.hide();
            document.querySelector('#favor').style.display = 'none';
        }
        else {

        }
        
    },

    search(query) {
        SearchModel.list(query).then(response => {
            MovieView.hide();
            ResultView.render(response.data);
        });
    },

    view(query) {
        SearchModel.view(query).then(response => {
            ResultView.hide();
            MovieView.render(response.data);
        });
    },

    add(key, data) {
        FavorModel.add(key, data);
        alert("추가되었습니다!");
    },

    onSubmit(input) {
        let targetDate = input.split('-').join('');
        this.search(targetDate);
    },

    onChangeTab(tabName) {
        debugger;
    },

    onClickMovie(key) {
        this.view(key);
    },

    onClickAdd(key, data) {
        this.add(key, data);
    }
}
