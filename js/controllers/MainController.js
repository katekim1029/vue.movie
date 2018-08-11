import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';

import SearchModel from '../models/SearchModel.js';

const tag= '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('#searchForm'))
            .on('@submit', e => this.onSubmit(e.detail.input));

        ResultView.setup(document.querySelector('#movieList'));
    },

    onSubmit(input) {
        let targetDate = input.split('-').join('');
        console.log(tag, 'onSubmit()', targetDate);
        this.search(targetDate);
    },

    search(query) {
        console.log(tag, 'search()', query);
        // search api
        SearchModel.list(query).then(response => {
            this.onSearchResult(response.data);
        });
    },

    onSearchResult(data) {
        console.log(data);
        ResultView.render(data);
    }
}
