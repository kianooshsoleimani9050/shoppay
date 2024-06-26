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

import { ShipmentInfoDto } from './shipment-info-dto';
 /**
 * 
 *
 * @export
 * @interface CreateProductAttributeDto
 */
export interface CreateProductAttributeDto {

    /**
     * @type {string}
     * @memberof CreateProductAttributeDto
     */
    summery?: string;

    /**
     * @type {number}
     * @memberof CreateProductAttributeDto
     */
    weight?: number;

    /**
     * @type {string}
     * @memberof CreateProductAttributeDto
     */
    dimensions?: string;

    /**
     * @type {ShipmentInfoDto}
     * @memberof CreateProductAttributeDto
     */
    shipmentInfo: ShipmentInfoDto;

    /**
     * @type {Array<any>}
     * @memberof CreateProductAttributeDto
     */
    features: Array<any>;

    /**
     * @type {Array<string>}
     * @memberof CreateProductAttributeDto
     */
    colors: Array<string>;
}
