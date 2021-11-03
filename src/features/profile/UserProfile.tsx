import React, { useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import UserPostDetail from './posts/UserPostDetail';
import UserApps from './apps/UserApps';
import UserPosts from './posts/UserPosts';

export default function UserProfile() {
  const match = useRouteMatch();

  useEffect(() => {
    console.log(match.url);
    console.log(match.path);
  }, [match]);

  return (
    <div>
      <h2>User profile</h2>

      <ul>
        <li>
          <Link to={`${match.url}/apps`}>Apps</Link>
        </li>
        <li>
          <Link to={`${match.url}/posts/12`}>Post detail</Link>
        </li>
        <li>
          <Link to={`${match.url}/posts`}>Posts</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/apps`}>
          <UserApps />
        </Route>
        <Route path={`${match.path}/posts/:postId`}>
          <UserPostDetail />
        </Route>
        <Route path={`${match.path}/posts`}>
          <UserPosts />
        </Route>
      </Switch>
    </div>
  );
}
