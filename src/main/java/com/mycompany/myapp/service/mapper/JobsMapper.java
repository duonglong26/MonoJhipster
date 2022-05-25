package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Category;
import com.mycompany.myapp.domain.Jobs;
import com.mycompany.myapp.service.dto.CategoryDTO;
import com.mycompany.myapp.service.dto.JobsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Jobs} and its DTO {@link JobsDTO}.
 */
@Mapper(componentModel = "spring")
public interface JobsMapper extends EntityMapper<JobsDTO, Jobs> {
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryId")
    JobsDTO toDto(Jobs s);

    @Named("categoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CategoryDTO toDtoCategoryId(Category category);
}
