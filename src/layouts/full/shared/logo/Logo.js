/* eslint-disable jsx-a11y/alt-text */

import { Link } from 'react-router-dom';
import image  from 'src/assets/images/logos/djerba.jpg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={image} width="180" height="70"/>
    </LinkStyled>
  )
};

export default Logo;
