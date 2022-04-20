<template>
    <div class="loading">
        <span><i class="fas fa-circle-notch fa-spin text-white size-spinner"></i></span>
    </div>
</template>

<script>
export default {

    name: "loading",

    mounted() {
        document.querySelector('body').style.overflow = 'hidden'
    },

    destroyed() {
        document.querySelector('body').style.overflow = ''
    }

}
</script>

<style lang="scss" scoped>

    .size-spinner {
        font-size: 50px;
    }

    .loading {
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: fixed;
        background-color: #000000a3;
    }

</style>