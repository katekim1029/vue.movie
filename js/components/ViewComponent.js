export default {
    template: '#view-area',
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
