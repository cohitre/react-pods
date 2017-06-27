import { connect } from 'react-redux';

export function mapStateToProps(state, ownProps) {
  const contacts = Object.keys(state.contact).map((id) => {
    return {
      id,
      type: 'contact',
      attributes: state.contact[id],
    };
  });
  return { contacts };
}

export default connect(mapStateToProps);
