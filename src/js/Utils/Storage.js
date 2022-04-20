class storageService {

    set(item, value) {
        localStorage.setItem(item, JSON.stringify(value))
    }

    get(item, prop) {
        if (!prop) return JSON.parse(localStorage.getItem(item))
        else {
            var dados = JSON.parse(localStorage.getItem(item))
            if (dados && prop in dados) return dados[prop]
            else return false
        }
    }

    clear(item, prop) {
        if (!prop) localStorage.removeItem(item)
        else {
            var dados = JSON.parse(localStorage.getItem(item))
            if (dados && prop in dados) {
                dados[prop] = null
                localStorage.setItem(item, JSON.stringify(dados))
            }
        }
    }

    reset() {
        localStorage.clear()
    }

}

export default new storageService()
