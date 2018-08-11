import View from './View.js';

const tag = '[ResultView]';

const ResultView = Object.create(View);

ResultView.setup = function(elem) {
    this.init(elem);
}

ResultView.message = {
    NO_RESULT: '검색 결과가 없습니다'
}

ResultView.render = function(data = []) {
    const result = data.boxOfficeResult.dailyBoxOfficeList;
    this.elem.innerHTML = result.length ? this.getSearchResultHtml(result) : this.message.NO_RESULT;
    this.show();
}

ResultView.getSearchResultHtml = function(data) {
    return data.reduce((html, item) => {
        html += this.getSearchItemHtml(item)
        return html;
    }, '<ul class="list-movie">') + '</ul>';
}

ResultView.getSearchItemHtml = function(item) {
    return `<li>
        <a href="#" data-key="${ item.movieCd }">
            <i>${ item.rank } /</i>
            ${ item.movieNm }
        </a>
    </li>`;
}

export default ResultView;
