const database = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: { ...where } })
    }

    async pegaUmRegistro(id) {
        return database[this.nomeDoModelo].findOne({ where: { id: id } })
    }
    async criaRgistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } }, transacao)
    }
    async apagaRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }
    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
    }
    async consultaRegistroApagado(id) {
        return database[this.nomeDoModelo]
            .findOne({ paranoid: false, where: { id: Number(id) } })
    }

    async encontraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoModelo]
            .findAndCountAll({ where: { ...where }, ...agregadores })
    }

}

module.exports = Services