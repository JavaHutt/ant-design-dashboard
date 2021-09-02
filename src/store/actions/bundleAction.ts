import { Dispatch } from 'redux';
import { BundleAction, BundleActionTypes } from '../types/bundle';
// import store from '../index';
import Bundle from '../../models/bundle';
import api from '../../api';

// api.interceptors.request.use(req => {
//     req.headers = {
//         Authorization: `Bearer eyJraWQiOiI4KzhySjFKK01GRkp6Y2N1VGFkNWJ2Y2ErSWlGUVBYSXdEWTJLelAwRHNrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmZWRlN2JiNS0xZTkyLTQwMzUtYjdmZi1iNTA5MjNjYTRiNjUiLCJjb2duaXRvOmdyb3VwcyI6WyJ0ZXN0X2dyb3VwIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV8xdFVFOXZiVlciLCJjb2duaXRvOnVzZXJuYW1lIjoiZmVkZTdiYjUtMWU5Mi00MDM1LWI3ZmYtYjUwOTIzY2E0YjY1Iiwib3JpZ2luX2p0aSI6ImIyZTM1NjMzLTA3NDktNDMzMi05NGQxLWNmMzM0ZTc3ZGFhOCIsImF1ZCI6IjVmdnExdDFwZnF2NWd0OTRnY2k2djVycnZxIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MzA1OTY4NTcsImV4cCI6MTYzMDY4MzI1NywiaWF0IjoxNjMwNTk2ODU3LCJqdGkiOiIyMDM0OWU5Zi1iMmM5LTQzOTktYjMyNS1iZjJjMjNhYTQ1MDgiLCJlbWFpbCI6ImFsZXhhbmRlci5rYXJsZUBmYXN0ZGV2LnNlIn0.e3uYiOoYJe6OMghzmdMQC7Bu_Jwms9KgxDvbogcaxWiydn6pVfbtZKzSmvY4Bo7noFFrjbOMR5dLQcgYvMvg-FwLfWIQxiBVOecNas8qRzT6UrUFc_y9gld3u22f9njGbNEmjwOGQuKZJSUkx1Qh8dfeRnfsdCqxXrzx3Su5rB9Ql4lgmqgDjrhIASNvCD8g5M1jLyZYc71i8OvAjsNlV0OZMhdpPMnME0b9P9g-B9VvFQfvU_V-r9fDYw8vLQ8zeB_YOEHoj-SB15cCSTNosU3h66U2z8C_2KcTD3VbbV6A6vqs2CmEOBdlmiJ4R9qm2BbWPIydJZo8WTLE2fIunw`,
//     };
//     console.log(req);
//     return req;
// });

export const fetchBundles = () => (
    async (dispatch: Dispatch<BundleAction>) => {
        try {
            const res = await api.get<Bundle[]>('third-party-apps/urls');
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES, payload: res.data });
        } catch (e) {
            dispatch({ type: BundleActionTypes.FETCH_BUNDLES_ERROR, payload: e.message });
        }
    }
);

export const addBundle = (bundle: Bundle) => ({ type: BundleActionTypes.ADD_BUNDLE, payload: bundle });

export const deleteBundle = (key: string) => ({ type: BundleActionTypes.DELETE_BUNDLE, payload: key });
