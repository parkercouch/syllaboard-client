// Material UI components
import {
  createStyles,
  Modal,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/AddCircleOutline';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import * as React from 'react';
import { inlineForm } from '../../../style/generalStyles';

// Types
import { Cohort, NewCohortInfo, User } from '../../../Types';

// Forms
import AddCohortForm from './AddCohort_form';
import EditCohortForm from './EditCohort_form';

import ShowAllCohorts from './ShowAllCohorts';

const styles = (theme: Theme) =>
  createStyles({
    divider: {
      marginBottom: '1.25em',
    },
    add: {
      color: '#0cb10c',
    },
    hide: {
      color: theme.palette.secondary.dark,
    },
    paper: {
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: '25%',
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '25%',
        left: '35vw',
        borderRadius: '1em',
        width: theme.spacing.unit * 30,
      },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[10],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    inlineForm: inlineForm(theme),
  });

export interface OwnProps {
  cohorts: Cohort[];
  errorMessage: string;
  showAddCohort: boolean;
  showEditCohort: boolean;
  showAllCohorts: boolean;
  selectedCohort: Cohort | null;
  selectCohort: (cohort: Cohort | null) => void;
  toggleAddCohort: () => void;
  toggleEditCohort: () => void;
  toggleShowCohorts: () => void;
  addNewCohort: (input: NewCohortInfo) => void;
  removeCohort: (input: Cohort) => void;
  updateCohort: (input: Cohort) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Cohorts extends React.Component<Props, {}> {
  handleSubmit = (input: NewCohortInfo) => {
    this.props.toggleAddCohort();
    this.props.addNewCohort(input);
  };

  handleEditSubmit = (input: Cohort) => {
    this.props.selectCohort(null);
    this.props.updateCohort(input);
  };

  render() {
    const cohorts = {
      cohorts: this.props.cohorts,
      removeCohort: this.props.removeCohort,
      updateCohort: this.props.updateCohort,
      selectCohort: this.props.selectCohort,
    };
    const editCohortPanel = (
      <Modal
        open={this.props.showEditCohort}
        onClose={
          this.props.showEditCohort
            ? this.props.toggleEditCohort
            : () => {
                return;
              }
        }
      >
        <div className={this.props.classes.paper}>
          <EditCohortForm
            onSubmit={this.handleEditSubmit}
            errorMessage={this.props.errorMessage}
            cohort={this.props.selectedCohort as Cohort}
          />
        </div>
      </Modal>
    );

    const addCohortPanel = this.props.showAddCohort ? (
      <div className={this.props.classes.inlineForm}>
        <AddCohortForm
          onSubmit={this.handleSubmit}
          errorMessage={this.props.errorMessage}
        />
      </div>
    ) : (
      <div />
    );

    const toggleBtn = !this.props.showAddCohort ? <Add /> : <Remove />;

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" onClick={this.props.toggleShowCohorts}>
              Cohorts
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Add Cohort"
              onClick={this.props.toggleAddCohort}
              className={
                this.props.showAddCohort
                  ? this.props.classes.hide
                  : this.props.classes.add
              }
            >
              {toggleBtn}
            </IconButton>
          </Grid>
        </Grid>
        <Divider
          className={
            this.props.showAllCohorts ? '' : this.props.classes.divider
          }
        />
        {addCohortPanel}
        {editCohortPanel}
        <Collapse in={this.props.showAllCohorts} timeout="auto" unmountOnExit>
          <ShowAllCohorts {...cohorts} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
