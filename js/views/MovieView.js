import View from './View.js';

const tag = '[MovieView]';

const MovieView = Object.create(View);

MovieView.setup = function(elem) {
    this.init(elem);
    return this;
}

MovieView.message = {
    NO_RESULT: '영화 정보가 없습니다'
}

MovieView.render = function(data = []) {
    const result = data.movieInfoResult.movieInfo;
    if(!!result) {
        this.elem.innerHTML = this.getResultHtml(result);
        this.bindClickEvent(result);
    }
    else {
        this.elem.innerHTML = this.message.NO_RESULT;
    }
    this.show();
}

MovieView.getResultHtml = function(data) {
    const actors = (data.actors.map(a => a.peopleNm)).join(' / ');
    return `<dl class="detail-movie">
                <dt>영화제목</dt>
                <dd>${ data.movieNm } </dd>
                <dd>${ data.movieNmEn }</dd>
                <dt>개봉연도</dt>
                <dd>${ data.openDt }</dd>
                <dt>상영시간</dt>
                <dd>${ data.showTm }</dd>
                <dt>제작국가</dt>
                <dd>${ data.nations[0].nationNm }</dd>
                <dt>감독</dt>
                <dd>${ data.directors[0].peopleNm }</dd>
                <dt>배우들</dt>
                <dd>${ actors }</dd>
            </dl>
            <div class="btn-set">
                <button type="button" class="btn-add">즐겨찾기 추가</button>
            </div>
            `;
}

MovieView.bindClickEvent = function(data) {
    this.elem.querySelector('.btn-add').addEventListener('click', e => this.onClickAdd(data));
}

MovieView.onClickAdd = function(data) {
    const key = data.movieCd;
    const info = { movieCd: data.movieCd, movieNm: data.movieNm };
    this.emit('@click', {key, info});
}

export default MovieView;
