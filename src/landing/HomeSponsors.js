import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const sponsors = [
  {
    name: 'Rollbar',
    link:
      'https://rollbar.com/?utm_source=reactstartkit(github)&utm_medium=link&utm_campaign=reactstartkit(github)',
    image: {
      src: 'https://files.tarkus.me/rollbar-384x64.png',
      width: 192,
      height: 32,
    },
  },
  {
    name: 'DigitalOcean',
    link:
      'https://www.digitalocean.com/?refcode=eef302dbae9f&utm_source=github&utm_medium=oss_sponsorships&utm_campaign=opencollective',
    image: {
      src: 'https://files.tarkus.me/digital-ocean-393x64.png',
      width: 196.5,
      height: 32,
    },
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
  },
  link: {
    margin: theme.spacing.unit,
  },
});

function HomeSponsors({ classes: s }) {
  return (
    <div className={s.root}>
      {sponsors.map(x => (
        <a
          key={x.name}
          className={s.link}
          href={x.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img {...x.image} alt={x.name} />
        </a>
      ))}
    </div>
  );
}

export default withStyles(styles)(HomeSponsors);
