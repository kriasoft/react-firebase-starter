import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {},
  item: {
    textAlign: 'center',
  },
  title: {},
  desc: {
    textAlign: 'left',
  },
});

const links = new Map([
  ['Knex.js', 'https://knexjs.org/'],
  ['GraphQL.js', 'https://github.com/graphql/graphql-js'],
  ['React.js', 'https://reactjs.org/'],
  ['Relay', 'https://facebook.github.io/relay'],
  ['Material UI', 'https://material-ui.com/'],
]);

function ExtLink(props) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      href={links.get(props.children)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function HomeStack({ classes: s, ...props }) {
  return (
    <Grid className={s.root} container spacing={16}>
      <Grid className={s.item} item xs>
        <Typography className={s.title} variant="h5" gutterBottom>
          GraphQL API
        </Typography>
        <Typography className={s.desc}>
          Everything that you need for building an API with{' '}
          <ExtLink>Knex.js</ExtLink> and <ExtLink>GraphQL.js</ExtLink>. Check
          out <a href="/graphql">GraphiQL IDE</a> and{' '}
          <a href="/graphql/model">data model</a>.
        </Typography>
      </Grid>
      <Grid className={s.item} item xs>
        <Typography className={s.title} variant="h5" gutterBottom>
          React.js and Relay
        </Typography>
        <Typography className={s.desc}>
          No frameworks! Just vanilla JavaScript, <ExtLink>React.js</ExtLink>{' '}
          and <ExtLink>Relay</ExtLink> libraries that are proven to work great
          for building modern scalable web apps.
        </Typography>
      </Grid>
      <Grid className={s.item} item xs>
        <Typography className={s.title} variant="h5" gutterBottom>
          Material UI
        </Typography>
        <Typography className={s.desc}>
          <ExtLink>Material UI</ExtLink> is by far the most popular UI library
          on <ExtLink>React.js</ExtLink> stack that follows Google&#39;s
          Material Design guidelines.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(HomeStack);
