export interface CompiledData {
  details: {
    partner: string;
    project: string;
    description?: string;
    dueDate?: string;
    notes?: string;
    extras: {
      haveDrawings: boolean;
      haveBOM: boolean;
      existingSite: boolean;
      corporateAccount: boolean;
    };
  };
  tasks: {
    engineering: boolean;
    programming: boolean;
    commissioning: boolean;
    training: boolean;
  };
  systems: Array<{
    name: string;
    inputs: number;
    outputs: number;
    netVars: number;
    typicals: number;
    complexity: number;
  }>;
}