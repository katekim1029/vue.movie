export default {
    template: '#list-area',
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
