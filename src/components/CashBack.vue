<template>
    <div :key="componentKey" class="row justify-content-center">
        <div class="col-12">

            <div class="row justify-content-center mb-4">
                <div class="col-auto">
                    <h5 class="text-center name mb-1">{{ clienteNome }}</h5>
                    <h4 class="text-center cpf mb-1">{{ clienteCpf }}</h4>
                </div>
            </div>

            <saldo v-if="cpf" :cpf="cpf" @updateExtrato="updateExtrato()"></saldo>

            <extrato ref="extrato" v-if="cpf" :cpf="cpf"></extrato>

            <voucher ref="voucher" v-if="cpf" :cpf="cpf"></voucher>

        </div>
    </div>
</template>

<script>
import Extrato from '@/components/Extrato';
import Voucher from '@/components/Voucher';
import Saldo from '@/components/Saldo';

export default {

    components: {
        Extrato,
        Voucher,
        Saldo
    },

    data: () => {
        return {
            nome: '',
            cpf: '',
            componentKey: 0
        }
    },

    computed: {

        clienteNome() {
            if (this.nome) return this.nome
            else return ""
        },

        clienteCpf() {
            if (this.cpf) return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4")
            else return ""
        },

    },

    methods: {

        updateExtrato() {
            this.$refs.extrato.getDataExtrato()
        },

        forceRerender() {
            this.componentKey += 1
        }

    }

}
</script>

<style lang="scss" scoped>

    .name {
        font-weight: 300;
        word-spacing: 5px;
        font-size: 27px;
        text-transform: capitalize;
    }

    .cpf {
        font-weight: 300;
        word-spacing: 5px;
    }

</style>