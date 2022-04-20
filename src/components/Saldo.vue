<template>
    <div class="row justify-content-center overflow-hidden box-height">
        <div class="col-10 col-sm-10 col-md-6 col-lg-4 col-xl-4 border border-dark rounded p-3">

            <div class="row justify-content-center align-items-center h-100 overflow-hidden" v-if="!loading">
                <transition name="slide-fade">
                    <button v-if="getStep == 2 || getStep == 3" class="btn-back-step" @click="goBack()"><span><i class="fas fa-chevron-left"></i></span></button>
                </transition>

                <div class="col-10">

                    <transition name="slide-fade">
                        <div class="row" v-if="getStep == 1">
                            <div class="col-12">
                                <h6 class="h">Saldo disponível:</h6>
                                <h2 class="h mb-4"> {{ labelSaldo }} </h2>
                                <h6 class="h">Informe o <b style="font-weight: bold;">valor do pedido</b> para que o sistema calcule o resgate do cashback</h6>
                                <div class="position-relative">
                                    <money type="tel" id="valorPedido" class="resgate-input" placeholder="Valor do pedido" v-model="valorPedido"></money>
                                    <button class="btn-ok-resgate" @click="verificarResgate()"><div>OK</div></button>
                                </div>
                                <div class="row justify-content-center mt-1" v-if="isValorPedidoError.status">
                                    <div class="col-auto">
                                        <i class="fas fa-exclamation-triangle text-danger"></i>
                                        {{ isValorPedidoError.msg }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <transition name="slide-fade">
                        <div class="row" v-if="getStep == 2">
                            <div class="col-12" >
                                <h6 class="h">Disponível para resgate*</h6>
                                <h2 class="h"> {{ labelSaldoDisponivel }} </h2>
                                <small>*Limite para resgate: 20% do valor do pedido</small>
                                <button class="btn-resgate my-4" @click="confirmarResgate()">Confirmar resgate</button><br>
                                <small>Isto não irá aplicar automaticamente o desconto ao pedido mas sim dar baixa nos pontos do cliente de acordo com as regras</small>
                            </div>
                        </div>
                    </transition>

                    <transition name="slide-fade">
                        <div class="row justify-content-center" v-if="getStep == 3">
                            <div class="col-12">
                                <h5 class="h">Resgate realizado</h5>
                                <h1 class="h"> {{ labelValorResgate }} </h1>
                                <small>Identificador {{ '#' + identificador }}</small>
                            </div>
                        </div>
                    </transition>

                </div>
            </div>

            <div class="d-flex justify-content-center align-items-center h-100" v-else>
                <span><i class="fas fa-circle-notch fa-spin" style="font-size: 50px;"></i></span>
            </div>

        </div>
    </div>
</template>

<script>
import Cashback from '@/js/Cashback'

export default {

    props: {
        cpf: {
            required: true
        }
    },

    data: () => {
        return {
            saldo: 0,
            valorPedido: 0,
            saldoDisponivel: 0,
            valorResgate: 0,
            identificador: 0,
            step: 1,
            loading: false,
            errors: [],
        }
    },

    computed: {

        labelSaldo() {
            return Cashback.formaterCurrency(this.saldo)
        },

        labelSaldoDisponivel() {
            return Cashback.formaterCurrency(this.saldoDisponivel)
        },

        labelValorResgate() {
            return Cashback.formaterCurrency(this.valorResgate)
        },

        isValorPedidoError() {
            let error = this.errors.find(error => error.field == 'valorPedido')
            if(error) {
                return { status: true, msg: error.msg }
            }
            return { status: false, msg: '' }
        },

        getStep() {
            return this.step
        },

    },

    mounted() {
        this.getSaldoDisponivel()
    },

    methods: {

        getSaldoDisponivel() {
            const vm = this
            this.setLoading(true)
            Cashback.getSaldo(this.cpf).then((result) => {
                vm.saldo = parseFloat(result.valor)
            }).catch((err) => {
                alert(err)
            }).finally(() => {
                vm.setLoading(false)
            })
        },

        validateValorPedido() {

            if (!this.saldo) {
                return false
            }

            if(!this.valorPedido) {
                this.errors.push({ field: 'valorPedido', msg: 'Informe o valor do pedido' })
                return false
            } else {
                let index = this.errors.findIndex(error => error.field == 'valorPedido')
                if(index !== -1) {
                    this.errors.splice(index, 1)
                }
                return true
            }
        },

        verificarResgate() {
            if (!this.validateValorPedido()) return false

            const vm = this
            this.setLoading(true)
            Cashback.avaliarResgate(this.cpf, this.valorPedido).then((result) => {
                vm.saldoDisponivel = result.disponivel
                vm.setStep(2)
            }).catch((err) => {
                alert(err)
            }).finally(() => {
                vm.setLoading(false)
            })
        },

        confirmarResgate() {
            const vm = this
            this.setLoading(true)
            Cashback.resgatar(this.cpf, this.valorPedido).then((result) => {
                vm.valorResgate = result.valor_resgatado
                vm.setIdentificador(result.identificador)
                vm.setStep(3)
                vm.$emit('updateExtrato')
            }).catch((err) => {
                alert(err)
            }).finally(() => {
                vm.setLoading(false)
            })
        },

        goBack() {
            if(this.getStep == 2) {
                this.setStep(1)
            } else if (this.getStep == 3) {
                this.getSaldoDisponivel()
                this.valorPedido = 0
                this.setStep(1)
            }
        },

        setStep(step) {
            this.step = step
        },

        setLoading(value) {
            this.loading = value
        },

        setIdentificador(identificador) {
            this.identificador = identificador
        }

    }

}
</script>

<style lang="scss" scoped>

    .resgate-input {
        width: 100%;
        padding: 10px;
        border: 1px solid black;
        border-radius: 3px;
    }

    .btn-resgate {
        width: 100%;
        border: none;
        border-radius: 20px;
        color: #FFFFFF;
        font-weight: 300;
        background-color: #26cc84;
        text-transform: uppercase;
        padding: 10px 25px;
        font-size: 15px;
    }

    .btn-back-step {
        position: absolute;
        left: -25px;
        top: 45%;
        border: none;
        background-color: #303030;
        color: #FFFFFF;
        height: 50px;
        width: 50px;
        padding: 10px;
        border-radius: 50%;
    }

    .box-height {
        min-height: 370px;
    }

    .slide-fade-enter-active {
        transition: all .5s linear;
    }

    .slide-fade-leave-active {
        display: none;
        transition: all .3s linear;
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transition: all .3s ease;
        opacity: 0;
    }

</style>