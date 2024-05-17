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

import { ProvinceDto } from './province-dto';
 /**
 * 
 *
 * @export
 * @interface CityDto
 */
export interface CityDto {

    /**
     * @type {string}
     * @memberof CityDto
     */
    id: string;

    /**
     * @type {Date}
     * @memberof CityDto
     */
    createdAt: Date;

    /**
     * @type {Date}
     * @memberof CityDto
     */
    updatedAt: Date;

    /**
     * @type {string}
     * @memberof CityDto
     */
    title: string;

    /**
     * @type {string}
     * @memberof CityDto
     */
    latitude: string;

    /**
     * @type {string}
     * @memberof CityDto
     */
    longitude: string;

    /**
     * @type {string}
     * @memberof CityDto
     */
    provinceId: string;

    /**
     * @type {ProvinceDto}
     * @memberof CityDto
     */
    province: ProvinceDto;
}
