<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-6 col-md-7 col-sm-8 col-12">
                <input autocomplete="off" type="tel" placeholder="CPF" id="cpf" @keyup.enter="getSaldo()" v-mask="'###.###.###-##'" v-model="cpf" class="input-cashback">
                <button class="btn-ok" @click="getSaldo()"><div>OK</div></button>
            </div>
        </div>

        <error :errors="error"></error>

        <loading v-if="loading"></loading>

    </div>
</template>

<script>
import Cashback from '@/js/Cashback'
import Storage from '@/js/Utils/Storage'

export default {

    data: () => {
        return {
            cpf: '',
            error: [],
            loading: false
        }
    },

    computed: {

    },

    methods: {

        getSaldo() {
            const vm = this
            this.setLoading(true)
            Cashback.getSaldo(this.cpf).then((result) => {
                result.cpf = vm.cpf
                Storage.set('customer', result)
                vm.$emit('update')
                vm.setErrors([])
            }).catch((err) => {
                Storage.clear('customer')
                vm.$emit('update')
                vm.setErrors(err)
                vm.focusOnInputCpf()
            }).finally(() => {
                vm.setLoading(false)
            })
        },

        setLoading(value) {
            this.loading = value
        },

        focusOnInputCpf() {
            document.querySelector('#cpf').focus()
        },

        setErrors(errors) {
            this.error = errors
        }

    }

}
</script>

<style lang="scss" scoped>

</style>