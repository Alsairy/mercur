export interface GovernmentServiceInterface {
  listGovernmentEntities(filters: any, config?: any): Promise<any[]>
  createGovernmentEntities(data: any): Promise<any>
  listGovernmentOfficials(filters: any, config?: any): Promise<any[]>
  createGovernmentOfficials(data: any): Promise<any>
  updateGovernmentEntity(id: string, data: any): Promise<any>
  updateGovernmentOfficial(id: string, data: any): Promise<any>
  deleteGovernmentEntity(id: string): Promise<void>
  deleteGovernmentOfficial(id: string): Promise<void>
}
