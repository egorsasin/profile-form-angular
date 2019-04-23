import { Action } from '@ngrx/store';

export const GET_PROFILE = "[Profile] Get";

export class GetProfile implements Action {
  type = GET_PROFILE;
}