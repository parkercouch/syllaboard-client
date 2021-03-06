import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as adminActions from '../../actions/admin_dashboard';
import { State } from '../../reducers';
import { Cohort, NewCohortInfo, User } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Cohorts from './CohortPanel/Cohorts';
import Users from './UserPanel/Users';

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.adminDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  cohort: {
    toggleAddCohort: () => dispatch(adminActions.toggleAddCohort()),
    toggleEditCohort: () => dispatch(adminActions.toggleEditCohort()),
    toggleShowCohorts: () => dispatch(adminActions.toggleShowCohorts()),
    addNewCohort: (cohortInfo: NewCohortInfo) =>
      adminActions.addNewCohort(cohortInfo)(dispatch),
    getAllCohorts: () => adminActions.getAllCohorts()(dispatch),
    removeCohort: (cohort: Cohort) =>
      adminActions.removeCohort(cohort)(dispatch),
    updateCohort: (cohort: Cohort) =>
      adminActions.updateCohort(cohort)(dispatch),
    selectCohort: (cohort: Cohort | null) =>
      dispatch(adminActions.cohortSelect(cohort)),
  },
  user: {
    toggleEditUser: () => dispatch(adminActions.toggleEditUser()),
    toggleShowUsers: () => dispatch(adminActions.toggleShowUsers()),
    getAllUsers: () => adminActions.getAllUsers()(dispatch),
    removeUser: (user: User) => adminActions.removeUser(user)(dispatch),
    updateUser: (user: User) => adminActions.updateUser(user)(dispatch),
    selectUser: (user: User | null) => dispatch(adminActions.userSelect(user)),
  },
  toggleSendRegistration: () => dispatch(adminActions.toggleSendRegistration()),
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class AdminDashboard extends React.Component<Props, {}> {
  componentWillMount() {
    this.refreshAll();
  }

  refreshAll = () => {
    this.props.cohort.getAllCohorts();
    this.props.user.getAllUsers();
  };

  render() {
    const cohortData = {
      cohorts: this.props.cohorts,
      selectedCohort: this.props.selectedCohort,
      errorMessage: this.props.errorMessage,
      showAddCohort: this.props.showAddCohort,
      showEditCohort: this.props.showEditCohort,
      showAllCohorts: this.props.showAllCohorts,
      ...this.props.cohort,
    };

    const userData = {
      users: this.props.users,
      selectedUser: this.props.selectedUser,
      errorMessage: this.props.errorMessage,
      showEditUser: this.props.showEditUser,
      showAllUsers: this.props.showAllUsers,
      ...this.props.user,
    };

    return (
      <div>
        <Typography variant="h2" align="center" onClick={this.refreshAll}>
          Admin Dashboard
        </Typography>
        <Cohorts {...cohortData} />
        <Users {...userData} />
      </div>
    );
  }
}

export default connect(AdminDashboard);
