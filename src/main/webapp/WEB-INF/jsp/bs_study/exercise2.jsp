<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>表格2</title>

    <%--引入bootstrapcss--%>
    <link rel="stylesheet" href="/lib/bootstrap-3.3.7-dist/css/bootstrap.css">
    <link rel="stylesheet" href="/css/bs/exercise2.css">

</head>
<body>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <%--<div class="pull-left">--%>
                    <button class="btn btn-info" id="newUser" data-toggle="modal" data-target="#newUserModal">New</button>
                    <button class="btn btn-success">Disabled</button>
                    <button class="btn btn-warning">Delete</button>
                <%--</div>--%>
                <div class="pull-right">
                    <div class="btn-group">
                        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Filter By Disabled<span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li class=""><a href="#">单点追踪</a></li>
                            <li class=""><a href="#">实时监控</a></li>
                            <li class=""><a href="#">历史轨迹</a></li>
                        </ul>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Sort By FirstName<span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li class=""><a href="#">单点追踪</a></li>
                            <li class=""><a href="#">实时监控</a></li>
                            <li class=""><a href="#">历史轨迹</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div >
                <table class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>rrr</td>
                        <td>1992-11-14</td>
                        <td>2857639@qq.com</td>
                        <td>3714128</td>
                        <td>
                            <button class="btn btn-info"><span class="glyphicon glyphicon-align-justify">&nbsp;Info</span></button>
                            <button class="btn btn-success"><span class="glyphicon glyphicon-user">&nbsp;Role</span></button>
                            <div class="btn-group">
                                <button class="btn btn-warning data-toggle" data-toggle="dropdown"><span class="caret"></span>&nbsp;More</button>
                                <ul class="dropdown-menu">
                                    <li class=""><a href="#">Projects</a></li>
                                    <li class=""><a href="#">Tasks</a></li>
                                    <li class=""><a href="#">Timesheet</a></li>
                                    <li class="divider"></li>
                                    <li class=""><a href="#">Others</a></li>

                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>rrr</td>
                        <td>1992-11-14</td>
                        <td>2857639@qq.com</td>
                        <td>3714128</td>
                        <td>
                            <button class="btn btn-info"><span class="glyphicon glyphicon-align-justify">&nbsp;Info</span></button>
                            <button class="btn btn-success"><span class="glyphicon glyphicon-user">&nbsp;Role</span></button>
                            <div class="btn-group">
                                <button class="btn btn-warning data-toggle" data-toggle="dropdown"><span class="caret"></span>&nbsp;More</button>
                                <ul class="dropdown-menu">
                                    <li class=""><a href="#">Projects</a></li>
                                    <li class=""><a href="#">Tasks</a></li>
                                    <li class=""><a href="#">Timesheet</a></li>
                                    <li class="divider"></li>
                                    <li class=""><a href="#">Others</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>2</td>
                        <td>qqq</td>
                        <td>1992-11-14</td>
                        <td>2857639@qq.com</td>
                        <td>3714128</td>
                        <td>
                            <button class="btn btn-info"><span class="glyphicon glyphicon-align-justify">&nbsp;Info</span></button>
                            <button class="btn btn-success"><span class="glyphicon glyphicon-user">&nbsp;Role</span></button>
                            <div class="btn-group">
                                <button class="btn btn-warning data-toggle" data-toggle="dropdown"><span class="caret"></span>&nbsp;More</button>
                                <ul class="dropdown-menu">
                                    <li class=""><a href="#">Projects</a></li>
                                    <li class=""><a href="#">Tasks</a></li>
                                    <li class=""><a href="#">Timesheet</a></li>
                                    <li class="divider"></li>
                                    <li class=""><a href="#">Others</a></li>

                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>3</td>
                        <td>aaa</td>
                        <td>1992-11-14</td>
                        <td>2857639@qq.com</td>
                        <td>3714128</td>
                        <td>
                            <button class="btn btn-info"><span class="glyphicon glyphicon-align-justify">&nbsp;Info</span></button>
                            <button class="btn btn-success"><span class="glyphicon glyphicon-user">&nbsp;Role</span></button>
                            <div class="btn-group">
                                <button class="btn btn-warning data-toggle" data-toggle="dropdown"><span class="caret"></span>&nbsp;More</button>
                                <ul class="dropdown-menu">
                                    <li class=""><a href="#">Projects</a></li>
                                    <li class=""><a href="#">Tasks</a></li>
                                    <li class=""><a href="#">Timesheet</a></li>
                                    <li class="divider"></li>
                                    <li class=""><a href="#">Others</a></li>

                                </ul>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            <div class="panel-footer">
                <div class="btn-toolbar">
                    <button class="btn btn-default">Prev</button>
                    <div class="btn-group">
                        <button class="btn btn-default">1</button>
                        <button class="btn btn-default">2</button>
                        <button class="btn btn-default">3</button>
                        <button class="btn btn-default">4</button>
                        <button class="btn btn-default">5</button>
                        <button class="btn btn-default">6</button>
                        <button class="btn btn-default">7</button>
                        <button class="btn btn-default">8</button>
                        <button class="btn btn-default">9</button>
                        <button class="btn btn-default">10</button>
                    </div>
                    <button class="btn btn-default">Next</button>
                </div>
            </div>
        </div>

        <%--模态框Role--%>
        <div class="modal fade" role="dialog" tabindex="-1" id="myModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">Role of Tom Xu</div>
                    <%--<div class="modal-body">--%>
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Role</th>
                                <th>Assign Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>admin</td>
                                <td>2019-04-30 14:32</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>guest</td>
                                <td>2019-04-30 14:32</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>guest2</td>
                                <td>2019-04-30 14:32</td>
                            </tr>
                            </tbody>
                        </table>
                    <%--</div>--%>
                    <div class="modal-footer">
                        <div class="pull-right">
                            <button class="btn btn-primary" data-dismiss="modal">close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--模态框newUser--%>
        <div class="modal fade" role="dialog" tabindex="-1" id="newUserModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">Create a New User</div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="Username">Username</label>
                                <div class="col-md-10">
                                    <input class="form-control" placeholder="Username" id="username" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="password">Password</label>
                                <div class="col-md-10">
                                    <input class="form-control" placeholder="Password" id="password" type="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="email">Email</label>
                                <div class="col-md-10">
                                    <input class="form-control" placeholder="email" id="email" type="email">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-offset-2 col-md-10">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox">Enable
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="pull-right">
                            <button class="btn btn-success" data-dismiss="modal">create</button>
                            <button class="btn btn-primary" data-dismiss="modal">reset</button>
                            <button class="btn btn-warning" data-dismiss="modal">close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<%--引入jquery库--%>
<script type="text/javascript" src="/lib/jquery-3.3.1.min.js"></script>
<%--引入bootstrap库--%>
<script type="text/javascript" src="/lib/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
<script type="text/javascript" src="/js/bs_study/exercise2.js"></script>

</body>
</html>
