<template>
    <div class="search">
        <input type="date" v-model="inputValue" v-on:change="onSubmit" placeholder="날짜를 선택하세요" class="search__date">
    </div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            inputValue: this.value
        }
    },
    methods: {
        onSubmit() {
            this.$emit('@submit', this.inputValue);
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    margin-bottom:15px;
    &__date {
        width:100%;
        height:40px;
        font-size:17px;
        text-indent:10px;
        border:1px solid #999;
    }
}
</style>
