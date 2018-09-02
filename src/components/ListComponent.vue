<template>
    <div v-if="data.length">
        <ul v-bind:class="listType">
            <li v-for="item in data">
                <button type="button" class="btn-delete" v-on:click="onDeleteList(item.movieCd)" v-if="favoriteType"><i class="fas fa-minus-circle fa-lg"></i></button>
                <a href="#" v-on:click="onClickList(item.movieCd)">
                    <i v-if="resultType">{{ item.rank }}</i>
                    {{ item.movieNm }}
                </a>       
            </li>
        </ul>
        <div class="btn-set" v-if="favoriteType">
            <button type="button" class="btn-clear" v-on:click="onClearList">즐겨찾기 모두 삭제</button>
        </div>
    </div>
    <div v-else>
        <span v-if="resultType">검색 결과가 없습니다</span>
        <span v-if="favoriteType">즐겨찾기 항목이 없습니다</span>
    </div>
</template>

<script>
export default {
    props: ['data', 'type'],
    computed: {
        listType() {
            return this.type === 'result' ? 'list-movie' : 'list-favor'
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

<style lang="scss">
</style>
