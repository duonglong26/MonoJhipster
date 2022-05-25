import dayjs from 'dayjs';
import { ICategory } from 'app/shared/model/category.model';
import { JobStatus } from 'app/shared/model/enumerations/job-status.model';

export interface IJobs {
  id?: number;
  title?: string;
  slug?: string;
  featureImage?: string | null;
  validFrom?: string | null;
  validThrough?: string | null;
  status?: JobStatus | null;
  createdBy?: number | null;
  createdDate?: string | null;
  updatedDate?: string | null;
  updatedBy?: number | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<IJobs> = {};
