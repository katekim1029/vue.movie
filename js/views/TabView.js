import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.tabNames = {
    search : '검색하기',
    favorite : '즐겨찾기'
}

TabView.setup = function(elem) {
    this.init(elem);
    this.bindClick();
    return this;
}

TabView.setActiveTab = function(tabName) {
    Array.from(this.elem.querySelectorAll('a')).forEach(anchor => {
        anchor.parentNode.className = anchor.innerHTML === tabName ? 'active' : '';
    });
}

TabView.bindClick = function() {
    Array.from(this.elem.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            this.onClick(anchor.innerHTML);
        });
    });
}

TabView.onClick = function(tabName) {
    this.setActiveTab(tabName);
    this.emit('@change', { tabName });
}

export default TabView;
