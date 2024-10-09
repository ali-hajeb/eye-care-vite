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

type INobat = { date: string };

export const transformValue = (
  field: PatientInfoFields,
  data: string | number | boolean | string[] | Date | IMedicine[] | INobat[] | undefined,
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
  else if (field === 'nobat') {
    const dates = (data as INobat[])?.map(d => moment(d.date).locale('fa').format('YYYY/MM/DD'));
    return dates.join('، ')
  }
  else return (data as string);
};

export const transformValueToString = (
  field: PatientInfoFields,
  data: string | number | boolean | string[] | Date | IMedicine[] | INobat[] | undefined,
) => {
  if (patientBooleanFields.includes(field))
    return data ? (
      'بله'
    ) : (
      'خیر'
    );
  else if (patientGenderFields.includes(field)) return data ? 'زن' : 'مرد';
  else if (patientEducationFields.includes(field)) return EDUCATION[data as number];
  else if (field === 'birth' && data)
    return moment(data as string)
      .locale('fa')
      .format('YYYY/MM/DD');
  else if (field === 'isMarried') return data ? 'متأهل' : 'مجرد';
  else if (field === 'meds') {
    const meds = (data as IMedicine[]).map(m => m.name);
    return meds.join('، ');
  }
  else if (field === 'nobat') {
    const dates = (data as INobat[])?.map(d => moment(d.date).locale('fa').format('YYYY/MM/DD'));
    return dates.join('، ')
  }
  else return (data as string);
};
