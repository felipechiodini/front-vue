<template>
    <div>
        <div class="row justify-content-center mb-2">
            <div class="col-auto">
                <img src="@/assets/live.svg" :style="`width: ${width};`" alt="LIVE">
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-auto">
                <h3 class="subtitle">Cashback</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name: 'logo',

    props: {
        width: {
            default: '150px'
        }
    }

}
</script>

<style lang="scss" scoped>

    .subtitle {
        text-transform: uppercase;
        text-align: center;
        color: #707070;
        font-size: 38px;
        font-weight: 300;
    }

</style>
