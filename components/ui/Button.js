import styled from '@emotion/styled'

const Button = styled.a`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #D1D1D1;
  padding: .8rem 2rem;
  margin: 2rem auto;
  text-align: center;
  background-color: ${props => props.bgColor ? '#DA552F' : 'gray'};
  color: ${props => props.bgColor ? 'white' : '#000'};

  &:last-of-type {
    margin-right: 0; 
  }

  &:hover {
    cursor: pointer;
  }
`

export default Button
