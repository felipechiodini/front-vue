<template>
    <div class="container-fluid">
        <div class="row align-items-center height-100">
            <div class="col-12">
                <div class="row justify-content-center align-items-center mb-5">
                    <div class="col-auto">
                        <logo width="150px"></logo>
                    </div>
                </div>
                <div class="row justify-content-center mb-5">
                    <div class="col-auto d-flex">
                        <span class="text-center">
                            <h1 class="h">404</h1>
                            <h4 class="mt-4 h">Página não encontrada.</h4>
                        </span>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-10">
                        <button class="btn-back w-100" @click="back()">Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Router from '@/router'

export default {

    methods: {
        back() {
            Router.push('/home')
        }
    }

}
</script>

<style lang="scss" scoped>

    .size-icon {
        font-size: 50px;
    }

    .height-100 {
        height: 80vh;
    }

    .btn-back {
        border: none;
        padding: 7px;
        background-color: #303030;
        border-radius: 50px;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: lighter;
    }

</style>