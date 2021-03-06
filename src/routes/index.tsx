import React from 'react';
import { Route, Switch } from 'react-router';

import NoMatch from '../components/NoMatch';

import { ProtectedRoute } from '../components/auth/require_role';
import Signin from '../components/auth/Signin';
import Signout from '../components/auth/Signout';
import Signup from '../components/auth/Signup';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

import AdminDashboard from '../components/admin/Dashboard';
import InstructorDashboard from '../components/instructor/Dashboard';
import StudentDashboard from '../components/student/Dashboard';



const routes = (
  <div>
    <Header/>
    <Switch>
      {/* Landing Page */}
      <Route exact path="/" component={Welcome} />

      {/* Auth */}
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={Signout} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/signup/:cohortKey" component={Signup} />

      {/* Dashboards */}
      <ProtectedRoute exact path="/dashboard/admin" role="admin" component={() => (
        <AdminDashboard />)}
      />
      <ProtectedRoute exact path="/dashboard/student" role="student" component={() => (
        <StudentDashboard />)}
      />
      <ProtectedRoute exact path="/dashboard/instructor" role="instructor" component={() => (
        <InstructorDashboard />)}
      />

      {/* Fallback */}
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
