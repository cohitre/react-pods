import { connect } from 'react-redux';
import { createContact } from '../../../actions';

export function mapDispatchToProps(dispatch) {
  return {
    createContact(name, phone) {
      dispatch(createContact(name, phone));
    }
  }
}

export default connect(undefined, mapDispatchToProps);
