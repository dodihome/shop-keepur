import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Blank';
import { LoginPage } from './routes/accounts/login';
import { SignUpPage } from './routes/accounts/sign-up';
import { ForgotPasswordPage } from './routes/accounts/forgot-password';
import { ResetPasswordPage } from './routes/accounts/reset-password';
import { VerifyEmailPage } from './routes/accounts/verify-email';
import UserProfilePage from './routes/accounts/profile';
import { LogoutPage } from './routes/accounts/logout';
import BizEdit from './routes/businesses/biz.edit';
import BizClaim from './routes/businesses/biz.claim';
import BizzList from './routes/businesses/list.public';

import BizzAdmin from './routes/admin/bizz';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/user/login' component={LoginPage} />
        <Route exact path='/user/logout' component={LogoutPage} />
        <Route exact path='/user/sign-up' component={SignUpPage} />
        <Route exact path='/user/forgot-password' component={ForgotPasswordPage} />
        <Route exact path='/user/reset-password/:token' component={ResetPasswordPage} />
        <Route exact path='/user/verify-email/:token' component={VerifyEmailPage} />

        <Route exact path='/user/profile' component={UserProfilePage} />

        <Route exact path='/bizz/new' component={BizEdit} />
        <Route exact path='/bizz/claim/:id' component={BizClaim} />
        <Route exact path='/bizz/edit/:id' component={BizEdit} />
        <Route exact path='/bizz' component={BizzList} />

        <Route exact path='/admin/bizz' component={BizzAdmin} />
      </Router>
    )
  };  
}

export default App;
