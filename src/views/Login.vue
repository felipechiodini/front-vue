<template>
    <div class="container-fluid">
        <div class="row justify-content-center align-items-center height-90vh">
            <div class="col-12">

                <logo></logo>

                <div class="row justify-content-center">
                    <div class="col-xl-4 col-lg-6 col-md-7 col-sm-8 col-12">
                        <div class="row mb-3">
                            <div class="col-12">
                                <label class="label-login">Faça o login para continuar</label>
                                <input type="tel" placeholder="CNPJ" @keyup.enter="login()" id="cnpj" v-mask="'##.###.###/####-##'" v-model="cnpj" class="input-cashback">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 d-flex mb-3">
                                <input type="password" placeholder="******" id="password" @keyup.enter="login()" class="input-cashback" v-model="password">
                                <button class="btn-ok" :disabled="loading" @click="login()"><div>OK</div></button>
                            </div>
                        </div>
                    </div>
                </div>

                <error :errors="errorsMessage"></error>

            </div>
        </div>

        <loading v-if="loading"></loading>

    </div>
</template>

<script>
import Cashback from '@/js/Cashback'
import Storage from '@/js/Utils/Storage';
import router from '@/router'

export default {

    data: () => {
        return {
            cnpj: '',
            password: '',
            loading: false,
            error: []
        }
    },

    computed: {
        errorsMessage() {
            return (this.error) ? this.error.reverse() : []
        }
    },

    methods: {

        focusOnField(id) {
            document.querySelector('#' + id).focus()
        },

        validateForm() {
            this.error = []

            if(!this.password.length) {
                this.error.push('Preencha a senha.')
                this.focusOnField('password')
            }

            if(!this.cnpj.length) {
                this.error.push('Preencha o CNPJ.')
                this.focusOnField('cnpj')
            } else if(!Cashback.validarCnpj(this.cnpj)) {
                this.error.push('CNPJ inválido.')
                this.focusOnField('cnpj')
            }

            return (this.error.length) ? false : true
        },

        setLoading(value) {
            this.loading = value
        },

        login() {
            if (!this.validateForm()) return false

            const vm = this
            this.setLoading(true)
            Cashback.login(this.cnpj, this.password).then((user) => {
                Storage.set('user', user)
                router.push('/home')
            }).catch((err) => {
                vm.error = err.response.data
            }).finally(() => {
                vm.setLoading(false)
            })
        },

    }
}
</script>

<style lang="scss" scoped>

    .label-login {
        text-align: center;
        word-spacing: 5px;
        width: 100%;
        margin-bottom: 7px;
        font-weight: 300;
        color: #727272;
        letter-spacing: 1px;
        font-size: 18px;
    }

    .height-90vh {
        height: 90vh;
    }

</style>