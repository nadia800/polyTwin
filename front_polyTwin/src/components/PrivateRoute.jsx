import { Route, Navigate } from 'react-router-dom';
//import { useRecoilValue } from 'recoil';

//import { authAtom } from '_state';
import { useDispatch, useSelector } from "react-redux";

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    //const auth = useRecoilValue(authAtom);
    const { isLoggedIn } = useSelector(state => state.auth);
    return (
        <Route {...rest} render={props => {
            if (!isLoggedIn) {
                // not logged in so redirect to login page with the return url
                return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}