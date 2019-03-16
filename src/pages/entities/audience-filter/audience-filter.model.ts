import { BaseEntity } from './../../../models';

export class AudienceFilter implements BaseEntity {
    constructor(
        public id?: number,
        public filterAttribute?: string,
        public filterOperator?: string,
        public filterValue?: string,
        public audience?: BaseEntity,
    ) {
    }
}
