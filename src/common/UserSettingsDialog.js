/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createRefetchContainer, graphql } from 'react-relay';

import UpdateUserMutation from '../mutations/UpdateUser';

const useStyles = makeStyles(theme => ({
  field: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

function UserSettingsDialog(props) {
  const { me, relay, ...other } = props;
  const [state, setState] = React.useState({ errors: {} });
  const s = useStyles();

  React.useEffect(() => {
    relay.refetch({ mounted: true });
  }, []);

  React.useEffect(() => {
    setState({ ...me, errors: {} });
  }, [JSON.stringify(me)]);

  function handleChange(event) {
    const { name, value } = event.target;
    setState(x => ({ ...x, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setState(x => (x.errors ? { ...x, errors: {} } : x));

    UpdateUserMutation.commit(
      relay.environment,
      {
        id: state.id,
        displayName: state.displayName,
        email: state.email,
      },
      errors => {
        if (errors) {
          setState(x => ({ ...x, errors }));
        } else {
          props.onClose();
        }
      },
    );
  }

  return (
    <Dialog maxWidth="xs" fullWidth {...other}>
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <form id="user-settings-form" onSubmit={handleSubmit}>
          <TextField
            className={s.field}
            name="displayName"
            label="Display Name"
            value={state.displayName}
            onChange={handleChange}
            error={Boolean(state.errors.displayName)}
            helperText={
              state.errors.displayName
                ? state.errors.displayName.join(' ')
                : ' '
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            className={s.field}
            name="email"
            type="email"
            label="Email"
            value={state.email}
            onChange={handleChange}
            error={Boolean(state.errors.email)}
            helperText={state.errors.email ? state.errors.email.join(' ') : ' '}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit" form="user-settings-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default createRefetchContainer(
  UserSettingsDialog,
  {
    me: graphql`
      fragment UserSettingsDialog_me on User
        @argumentDefinitions(
          mounted: { type: "Boolean", defaultValue: false }
        ) {
        id
        photoURL @include(if: $mounted)
        displayName @include(if: $mounted)
        email @include(if: $mounted)
      }
    `,
  },
  graphql`
    query UserSettingsDialogQuery($mounted: Boolean!) {
      me {
        ...UserSettingsDialog_me @arguments(mounted: $mounted)
      }
    }
  `,
);
