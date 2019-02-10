import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import * as instructorActions from "../../actions/instructor_dashboard";
import { fetchMessage } from "../../actions/notifications";
import { State } from "../../reducers";
import {
  Assignment,
  Cohort,
  Deliverable,
  NewAssignmentInfo,
  NewCohortInfo,
  NewDeliverableInfo,
  User
} from "../../Types";
import { connectedComponentHelper } from "../../utils/connectedComponent";
import Cohorts from "./CohortPanel/Cohorts";
import Assignments from "./AssignmentPanel/Assignments";
import Deliverables from "./DeliverablePanel/Deliverables";

const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.instructorDashboard
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  cohort: {
    // Cohort actions
    getAllCohorts: () => instructorActions.getAllCohorts()(dispatch)
  },
  assignment: {
    toggleAddAssignment: () =>
      dispatch(instructorActions.toggleAddAssignment()),
    addNewAssignment: (assignmentInfo: NewAssignmentInfo) =>
      instructorActions.addNewAssignment(assignmentInfo)(dispatch),
    updateAssignment: (assignment: Assignment) =>
      instructorActions.updateAssignment(assignment)(dispatch),
    removeAssignment: (assignment: Assignment) =>
      instructorActions.removeAssignment(assignment)(dispatch),
    getAllAssignments: () => instructorActions.getAllAssignments()(dispatch)
  },
  deliverable: {
    toggleAddDeliverable: () =>
      dispatch(instructorActions.toggleAddDeliverable()),
    addNewDeliverable: (deliverableInfo: NewDeliverableInfo) =>
      instructorActions.addNewDeliverable(deliverableInfo)(dispatch),
    updateDeliverable: (deliverable: Deliverable) =>
      instructorActions.updateDeliverable(deliverable)(dispatch),
    removeDeliverable: (deliverable: Deliverable) =>
      instructorActions.removeDeliverable(deliverable)(dispatch),
    getAllDeliverables: () => instructorActions.getAllDeliverables()(dispatch)
  }
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps,
  mapDispatchToProps
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class InstructorDashboard extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.assignment.getAllAssignments();
    this.props.cohort.getAllCohorts();
    this.props.deliverable.getAllDeliverables();
  }

  render() {
    const addAssignmentPanel = this.props.showAddAssignment ? (
      <div>
        {/* TODO: Add 'add assignment' component */}
        Add Assignment Component Goes Here!
      </div>
    ) : (
      <div />
    );

    const addDeliverablePanel = this.props.showAddDeliverable ? (
      <div>
        {/* TODO: Add 'add deliverable' component */}
        Add Deliverable Component Goes Here!
      </div>
    ) : (
      <div />
    );
    const cohortData = {
      cohorts: this.props.cohorts,
      errorMessage: this.props.errorMessage,
      ...this.props.cohort
    };
    const assignmentData = {
      assignments: this.props.assignment,
      showAddAssignment: this.props.showAddAssignment,
      errorMessage: this.props.errorMessage,
      ...this.props.assignment
    };
    const deliverableData = {
      deliverables: this.props.deliverables,
      showAddDeliverable: this.props.showAddDeliverable,
      errorMessage: this.props.errorMessage,
      ...this.props.deliverable
    };

    // TODO: remove after testing ^^^^^^^

    return (
      <div>
        <Typography variant="h2" align="center">
          Instructor Dashboard
        </Typography>
        <Cohorts {...cohortData} />
        <Assignment {...assignmentData} />
        <Deliverable {...deliverableData} />
      </div>
    );
  }
}

export default connect(InstructorDashboard);
