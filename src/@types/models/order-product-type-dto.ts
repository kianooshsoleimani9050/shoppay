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
 /**
 * 
 *
 * @export
 * @interface OrderProductTypeDto
 */
export interface OrderProductTypeDto {

    /**
     * @type {ProductDto}
     * @memberof OrderProductTypeDto
     */
    product: ProductDto;

    /**
     * @type {number}
     * @memberof OrderProductTypeDto
     */
    quantity: number;

    /**
     * @type {string}
     * @memberof OrderProductTypeDto
     */
    vendorId: string;

    /**
     * @type {string}
     * @memberof OrderProductTypeDto
     */
    supplierId: string;

    /**
     * @type {number}
     * @memberof OrderProductTypeDto
     */
    price: number;

    /**
     * @type {number}
     * @memberof OrderProductTypeDto
     */
    salePrice?: number;
}
