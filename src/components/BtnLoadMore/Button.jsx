import PropTypes from 'prop-types';
import { BtnLoadMore } from './Button.styled';

export const Button = ({ onLoadMore }) => (
  <BtnLoadMore
    type="Button"
    onClick={() => onLoadMore(prevstate => prevstate + 1)}
  >
    Load More
  </BtnLoadMore>
);
Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
