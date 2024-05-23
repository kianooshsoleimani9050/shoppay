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

import { BasketProductDto } from './basket-product-dto';
import { UserDto } from './user-dto';
 /**
 * 
 *
 * @export
 * @interface BasketDto
 */
export interface BasketDto {

    /**
     * @type {string}
     * @memberof BasketDto
     */
    id: string;

    /**
     * @type {Date}
     * @memberof BasketDto
     */
    createdAt: Date;

    /**
     * @type {Date}
     * @memberof BasketDto
     */
    updatedAt: Date;

    /**
     * @type {UserDto}
     * @memberof BasketDto
     */
    user: UserDto;

    /**
     * @type {Array<BasketProductDto>}
     * @memberof BasketDto
     */
    products: Array<BasketProductDto>;

    /**
     * @type {string}
     * @memberof BasketDto
     */
    userId: string;

    /**
     * @type {Date}
     * @memberof BasketDto
     */
    deletedAt?: Date;
}
