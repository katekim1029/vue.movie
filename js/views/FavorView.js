import View from './View.js';

const tag = '[FavorView]';

const FavorView = Object.create(View);

FavorView.setup = function(elem) {
    this.init(elem);
    return this;
}

FavorView.message = {
    NO_RESULT: '즐겨찾기 항목이 없습니다'
}

FavorView.render = function(data = []) {
    const result = data;
    if(result.length) {
        this.elem.innerHTML = this.getResultHtml(result);
        this.bindClickEvent();
    }
    else {
        this.elem.innerHTML = this.message.NO_RESULT;
    }
    this.show();
}

FavorView.getResultHtml = function(data) {
    let html = '';
    html += data.reduce((html, item) => {
        html += `<li data-key="${ item.movieCd }">
                    <button type="button" class="btn-delete"><i class="fas fa-minus-circle fa-lg"></i></button>
                    <a href="#">
                        ${ item.movieNm }
                    </a>
                </li>`;
        return html;
    }, '<ul class="list-favor">') + '</ul>';
    html += `<div class="btn-set">
                <button type="button" class="btn-clear">즐겨찾기 모두 삭제</button>
            </div>`;
    return html;
}

FavorView.bindClickEvent = function() {
    Array.from(this.elem.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', e => this.onClickItem(e));
    });
    Array.from(this.elem.querySelectorAll('.btn-delete')).forEach(button => {
        button.addEventListener('click', e => this.onClickDelete(e));
    });
    this.elem.querySelector('.btn-clear').addEventListener('click', e => this.onClickClear(e));
}

FavorView.onClickItem = function(e) {
    const {key} = e.currentTarget.parentNode.dataset;
    this.emit('@click', {key});
}

FavorView.onClickDelete = function(e) {
    const {key} = e.currentTarget.parentNode.dataset;
    this.emit('@delete', {key});
}

FavorView.onClickClear = function(e) {
    this.emit('@clear');
}

export default FavorView;
