import View from './View.js';

const tag = '[ResultView]';

const ResultView = Object.create(View);

ResultView.setup = function(elem) {
    this.init(elem);
    return this;
}

ResultView.message = {
    NO_RESULT: '검색 결과가 없습니다'
}

ResultView.render = function(data = []) {
    const result = data.boxOfficeResult.dailyBoxOfficeList;
    this.elem.innerHTML = result.length ? this.getResultHtml(result) : this.message.NO_RESULT;
    this.bindClickEvent();
    this.show();
}

ResultView.getResultHtml = function(data) {
    return data.reduce((html, item) => {
        html += `<li>
            <a href="#" data-key="${ item.movieCd }">
                <i>${ item.rank } /</i>
                ${ item.movieNm }
            </a>
        </li>`;
        return html;
    }, '<ul class="list-movie">') + '</ul>';
}

ResultView.bindClickEvent = function() {
    Array.from(this.elem.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', e => this.onClickItem(e));
    });
}

ResultView.onClickItem = function(e) {
    const {key} = e.currentTarget.dataset;
    this.emit('@click', {key});
}

export default ResultView;
