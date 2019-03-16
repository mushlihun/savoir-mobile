import { BaseEntity } from './../../../models';

export class Company implements BaseEntity {
    constructor(
        public id?: number,
        public companyName?: string,
        public companyPhone?: string,
        public companyEmail?: string,
        public brandingDefaultLanguage?: string,
        public brandingLogo?: string,
        public brandingHeaderBackgroundColor?: string,
        public brandingHeaderTextColor?: string,
        public brandingHeaderHoverColor?: string,
        public brandingSearchBackgroundImg?: string,
        public brandingSearchTextColor?: string,
        public brandingDefaultButtonColor?: string,
        public brandingLoginBackgroundImg?: string,
        public customAttributes?: BaseEntity[],
        public audiences?: BaseEntity[],
        public channels?: BaseEntity[],
        public companyEmployees?: BaseEntity[],
    ) {
    }
}
