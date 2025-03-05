import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const MessageBox = ({ children, variant = 'info' }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

MessageBox.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default MessageBox;
