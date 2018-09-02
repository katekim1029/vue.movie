<template>
    <div v-if="!!data">
        <dl class="detail-movie">
            <dt>영화제목</dt>
            <dd>{{ data.movieNm }}</dd>
            <dd>{{ data.movieNmEn }}</dd>
            <dt>개봉연도</dt>
            <dd>{{ data.openDt }}</dd>
            <dt>상영시간</dt>
            <dd>{{ data.showTm }}</dd>
            <dt>제작국가</dt>
            <dd>
                <span v-for="nation in data.nations">
                    {{ nation.nationNm }}
                </span>
            </dd>
            <dt>감독</dt>
            <dd>
                <span v-for="director in data.directors">
                    {{ director.peopleNm }}
                </span>
            </dd>
            <dt>배우들</dt>
            <dd>
                <span v-for="actor in data.actors">
                    {{ actor.peopleNm }} /
                </span>
            </dd>
        </dl>
        <div class="btn-set" v-if="resultType">
            <button type="button" class="btn-add" v-on:click="onClickBtn">즐겨찾기 추가</button>
        </div>
    </div>
    <div v-else>
        영화 정보가 없습니다
    </div>
</template>

<script>
export default {
    props: ['data', 'selectedTab'],
    computed: {
        resultType() {
            return this.selectedTab === '검색하기';
        }
    },
    methods: {
        onClickBtn() {
            this.$emit('@click');
        }
    }
}
</script>

<style lang="scss">
</style>
