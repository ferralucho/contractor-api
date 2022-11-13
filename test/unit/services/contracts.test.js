const ContractService = require('../../../src/services/contracts')
jest.mock('../../../src/models/model')
const { Contract } = require('../../../src/models/model')

let contractService
beforeAll(() => {
  contractService = new ContractService(Contract)
})

test('should fetch all contracts', async () => {
  const contracts = [
    {
      id: 2,
      terms: 'bla bla bla',
      status: 'in_progress',
      createdAt: '2022-11-13T15:48:24.664Z',
      updatedAt: '2022-11-13T15:48:24.664Z',
      ContractorId: 6,
      ClientId: 1,
    },
  ]

  Contract.findAll.mockResolvedValue(contracts)
  const resp = await contractService.getAllByUser(contracts[0].ClientId)
  expect(resp).toEqual(contracts)
  expect(Contract.findAll).toHaveBeenCalled()
})

test('should fetch a contract by id', async () => {
  const contract = {
    id: 2,
    terms: 'bla bla bla',
    status: 'in_progress',
    createdAt: '2022-11-13T15:48:24.664Z',
    updatedAt: '2022-11-13T15:48:24.664Z',
    ContractorId: 6,
    ClientId: 1,
  }

  Contract.findOne.mockResolvedValue(contract)
  const resp = await contractService.getById(contract.ClientId, contract.ContractorId)
  expect(resp).toEqual(contract)
  expect(Contract.findOne).toHaveBeenCalled()
})
