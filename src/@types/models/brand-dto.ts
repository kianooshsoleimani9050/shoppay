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
 * @interface BrandDto
 */
export interface BrandDto {
  /**
   * @type {string}
   * @memberof BrandDto
   */
  id: string;

  /**
   * @type {Date}
   * @memberof BrandDto
   */
  createdAt: Date;

  /**
   * @type {Date}
   * @memberof BrandDto
   */
  updatedAt: Date;

  /**
   * @type {string}
   * @memberof BrandDto
   */
  icon: string;

  /**
   * @type {number}
   * @memberof BrandDto
   */
  order: number;

  /**
   * @type {boolean}
   * @memberof BrandDto
   */
  status: boolean;

  /**
   * @type {string}
   * @memberof BrandDto
   */
  title: string;

  /**
   * @type {string}
   * @memberof BrandDto
   */
  enTitle: string;

  /**
   * @type {Date}
   * @memberof BrandDto
   */
  deletedAt?: Date;
}
