<template>
    <div class="carousel">
        <transition name="slide">
            <div class="carousel__item" v-bind:key="currentIndex"><img v-bind:src="imageData[currentIndex]"></div>
        </transition>
        <button type="button" class="carousel__next" v-on:click="nextIndex">다음</button>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            imageIndex: 0,
            imageData: [
                'https://movie-phinf.pstatic.net/20180730_55/1532927800050iSgEs_JPEG/movie_image.jpg',
                'https://movie-phinf.pstatic.net/20180730_82/15329286640280Wu1t_JPEG/movie_image.jpg',
                'https://movie-phinf.pstatic.net/20180806_112/1533528494465BJWKD_JPEG/movie_image.jpg',
                'https://movie-phinf.pstatic.net/20180730_299/1532914028702Mgwti_JPEG/movie_image.jpg',
                'https://movie-phinf.pstatic.net/20180703_65/15305852198817R6a1_JPEG/movie_image.jpg'
            ]
        }
    },
    computed: {
        currentIndex() {
            return this.imageIndex % 5;
        }
    },
    methods: {
        nextIndex() {
            this.imageIndex++;
        },
    }
}
</script>

<style lang="scss" scoped>
.carousel {
    position:relative;
    overflow:hidden;
    width:100%;
    height:530px;
    &__prev {
       position:absolute;
       bottom:0;
       left:0;
       display:inline-block;
    }
    &__next {
        position:absolute;
        bottom:0;
        left:30px;
        display:inline-block;
    }
    &__item {
        position:absolute;
        overflow:hidden;
        width:100%;
        height:500px;
        margin:0;
    }
    img {
        display:block;
        width:100%;
    }
}
.slide-enter-active,
.slide-leave-active {
    transition:transform 0.5s;
}
.slide-enter {
    transform:translateX(100%);
}
.slide-leave-active {
    transform:translateX(-100%);
}
</style>
