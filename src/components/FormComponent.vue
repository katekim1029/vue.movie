<template>
    <div class="search">
        <input type="date" v-model="inputValue" v-on:change="onSubmit" placeholder="날짜를 선택하세요" class="inp-date">
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

<style lang="scss">
</style>
