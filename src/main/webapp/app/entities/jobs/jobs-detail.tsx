import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './jobs.reducer';

export const JobsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const jobsEntity = useAppSelector(state => state.jobs.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="jobsDetailsHeading">Jobs</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{jobsEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{jobsEntity.title}</dd>
          <dt>
            <span id="slug">Slug</span>
          </dt>
          <dd>{jobsEntity.slug}</dd>
          <dt>
            <span id="featureImage">Feature Image</span>
          </dt>
          <dd>{jobsEntity.featureImage}</dd>
          <dt>
            <span id="validFrom">Valid From</span>
          </dt>
          <dd>{jobsEntity.validFrom ? <TextFormat value={jobsEntity.validFrom} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="validThrough">Valid Through</span>
          </dt>
          <dd>{jobsEntity.validThrough ? <TextFormat value={jobsEntity.validThrough} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{jobsEntity.status}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{jobsEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>{jobsEntity.createdDate ? <TextFormat value={jobsEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedDate">Updated Date</span>
          </dt>
          <dd>{jobsEntity.updatedDate ? <TextFormat value={jobsEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedBy">Updated By</span>
          </dt>
          <dd>{jobsEntity.updatedBy}</dd>
          <dt>Category</dt>
          <dd>{jobsEntity.category ? jobsEntity.category.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/jobs" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/jobs/${jobsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default JobsDetail;
