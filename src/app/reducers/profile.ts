import { Profile } from "src/app/models/profile";
import { Action } from '@ngrx/store';

const initialState: Profile = {
  name: "Alexander Ivanov",
  email: "ivanov@cloud.com",
  notify: false
}

export function profileReducer(
  state = initialState,
  action: Action 
) {
  return state;  
}