import { IconCheck, IconX } from '@tabler/icons-react';
import {
  EDUCATION,
  patientBooleanFields,
  patientEducationFields,
  patientGenderFields,
  PatientInfoFields,
} from '../features/UserAuthentication/constants/patientInfo';
import moment from 'jalali-moment';
import { IMedicine } from '../common/types';

export const transformValue = (
  field: PatientInfoFields,
  data: string | number | boolean | string[] | Date | IMedicine[] | undefined,
) => {
  if (patientBooleanFields.includes(field))
    return data ? (
      <IconCheck size={16} color="green" />
    ) : (
      <IconX size={16} color="red" />
    );
  else if (patientGenderFields.includes(field)) return data ? 'زن' : 'مرد';
  else if (patientEducationFields.includes(field)) return EDUCATION[data as number];
  else if (field === 'birth')
    return moment(data as string)
      .locale('fa')
      .format('YYYY/MM/DD');
  else if (field === 'isMarried') return data ? 'متأهل' : 'مجرد';
  else if (field === 'meds') {
    const meds = (data as IMedicine[]).map(m => m.name);
    return meds.join('، ');
  }
  else return (data as string);
};