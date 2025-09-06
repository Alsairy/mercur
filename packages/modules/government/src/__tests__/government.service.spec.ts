import GovernmentModuleService from "../service"

describe("GovernmentModuleService", () => {
  let service: GovernmentModuleService

  beforeEach(() => {
    service = new GovernmentModuleService({} as any)
  })

  describe("Government Entity Management", () => {
    it("should be defined", () => {
      expect(service).toBeDefined()
    })

    it("should have government entity methods", () => {
      expect(service.createGovernmentEntities).toBeDefined()
      expect(service.listAndCountGovernmentEntities).toBeDefined()
    })
  })

  describe("Government Official Management", () => {
    it("should have government official methods", () => {
      expect(service.createGovernmentOfficials).toBeDefined()
      expect(service.listAndCountGovernmentOfficials).toBeDefined()
    })
  })
})
