const { TurmasServices } = require('../services')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const turmasServices = new TurmasServices()

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const where = {}
    const { data_inicial, data_final } = req.query

    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null

    try {
      const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where)
      return res.status(200).json(todasAsTurmas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await turmasServices.pegaUmRegistro(Number(id))
      return res.status(200).json(umaTurma)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await turmasServices.criaRgistro(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      const turmaAtualizada = await turmasServices.atualizaRegistro(novasInfos, id)
      return res.status(200).json({Mensagem: `Turma com ID ${id}, atualizada`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params
    try {
      await turmasServices.apagaRegistro(Number(id))
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params
    try {
      await turmasServices.restauraRegistro(Number(id))
      res.status(200).json({ mensagem: `ID ${id} restaurado com sucesso!` })
    } catch (error) {
      res.status(500).json(error.mensage)
    }
  }
}

module.exports = TurmaController