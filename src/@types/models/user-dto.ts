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

import { AddressDto } from './address-dto';
import { BasketDto } from './basket-dto';
import { LogDto } from './log-dto';
import { OrderDto } from './order-dto';
import { ProductRequestDto } from './product-request-dto';
import { RatingDto } from './rating-dto';
import { RoleType } from './role-type';
import { SupplierDto } from './supplier-dto';
import { VendorDto } from './vendor-dto';
/**
 *
 *
 * @export
 * @interface UserDto
 */
export interface UserDto {
  /**
   * @type {string}
   * @memberof UserDto
   */
  id: string;

  /**
   * @type {Date}
   * @memberof UserDto
   */
  createdAt: Date;

  /**
   * @type {Date}
   * @memberof UserDto
   */
  deletedAt: Date;

  /**
   * @type {Date}
   * @memberof UserDto
   */
  updatedAt: Date;

  /**
   * @type {string}
   * @memberof UserDto
   */
  fullName?: string | null;

  /**
   * @type {RoleType}
   * @memberof UserDto
   */
  role?: RoleType;

  /**
   * @type {string}
   * @memberof UserDto
   */
  email?: string | null;

  /**
   * @type {string}
   * @memberof UserDto
   */
  avatar?: string | null;

  /**
   * @type {string}
   * @memberof UserDto
   */
  mobile?: string | null;

  /**
   * @type {boolean}
   * @memberof UserDto
   */
  isActive?: boolean;

  /**
   * @type {string}
   * @memberof UserDto
   */
  supplierId?: string | null;

  /**
   * @type {string}
   * @memberof UserDto
   */
  vendorId?: string | null;

  /**
   * @type {VendorDto}
   * @memberof UserDto
   */
  vendor?: VendorDto;

  /**
   * @type {SupplierDto}
   * @memberof UserDto
   */
  supplier?: SupplierDto;

  /**
   * @type {Array<LogDto>}
   * @memberof UserDto
   */
  logs: Array<LogDto>;

  /**
   * @type {Array<RatingDto>}
   * @memberof UserDto
   */
  ratings: Array<RatingDto>;

  /**
   * @type {Array<AddressDto>}
   * @memberof UserDto
   */
  addresses: Array<AddressDto>;

  /**
   * @type {Array<OrderDto>}
   * @memberof UserDto
   */
  orders: Array<OrderDto>;

  /**
   * @type {Array<ProductRequestDto>}
   * @memberof UserDto
   */
  requests: Array<ProductRequestDto>;

  /**
   * @type {BasketDto}
   * @memberof UserDto
   */
  basket: BasketDto;
}
