import React from 'react'
import './Home.Management.css'

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

function HomeManagement() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          unsolved
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          solved
        </Grid>
        <Grid item sm={4}>
        <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          unsolved
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          solved
        </Grid>
        <Grid item sm={4}>
        <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          unsolved
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          solved
        </Grid>
      </Grid>
    </div>
  )
}

export default HomeManagement
