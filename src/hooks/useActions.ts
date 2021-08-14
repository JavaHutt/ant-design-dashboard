import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store/actions';

const useActions = () => bindActionCreators(ActionCreators, useDispatch());

export default useActions;
