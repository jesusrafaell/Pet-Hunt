import styled from '@emotion/styled'

export const FormAp = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;

  fieldset{
    margin: 2rem 0;
    border: 2px solid #e1e1e1;
    font-size: 1.5rem;
    padding: 1rem;
  }

`
export const Camp = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label{
    flex: 0 0 150px;
    font-size: 1,8rem;
  }

  input, textarea {
    flex: 1;
    padding: 1rem;
  }
  textarea{
    height: 200px;
  }
`
export const InputSubmit = styled.input`
  background-color: #F92772;
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #000;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: 1px solid #000;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;

  &:hover{
    cursor: pointer;
  }
`

export const Error = styled.p`
  background-color: red; 
  padding: 1rem;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #FFF;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`