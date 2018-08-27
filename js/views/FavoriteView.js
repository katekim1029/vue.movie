import View from './View.js';

const tag = '[FavoriteView]';

const FavoriteView = Object.create(View);

FavoriteView.setup = function(elem) {
    this.init(elem);
    return this;
}

FavoriteView.message = {
    NO_RESULT: '즐겨찾기 항목이 없습니다'
}

FavoriteView.render = function(data = []) {
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

FavoriteView.getResultHtml = function(data) {
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

FavoriteView.bindClickEvent = function() {
    Array.from(this.elem.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.stopPropagation();
            this.onClickItem(anchor.parentElement.dataset.key);
        });
    });
    Array.from(this.elem.querySelectorAll('.btn-delete')).forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            this.onClickDelete(btn.parentElement.dataset.key);
        });
    });
    this.elem.querySelector('.btn-clear').addEventListener('click', e => this.onClickClear(e));
}

FavoriteView.onClickItem = function(key) {
    this.emit('@click', {key});
}

FavoriteView.onClickDelete = function(key) {
    this.emit('@delete', {key});
}

FavoriteView.onClickClear = function(e) {
    this.emit('@clear');
}

export default FavoriteView;
