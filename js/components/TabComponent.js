export default {
    template: '#tab-box',
    props: ['tabs', 'selectedTab'],
    methods: {
        onClickTab(tab) {
            this.$emit('@click', tab);
        }
    }
}
