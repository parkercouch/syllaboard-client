import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as actions from '../../actions';
import { State } from '../../reducers';
import { connectedComponentHelper } from '../../utils/connectedComponent';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signoutUser: () => dispatch(actions.signoutUser()),
});

const { propsGeneric, connect } =
  connectedComponentHelper<{}>()(mapStateToProps, mapDispatchToProps);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class Signout extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Bye Bye</div>;
  }
}

export default connect(Signout);
