import dayjs from 'dayjs';
import { IJobs } from 'app/shared/model/jobs.model';

export interface ICategory {
  id?: number;
  name?: string;
  createBy?: number | null;
  createdDate?: string | null;
  updatedDate?: string | null;
  updatedBy?: number | null;
  jobs?: IJobs[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
