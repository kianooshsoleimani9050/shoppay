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
 * @interface CommissionDto
 */
export interface CommissionDto {

    /**
     * @type {string}
     * @memberof CommissionDto
     */
    id: string;

    /**
     * @type {Date}
     * @memberof CommissionDto
     */
    createdAt: Date;

    /**
     * @type {Date}
     * @memberof CommissionDto
     */
    updatedAt: Date;

    /**
     * @type {number}
     * @memberof CommissionDto
     */
    percentage: number;

    /**
     * @type {number}
     * @memberof CommissionDto
     */
    lessThan: number;

    /**
     * @type {number}
     * @memberof CommissionDto
     */
    moreThan: number;

    /**
     * @type {Date}
     * @memberof CommissionDto
     */
    deletedAt?: Date;
}
