<template>
    <nav class="menu-box">
        <ul class="menu-list">
            <li v-for="tab in tabs" v-bind:class="{active: tab.text === selectedTab}">
                <a v-bind:href="tab.link" v-on:click.prevent="onClickTab(tab.text)">{{ tab.text }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ['tabs', 'selectedTab'],
    methods: {
        onClickTab(tab) {
            this.$emit('@click', tab);
        }
    }
}
</script>

<style lang="scss">
</style>
