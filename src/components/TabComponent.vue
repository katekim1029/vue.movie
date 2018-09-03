<template>
    <nav class="menu">
        <ul class="menu__list">
            <li class="menu__item" v-for="tab in tabs" v-bind:class="{'item--active': tab.text === selectedTab}">
                <a class="menu__link" v-bind:href="tab.link" v-on:click.prevent="onClickTab(tab.text)">{{ tab.text }}</a>
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

<style lang="scss" scoped>
.menu {
    &__list {
        overflow:hidden;
        margin-top:20px;
    }
    &__item {
        float:left;
        width:50%;
        &:first-of-type {
            .menu__link {
                border-right:0;
            }
        }
        &.item--active {
            .menu__link {
                background:#eee;
                font-weight:bold;
            }
        }
    }
    &__link {
        display:block;
        height:50px;
        line-height:50px;
        text-align:center;
        font-size:20px;
        border:1px solid #333;
        &:hover {
            text-decoration:none;
        }
    }
}
</style>
