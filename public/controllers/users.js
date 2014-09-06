'use strict';

angular.module('mean.mean-admin').controller('UsersController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Users', 'Roles',
    function($scope, Global, Menus, $rootScope, $http, Users, Roles) {
        $scope.global = Global;
        $scope.roles = [];
        $scope.userSchema = [{
            title: 'Email',
            schemaKey: 'email',
            type: 'text',
            inTable: true
        }, {
            title: 'Name',
            schemaKey: 'name',
            type: 'text',
            inTable: true
        }, {
            title: 'Username',
            schemaKey: 'username',
            type: 'text',
            inTable: true
        }, {
            title: 'Roles',
            schemaKey: 'roles',
            type: 'select',
            options: $scope.roles,
            inTable: true
        }, {
            title: 'Password',
            schemaKey: 'password',
            type: 'password',
            inTable: false
        }, {
            title: 'Repeat password',
            schemaKey: 'confirmPassword',
            type: 'password',
            inTable: false
        }];
        $scope.user = {};
        $scope.rolesObj = {};

        $scope.init = function() {
            Users.query({}, function(users) {
                $scope.users = users;
            });

            Roles.query({}, function(roles) {
                $scope.rolesObj = roles;

                // We need at least 'admin' and 'authenticated'
                if (roles.length === 0) {
                    Roles.save({role: 'admin'}, function(res) {
                        $scope.rolesObj.push(res);
                        $scope.roles.push(res.role);
                    });
                    Roles.save({role: 'authenticated'}, function(res) {
                        $scope.rolesObj.push(res);
                        $scope.roles.push(res.role);
                    });
                } else {
                    for (var i in $scope.rolesObj) {
                        if ($scope.rolesObj[i].role !== undefined) {
                            $scope.roles.push(roles[i].role);
                        }
                    }
                }
            });
        };

        $scope.add = function() {
            if (!$scope.users) $scope.users = [];

            var user = new Users({
                email: $scope.user.email,
                name: $scope.user.name,
                username: $scope.user.username,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword,
                roles: $scope.user.roles
            });

            user.$save(function(response) {
                $scope.users.push(response);
            });

            this.firstName = this.lastName = this.email = this.password = this.role = '';
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.update = function(user, userField) {
            if (userField && userField === 'roles' && user.roles.indexOf('admin') === -1) {
                if (confirm('Are you sure you want to remove "admin" role?')) {
                    user.$update();
                } else {
                    user.roles = user.tmpRoles;
                }
            } else
                user.$update();
        };

        $scope.beforeSelect = function(userField, user) {
            if (userField === 'roles') {
                user.tmpRoles = user.roles;
            }
        };

        $scope.addingRole = false;

        $scope.addRole = function() {
            $scope.addingRole = true;
        };

        $scope.doneAddRole = function() {
            $scope.addingRole = false;
            $scope.roles.push($scope.newRole);
            Roles.save({role: $scope.newRole}, function(res) {
                $scope.rolesObj.push(res);
            });
            $scope.newRole = "";
        };

        $scope.editRole = function() {
            $scope.editingRole = true;
        };

        $scope.doneEditRole = function() {
            $scope.editingRole = false;
        };

        $scope.removeRole = function(role) {
            for (var i in $scope.roles) {
                if ($scope.roles[i] === role.role) {
                    $scope.roles.splice(i, 1);
                }
            }

            for (var i in $scope.rolesObj) {
                if ($scope.rolesObj[i] === role) {
                    $scope.rolesObj.splice(i, 1);
                }
            }
            Roles.delete({roleId: role._id}, function(res){});
        };
    }
]);
