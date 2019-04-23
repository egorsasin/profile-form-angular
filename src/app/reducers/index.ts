import {
  ActionReducerMap,
  MetaReducer,
  createSelector
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { profileReducer } from "./profile"
import { Profile } from '../models/profile';

export interface AppState {
  profile: Profile
}

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
export const selectProfile = (state: AppState) => state.profile;

export const currentProfile = createSelector(selectProfile, (profile: Profile) => profile);