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

import { OrderDto } from './order-dto';
import { SupplierDto } from './supplier-dto';
 /**
 * 
 *
 * @export
 * @interface SupplierOrderDto
 */
export interface SupplierOrderDto {

    /**
     * @type {string}
     * @memberof SupplierOrderDto
     */
    id: string;

    /**
     * @type {Date}
     * @memberof SupplierOrderDto
     */
    createdAt: Date;

    /**
     * @type {Date}
     * @memberof SupplierOrderDto
     */
    updatedAt: Date;

    /**
     * @type {OrderDto}
     * @memberof SupplierOrderDto
     */
    order: OrderDto;

    /**
     * @type {SupplierDto}
     * @memberof SupplierOrderDto
     */
    supplier?: SupplierDto;

    /**
     * @type {string}
     * @memberof SupplierOrderDto
     */
    orderId: string;

    /**
     * @type {string}
     * @memberof SupplierOrderDto
     */
    supplierId?: string;

    /**
     * @type {Date}
     * @memberof SupplierOrderDto
     */
    deletedAt?: Date;
}
