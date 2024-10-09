export interface IPatient {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  firstName_en?: string;
  lastName_en?: string;
  fatherName?: string;
  weight?: number;
  isMarried?: number;
  education?: number;
  job?: string;
  immediateFamily?: string;
  carerFname?: string;
  carerLname?: string;
  carerAge?: number;
  carerRel?: string;
  carerEducation?: number;
  carerGender?: number;
  gender?: number;
  idCode: string;
  isSmoker?: boolean;
  isAlcoholic?: boolean;
  allergy?: string;
  hasDiabetes?: boolean;
  hasHTN?: boolean;
  hasEyeKer?: boolean;
  eyemh?: string;
  drugHistory?: string[] | string;
  tel?: string;
  birth?: Date | string;
  address?: string;
  // age?: number;
  meds?: IMedicine[];
  nobat?: Record<string, unknown>
}

export interface IDoctor {
  firstName: string;
  lastName: string;
  gender: boolean;
  idCode: string;
  nezam: string;
  major: string;
  field: string;
  patients: string[];
  workDays: number[];
  maxPatients: number
}

export interface IPreMed {
  name: string;
  startFrom: string;
  interval: number;
  intervalType: 'm' | 'h';
  isActive: boolean;
  desc?: string;
  dosage?: string;
  type: 'قرص' | 'قطره' | 'پماد' | 'کپسول' | 'شربت' | 'تزریق' | 'سایر';
}
export interface IMedicine extends IPreMed {
  _id?: string;
  usageHistory?: { date: string }[];
  id: string;
  notificationId: string[];
  reminders: string[];
}
