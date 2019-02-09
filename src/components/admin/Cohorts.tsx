import * as React from 'react';
import { NewCohortInfo, Cohort } from '../../Types';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import AddCohortForm from './AddCohort_form';
import Add from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import ShowAllCohorts from './ShowAllCohorts';
import Typography from '@material-ui/core/Typography';
import { removeCohort } from '../../actions/admin_dashboard';

const styles = (theme: Theme) => createStyles({
  spaced: {
    margin: theme.spacing.unit,
  },
  add: {
    color: '#0cb10c',
  },
  hide: {
    color: theme.palette.secondary.dark
  }
});

export interface OwnProps {
  cohorts: Cohort[];
  errorMessage: string,
  showAddCohort: boolean,
  toggleAddCohort: () => void,
  addNewCohort: (input: NewCohortInfo) => void,
  removeCohort: (input: Cohort) => void
}

type Props = OwnProps & WithStyles<typeof styles>;

class Cohorts extends React.Component<Props, {}> {

  handleSubmit = (input: NewCohortInfo) => {
    this.props.addNewCohort(input);
  };

  render() {
    const cohorts = {
      cohorts: this.props.cohorts,
      removeCohort: this.props.removeCohort
    }

    const addCohortPanel = this.props.showAddCohort
      ?
        <div>
          <AddCohortForm
            onSubmit={this.handleSubmit}
            errorMessage={this.props.errorMessage}
          />
        </div>
      :
        <div></div>; 
    
    const toggleBtn = !this.props.showAddCohort ? <Add /> : <Remove />;

    return (
      <div>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Cohorts</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="Add Cohort" onClick={this.props.toggleAddCohort} className={this.props.showAddCohort ? this.props.classes.hide : this.props.classes.add} >
              {toggleBtn}
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        {addCohortPanel}
        <ShowAllCohorts {...cohorts} />
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
