/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import clsx from 'clsx';
import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  maxLength: {
    float: 'right',
  },
}));

function TextField(props) {
  const {
    className,
    name,
    state: [state, setState],
    maxLength,
    required,
    ...other
  } = props;

  const s = useStyles();
  const errors = (state.errors || {})[name] || [];
  const error = errors.length ? errors.join(' \n') : null;
  const hasError =
    Boolean(error) || (maxLength && (state[name] || '').length > maxLength);

  let helperText = error || (required ? '* Required' : ' ');

  if (maxLength) {
    helperText = (
      <React.Fragment>
        {helperText}
        <span className={s.maxLength}>
          {(state[name] || '').length}/{maxLength}
        </span>
      </React.Fragment>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setState(x => ({ ...x, [name]: value }));
  }

  return (
    <MuiTextField
      className={clsx(s.root, className)}
      name={name}
      error={hasError}
      value={state[name]}
      onChange={handleChange}
      helperText={helperText}
      {...other}
    />
  );
}

export default TextField;
