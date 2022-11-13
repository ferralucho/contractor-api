const JobService = require('../../../src/services/jobs')
jest.mock('../../../src/models/model')
const { Job, Contract, Profile } = require('../../../src/models/model')

let jobService
beforeAll(() => {
  jobService = new JobService(Job, Contract, Profile)
})

test('Find unpaid jobs for a client profile', async () => {
  const job = {
    description: 'work',
    price: 1,
    paid: false,
    ContractId: 10,
  }

  Job.findOne.mockResolvedValue(job)

  const contracts = [
    {
      id: 10,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 8,
    },
  ]

  Contract.findAll.mockResolvedValue(contracts)
  const jobs = await jobService.getAllUnpaidByUser(contracts[0].ClientId)
  expect(jobs).toHaveLength(1)
})

test('Find unpaid jobs for a contractor profile', async () => {
  const job = {
    description: 'work',
    price: 1,
    paid: false,
    ContractId: 10,
  }

  Job.findOne.mockResolvedValue(job)

  const contracts = [
    {
      id: 10,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 8,
    },
  ]

  Contract.findAll.mockResolvedValue(contracts)
  const jobs = await jobService.getAllUnpaidByUser(contracts[0].ContractorId)
  expect(jobs).toHaveLength(1)
})

test('When pay the talance from the client is transferred to the contractor', async () => {
  const contract = {
    id: 10,
    terms: 'bla bla bla',
    status: 'in_progress',
    ClientId: 4,
    ContractorId: 8,
  }

  Contract.findOne.mockResolvedValue(contract)

  const job = {
    id: 1,
    description: 'work',
    price: 1,
    paid: false,
    ContractId: 10,
  }

  Job.findOne.mockResolvedValue(job)

  const clientProfile = {
    id: 1,
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 1150,
    type: 'client',
  }

  Profile.findOne.mockResolvedValue(clientProfile)

  const contractorProfile = {
    id: 6,
    firstName: 'Linus',
    lastName: 'Torvalds',
    profession: 'Programmer',
    balance: 1214,
    type: 'contractor',
  }

  Profile.findOne.mockResolvedValue(contractorProfile)
  await jobService.payJob(clientProfile.id, job.id)
})
