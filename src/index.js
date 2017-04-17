/**
 * Created by dongwei on 2017/3/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import { HashRouter as Router, Route, hashHistory } from 'react-router-dom';
//新的写法,以前的版本不适用 不能使用老的方法了
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import HomePage from './pages/Home';
import BookAddPage from './pages/BookAdd';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/user/add" component={UserAddPage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/edit/:id" component={UserEditPage} />
        <Route path="/book/add" component={BookAddPage} />
    </Router>
), document.getElementById('app'));
