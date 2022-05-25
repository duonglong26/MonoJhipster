package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "create_by")
    private Long createBy;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @Column(name = "updated_date")
    private ZonedDateTime updatedDate;

    @Column(name = "updated_by")
    private Long updatedBy;

    @OneToMany(mappedBy = "category")
    @JsonIgnoreProperties(value = { "category" }, allowSetters = true)
    private Set<Jobs> jobs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Category id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Category name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCreateBy() {
        return this.createBy;
    }

    public Category createBy(Long createBy) {
        this.setCreateBy(createBy);
        return this;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public ZonedDateTime getCreatedDate() {
        return this.createdDate;
    }

    public Category createdDate(ZonedDateTime createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getUpdatedDate() {
        return this.updatedDate;
    }

    public Category updatedDate(ZonedDateTime updatedDate) {
        this.setUpdatedDate(updatedDate);
        return this;
    }

    public void setUpdatedDate(ZonedDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public Category updatedBy(Long updatedBy) {
        this.setUpdatedBy(updatedBy);
        return this;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Set<Jobs> getJobs() {
        return this.jobs;
    }

    public void setJobs(Set<Jobs> jobs) {
        if (this.jobs != null) {
            this.jobs.forEach(i -> i.setCategory(null));
        }
        if (jobs != null) {
            jobs.forEach(i -> i.setCategory(this));
        }
        this.jobs = jobs;
    }

    public Category jobs(Set<Jobs> jobs) {
        this.setJobs(jobs);
        return this;
    }

    public Category addJob(Jobs jobs) {
        this.jobs.add(jobs);
        jobs.setCategory(this);
        return this;
    }

    public Category removeJob(Jobs jobs) {
        this.jobs.remove(jobs);
        jobs.setCategory(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", createBy=" + getCreateBy() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            ", updatedBy=" + getUpdatedBy() +
            "}";
    }
}
