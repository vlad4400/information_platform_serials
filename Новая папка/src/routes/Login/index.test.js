import React from 'react'

import { render, fireEvent, act } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { Login, LoginFormTestIds } from "./index";


describe('Login', () => {

  it('ввод данных в поле Login', () => {
    const loginValue = 'auth';
    const setFieldValue = jest.fn();
    const component = render(<Login setFieldValue={setFieldValue} />)

    const loginField = component.queryByTestId(LoginFormTestIds.loginField);

    act(() => {
      fireEvent.change(loginField, {
        target: {
          value: loginValue,
        }
      })
    })

    expect(setFieldValue).toHaveBeenCalledWith('login', loginValue);
  })

  it('ввод данных в поле Password', () => {
    const passwordValue = 'auth';
    const setFieldValue = jest.fn();
    const component = render(<Login setFieldValue={setFieldValue} />)

    const loginField = component.queryByTestId(LoginFormTestIds.passwordField);

    act(() => {
      fireEvent.change(passwordField, {
        target: {
          value: passwordValue,
        }
      })
    })

    expect(setFieldValue).toHaveBeenCalledWith('password', passwordValue);
  })

})
