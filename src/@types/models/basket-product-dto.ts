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

import { BasketDto } from './basket-dto';
import { VendorProductDto } from './vendor-product-dto';
 /**
 * 
 *
 * @export
 * @interface BasketProductDto
 */
export interface BasketProductDto {

    /**
     * @type {string}
     * @memberof BasketProductDto
     */
    id: string;

    /**
     * @type {Date}
     * @memberof BasketProductDto
     */
    createdAt: Date;

    /**
     * @type {Date}
     * @memberof BasketProductDto
     */
    updatedAt: Date;

    /**
     * @type {VendorProductDto}
     * @memberof BasketProductDto
     */
    vendorProduct: VendorProductDto;

    /**
     * @type {BasketDto}
     * @memberof BasketProductDto
     */
    basket: BasketDto;

    /**
     * @type {string}
     * @memberof BasketProductDto
     */
    vendorProductId: string;

    /**
     * @type {number}
     * @memberof BasketProductDto
     */
    quantity: number;
}
