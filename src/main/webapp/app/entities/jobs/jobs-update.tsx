import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IJobs } from 'app/shared/model/jobs.model';
import { JobStatus } from 'app/shared/model/enumerations/job-status.model';
import { getEntity, updateEntity, createEntity, reset } from './jobs.reducer';

export const JobsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const categories = useAppSelector(state => state.category.entities);
  const jobsEntity = useAppSelector(state => state.jobs.entity);
  const loading = useAppSelector(state => state.jobs.loading);
  const updating = useAppSelector(state => state.jobs.updating);
  const updateSuccess = useAppSelector(state => state.jobs.updateSuccess);
  const jobStatusValues = Object.keys(JobStatus);
  const handleClose = () => {
    props.history.push('/jobs' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.validFrom = convertDateTimeToServer(values.validFrom);
    values.validThrough = convertDateTimeToServer(values.validThrough);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    const entity = {
      ...jobsEntity,
      ...values,
      category: categories.find(it => it.id.toString() === values.category.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          validFrom: displayDefaultDateTime(),
          validThrough: displayDefaultDateTime(),
          createdDate: displayDefaultDateTime(),
          updatedDate: displayDefaultDateTime(),
        }
      : {
          status: 'DRAFT',
          ...jobsEntity,
          validFrom: convertDateTimeFromServer(jobsEntity.validFrom),
          validThrough: convertDateTimeFromServer(jobsEntity.validThrough),
          createdDate: convertDateTimeFromServer(jobsEntity.createdDate),
          updatedDate: convertDateTimeFromServer(jobsEntity.updatedDate),
          category: jobsEntity?.category?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="monoBeFeApp.jobs.home.createOrEditLabel" data-cy="JobsCreateUpdateHeading">
            Create or edit a Jobs
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="jobs-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="jobs-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Slug"
                id="jobs-slug"
                name="slug"
                data-cy="slug"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Feature Image" id="jobs-featureImage" name="featureImage" data-cy="featureImage" type="text" />
              <ValidatedField
                label="Valid From"
                id="jobs-validFrom"
                name="validFrom"
                data-cy="validFrom"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Valid Through"
                id="jobs-validThrough"
                name="validThrough"
                data-cy="validThrough"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Status" id="jobs-status" name="status" data-cy="status" type="select">
                {jobStatusValues.map(jobStatus => (
                  <option value={jobStatus} key={jobStatus}>
                    {jobStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Created By" id="jobs-createdBy" name="createdBy" data-cy="createdBy" type="text" />
              <ValidatedField
                label="Created Date"
                id="jobs-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Updated Date"
                id="jobs-updatedDate"
                name="updatedDate"
                data-cy="updatedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Updated By" id="jobs-updatedBy" name="updatedBy" data-cy="updatedBy" type="text" />
              <ValidatedField id="jobs-category" name="category" data-cy="category" label="Category" type="select">
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/jobs" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default JobsUpdate;
