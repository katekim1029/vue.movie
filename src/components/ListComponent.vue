<template>
    <div v-if="data.length">
        <ul class="list" v-bind:class="listType">
            <li class="list__item" v-for="item in data">
                <button type="button" class="list__btn-delete" v-on:click="onDeleteList(item.movieCd)" v-if="favoriteType"><i class="fas fa-minus-circle fa-lg"></i></button>
                <a href="#" class="list__link" v-on:click.prevent="onClickList(item.movieCd)">
                    <i class="list__rank" v-if="resultType">{{ item.rank }}</i>
                    {{ item.movieNm }}
                </a>       
            </li>
        </ul>
        <div class="btn-set" v-if="favoriteType">
            <button type="button" class="btn-set__clear" v-on:click="onClearList">즐겨찾기 모두 삭제</button>
        </div>
    </div>
    <div v-else>
        <p class="no-data" v-if="resultType">검색 결과가 없습니다</p>
        <p class="no-data" v-if="favoriteType">즐겨찾기 항목이 없습니다</p>
    </div>
</template>

<script>
export default {
    props: ['data', 'type'],
    computed: {
        listType() {
            return this.type === 'result' ? 'list--movie' : 'list--favor'
        },
        resultType() {
            return this.type === 'result';
        },
        favoriteType() {
            return this.type === 'favorite';
        }
    },
    methods: {
        onDeleteList(movie) {
            this.$emit('@delete', movie);
        },
        onClickList(movie) {
            this.$emit('@click', movie);
        },
        onClearList() {
            this.$emit('@clear');
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    &__item {
        position:relative;
        margin:10px 0;
        border-bottom:1px solid #eee;
        font-size:20px;
    }
    &__btn-delete {
        position:absolute;
        top:7px;
        left:0;
    }
    &__rank {
        position:absolute;
        left:0;
    }
    &.list--movie {
        .list__item {
            padding-left:40px;
        }
    }
    &.list--favor {
        margin-top:55px;
        .list__item {
            padding-left:24px;
        } 
        .list__item:last-of-type {
            border-bottom:0;
        }  
    }
}
.btn-set {
    margin-top:20px;
    &__clear {
        width:100%;
        height:40px;
        background:#666;
        color:#fff;
        font-size:15px;
    }
}
</style>
