export interface Extension {
  id: number;
  nombre: string;
  departamento: string;
  sede: string;
  numeroExtension: string;
}

export interface ExtensionFilters {
  buscar: string;
  departamento: string;
  sede: string;
}

export interface CreateExtensionData {
  nombre: string;
  departamento: string;
  sede: string;
  numeroExtension: string;
}

export interface UpdateExtensionData extends CreateExtensionData {}
