import { combineReducers } from 'redux';
import users from './users';
import auth from './auth';
import profiles from './profiles';
import languages from './languages';
import tags from './tags';
import pages from './pages';
import sections from './sections';

export default combineReducers({
    auth,
    users,
    profiles,
    languages,
    tags,
    pages,
    sections
})