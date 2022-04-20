import Router from '@/router'
import Api from './Utils/serviceConfig'
import Storage from './Utils/Storage';

class CashbackService {

    login(cnpj, password) {
        cnpj = this.clearString(cnpj)

        return new Promise((resolve, reject) => {
            Api.post('/login', { cnpj: cnpj, password: password }).then((result) => {
                const _this = this
                result.data.login_date = new Date().getTime() //setting the current time to track if the login is expired
                Api.defaults.headers.common['Authorization'] = result.data.token;
                Api.interceptors.request.use((config) => {
                    if(_this.isExpiredLogin()) {
                        _this.logoff()
                        Router.push('login')
                    }
                    return config
                })
                resolve(result.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    isExpiredLogin() {
        const expiryTimeInSeconds = 86400 // the session will expiry in x seconds
        const now = new Date().getTime() 
        const loginDate = new Date(Storage.get('user', 'login_date')).getTime() 

        if(loginDate + (expiryTimeInSeconds * 1000) < now) {
            return true
        }

        return false
    }

    logoff() {
        Storage.reset();
    }

    getExtrato(cpf) {
        return new Promise((resolve, reject) => {
            Api.post('/extrato', { cpf: cpf }).then((result) => {
                resolve(result.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    getSaldo(cpf) {
        return new Promise((resolve, reject) => {
            if (!this.validarCPF(cpf) || !cpf.length) {
                reject(['CPF Inválido.'])
            }

            Api.post('/saldo', { cpf: this.clearString(cpf) }).then((result) => {
                resolve(result.data)
            }).catch((error) => {
                reject([error.response.data.msg])
            })
        })
    }

    getVoucher(cpf) {
        return new Promise((resolve, reject) => {
            Api.post('/voucher', { cpf: this.clearString(cpf) }).then((result) => {
                resolve(result.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    
    registrar(cpf, valor, observacao) {
        return new Promise((resolve, reject) => {
            Api.post('/registrar', { cpf: cpf, valor: parseFloat(valor), observacao: observacao }).then((result) => {
                resolve(result.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    avaliarResgate(cpf, valor) {
        return new Promise((resolve, reject) => {
            Api.post('/avaliar', { cpf: cpf, valor_pedido: parseFloat(valor) }).then((result) => {
                resolve(result.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    resgatar(cpf, valor) {
        return new Promise((resolve, reject) => {
            Api.post('/resgatar', { cpf: cpf, valor_pedido: parseFloat(valor) }).then((result) => {
                resolve(result.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');	
        if(cpf == '') return false;	
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return false;		
        // Valida 1o digito	
        let add = 0
        for (let i = 0; i < 9; i ++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return false;
        // Valida 2o digito	
        add = 0
        for (let i = 0; i < 10; i ++)
            add += parseInt(cpf.charAt(i)) * (11 - i);	
        let rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	
            rev = 0;	
        if (rev != parseInt(cpf.charAt(10)))
            return false;		
        return true;   
    }

    validarCnpj(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g,'');
        
        if(cnpj == '') return false;
            
        if (cnpj.length != 14)
            return false;
        
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
                
        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
                
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
                return false;
                
        return true;
    }

    clearString(string) {
        return string.replace(/[^0-9]/g, '')
    }

    formaterCurrency(value) {
        return parseFloat(value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    }

}

export default new CashbackService();