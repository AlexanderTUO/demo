package com.example.blog.realm;

import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.PrincipalCollection;
import org.omg.CORBA.portable.UnknownException;

import java.security.Permission;
import java.util.HashSet;
import java.util.Set;

public class CustomRealm extends AuthorizingRealm {

    private static final String REAM_NAME = "OwnRealm";


    /**
     * 模拟从数据库获取密码
     *
     * @param username
     * @return
     */
    private String getPasswordByUsername(String username) {
        return "";
    }

    /**
     * dsfsdsdfs
     * @param username
     * @return
     */
    private boolean isRealUsername(String username) {
        return true;
    }


    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String username = (String) authenticationToken.getPrincipal();
        String password = (String) authenticationToken.getPrincipal();

//        String username_db = getUsername();
        if (!isRealUsername(username)) {
            throw new UnknownAccountException("该用户不存在");
        }

        String password_db = getPasswordByUsername(username);
        if (!password.equals(password_db)) {
            throw new IncorrectCredentialsException("密码不正确");
        }

        AuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(username, password, this.REAM_NAME);

        return authenticationInfo;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {

        String username = (String) principalCollection.getPrimaryPrincipal();
        //根据姓名获得权限

        Set<String> permissions = new HashSet<String>();
        permissions.add("user:add");
        permissions.add("user:update");

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        for (String permission : permissions) {
            authorizationInfo.addStringPermission(permission);
        }

        return authorizationInfo;
    }
}


