/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import idx from 'idx';
import React from 'react';
import PropTypes from 'prop-types';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';
import { compose } from 'recompose';

import withAuth from '../common/withAuth';
import CreateStoryMutation from './mutations/CreateStory';

const styles = {
  control: {
    marginTop: '1em',
  },
};

class Submit extends React.Component<{}> {
  static contextTypes = {
    history: PropTypes.object.isRequired,
    relay: RelayPropTypes.Relay,
  };

  state = {
    title: '',
    text: '',
    error: null,
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const {
      history,
      relay: { environment },
    } = this.context;
    event.preventDefault();

    if (this.state.error) {
      this.setState({ error: null });
    }

    CreateStoryMutation.commit(environment, {
      title: this.state.title,
      text: this.state.text,
    })
      .then(() => {
        history.push('/news');
      })
      .catch(error => this.setState({ error }));
  };

  errorMessage = key => {
    const message = idx(this.state.error, x => x.state[key][0]);
    return message ? (
      <FormHelperText id={`${key}-text`}>{message}</FormHelperText>
    ) : null;
  };

  logIn = event => {
    event.preventDefault();
    this.props.logIn();
  };

  render() {
    const {
      history: { location },
    } = this.context;

    const {
      classes: s,
      data: { me },
    } = this.props;

    return (
      <>
        <Typography variant="body1">
          Do you have something cool to share?
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            className={s.control}
            fullWidth
            error={idx(this.state, x => x.error.state['title'])}
            aria-describedby="title-text"
          >
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              margin="dense"
              required
            />
            {this.errorMessage('title')}
          </FormControl>
          <FormControl
            className={s.control}
            fullWidth
            error={idx(this.state, x => x.error.state['text'])}
            aria-describedby="text-text"
          >
            <InputLabel htmlFor="text">Text or URL</InputLabel>
            <Input
              id="text"
              label="Text or URL"
              value={this.state.text}
              onChange={this.handleChange}
              margin="dense"
              multiline
              required
            />
            {this.errorMessage('text')}
          </FormControl>
          <FormControl className={s.control}>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              disabled={!me}
            >
              Publish
            </Button>
            {!me && (
              <FormHelperText>
                Before posting a story you need to{' '}
                <a href={location.pathname} onClick={this.logIn}>
                  sign in
                </a>
                .
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <br />
        </form>
      </>
    );
  }
}

export default compose(
  withStyles(styles),
  withAuth(),
)(
  createFragmentContainer(
    Submit,
    graphql`
      fragment Submit on Query {
        me {
          id
        }
      }
    `,
  ),
);
