export type ModuleId = 'assessment' | 'record' | 'plan' | 'empathy' | 'ethics' | 'policy';

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  placeholder: string;
  promptLabel: string;
}

export interface AIResponse {
  text: string;
  error?: string;
}
