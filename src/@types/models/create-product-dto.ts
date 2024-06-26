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

import { CreateProductAttributeDto } from './create-product-attribute-dto';
 /**
 * 
 *
 * @export
 * @interface CreateProductDto
 */
export interface CreateProductDto {

    /**
     * @type {string}
     * @memberof CreateProductDto
     */
    title: string;

    /**
     * @type {string}
     * @memberof CreateProductDto
     */
    summery: string;

    /**
     * @type {Array<Blob>}
     * @memberof CreateProductDto
     */
    files: Array<Blob>;

    /**
     * @type {string}
     * @memberof CreateProductDto
     */
    description: string;

    /**
     * @type {string}
     * @memberof CreateProductDto
     */
    categoryId: string;

    /**
     * @type {string}
     * @memberof CreateProductDto
     */
    brandId: string;

    /**
     * @type {CreateProductAttributeDto}
     * @memberof CreateProductDto
     */
    attributes: CreateProductAttributeDto;
}
