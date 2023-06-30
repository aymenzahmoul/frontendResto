import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import Middleware from 'redux-thunk';
import reducers from './reducers';

const initialState = {}
const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(Middleware))
)

export default store;