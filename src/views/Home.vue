<template>
    <div class="container-fluid">
        <div class="row align-items-center height-70vh my-4">
            <div class="col-12">

                <logo class="mb-3"></logo>

                <cpf class="mb-4" @update="update()"></cpf>

                <cash-back ref="cashback" v-show="cpf"></cash-back>

            </div>
        </div>
     
        <loading v-if="loading"></loading>

    </div>
</template>

<script>
import CashBack from '@/components/CashBack'
import Cpf from '@/components/Cpf'
import Storage from '@/js/Utils/Storage';

export default {

    components: {
        Cpf,
        CashBack
    },

    data: () => {
        return {
            loading: false,
            cpf: '',
        }
    },

    mounted() {
        document.querySelector('#cpf').focus()
    },

    methods: {

        update() {
            let newCpf = Storage.get('customer', 'cpf')
            let newNome = Storage.get('customer', 'nome')
            this.cpf = newCpf
            this.$refs.cashback.cpf = newCpf
            this.$refs.cashback.nome = newNome
            this.$refs.cashback.forceRerender()
        },

    }

}
</script>

<style lang="scss" scoped>

    .height-70vh {
        height: 70vh;
    }

</style>