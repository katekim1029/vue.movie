import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';

import SearchModel from '../models/SearchModel.js';

const tag= '[MainController]';

export default {
    init() {
        FormView.setup(document.querySelector('#searchForm'))
            .on('@submit', e => this.onSubmit(e.detail.input));

        TabView.setup(document.querySelector('#menuBox'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));

        ResultView.setup(document.querySelector('#movieList'));

        this.selectedTab = '검색하기';
        this.renderView();
    },

    renderView() {
        TabView.setActiveTab(this.selectedTab);
        ResultView.hide();
    },

    search(query) {
        // search api
        SearchModel.list(query).then(response => {
            this.onSearchResult(response.data);
        });
    },

    onSubmit(input) {
        let targetDate = input.split('-').join('');
        console.log(tag, 'onSubmit()', targetDate);
        this.search(targetDate);
    },

    onSearchResult(data) {
        ResultView.render(data);
    },

    onChangeTab(tabName) {
        debugger;
    }
}
