/* tslint:disable */
/* eslint-disable */
/**
 * API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 
 *
 * @export
 * @interface ManageVendorRequestDto
 */
export interface ManageVendorRequestDto {

    /**
     * @type {string}
     * @memberof ManageVendorRequestDto
     */
    status: ManageVendorRequestDtoStatusEnum;

    /**
     * @type {string}
     * @memberof ManageVendorRequestDto
     */
    requestId: string;
}

/**
 * @export
 * @enum {string}
 */
export enum ManageVendorRequestDtoStatusEnum {
    Accepted = 'accepted',
    Rejected = 'rejected'
}

