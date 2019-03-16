import { BaseEntity } from './../../../models';

export class Audience implements BaseEntity {
    constructor(
        public id?: number,
        public audienceName?: string,
        public audienceFilters?: BaseEntity[],
        public company?: BaseEntity,
    ) {
    }
}
