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

import { ProductDto } from './product-dto';
import { SupplierDto } from './supplier-dto';
 /**
 * 
 *
 * @export
 * @interface SupplierProductDto
 */
export interface SupplierProductDto {

    /**
     * @type {string}
     * @memberof SupplierProductDto
     */
    id: string;

    /**
     * @type {Date}
     * @memberof SupplierProductDto
     */
    createdAt: Date;

    /**
     * @type {Date}
     * @memberof SupplierProductDto
     */
    updatedAt: Date;

    /**
     * @type {SupplierDto}
     * @memberof SupplierProductDto
     */
    supplier: SupplierDto;

    /**
     * @type {ProductDto}
     * @memberof SupplierProductDto
     */
    product: ProductDto;

    /**
     * @type {string}
     * @memberof SupplierProductDto
     */
    supplierId: string;

    /**
     * @type {string}
     * @memberof SupplierProductDto
     */
    productId: string;

    /**
     * @type {number}
     * @memberof SupplierProductDto
     */
    price: number;

    /**
     * @type {number}
     * @memberof SupplierProductDto
     */
    quantity: number;

    /**
     * @type {string}
     * @memberof SupplierProductDto
     */
    summery: string;

    /**
     * @type {number}
     * @memberof SupplierProductDto
     */
    weight: number;

    /**
     * @type {string}
     * @memberof SupplierProductDto
     */
    dimensions: string;

    /**
     * @type {Array<any>}
     * @memberof SupplierProductDto
     */
    features: Array<any>;

    /**
     * @type {string}
     * @memberof SupplierProductDto
     */
    color: string;

    /**
     * @type {Date}
     * @memberof SupplierProductDto
     */
    deletedAt?: Date;
}
