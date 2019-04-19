window.onload = function (ev) {
    var CookieUtil = {
        get:function (name) {
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null;
            if (cookieStart > -1) {//若找到name,则找对应的结束符引号
                var cookieEnd = document.cookie.indexOf(';', cookieStart);
                if (cookieEnd == -1) {//若没找到引号，说明该值为cookie最后一个部分吗，则将整个cookie长度作为end
                    cookieEnd = document.cookie.length;
                }
                //解码
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }
            return cookieValue;
        },
        set:function (name,value,expires,path,domain,secure) {
            var cookieText = encodeURIComponent(name) + "=" +
                encodeURIComponent(value);
            if (expires instanceof Date) {
                cookieText += ";" + expires.toUTCString();
            }
            if (path) {
                cookieText += ";" + path;
            }
            if (domain) {
                cookieText += ";" + domain;
            }
            if (secure) {
                cookieText += ";" + secure;
            }
            document.cookie = cookieText;
        },
        unset:function (name,path,domain,secure) {
            this.set(name, "", new Date(), path, domain, secure);
        }
    }

    CookieUtil.set("name", "Nicholas");
    CookieUtil.set("book","JavaScript")

    console.log(CookieUtil.get("book"));

    // 子CookieUtil
    var SubCookieUtil = {
        get:function (name,subName) {
            var subCookies = this.getAll(name);
            if (subCookies.length > 0) {
                return subCookies[subName];
            } else {
                return null;
            }
        },
        getAll:function (name) {
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null,
                parts,
                subCookies,
                result = {};
            if (cookieStart > -1) {
                var cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
                if (cookieValue.length > 0) {
                    subCookies = cookieValue.split("&");
                    for (var i = 0, len = subCookies.length; i < len; i++) {
                        parts = subCookies[i].split("=");
                        result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                    }
                    return result;
                }
            } else {
                return null;
            }
        },
        set: function (name,subName,value,expires,path,domain,secure) {
            var subCookies = this.getAll(name)||{};
            subCookies[subName] = value;
            this.setAll(name, subCookies, expires, path, domain, secure);
        },
        setAll: function (name,subCookies,expires,path,domain,secure) {
            var subName,
                cookieText = encodeURIComponent(name) + "=",
                subCookieParts = new Array();
            for (subName in subCookies) {
                if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
                    subCookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
                }
            }
            if (subCookieParts.length > 0) {
                cookieText += subCookieParts.join("&");
            }
            if (expires) {
                cookieText += ";" + expires.toUTCString();
            }
            if (path) {
                cookieText += ";" + path;
            }
            if (domain) {
                cookieText += ";" + domain;
            }
            if (secure) {
                cookieText += ";" + secure;
            }
            document.cookie = cookieText;
        },
        unset:function (name,subName,path,domain,secure) {
            var subCookies = this.getAll(name);
            if (subCookies) {
                delete subCookies[subName];
                this.setAll(name, subCookies, null, path, domain, secure);
            }
        },
        unsetAll:function (name, path, domain, secure) {
            this.setAll(name, null, new Date(), path, domain, secure);
        }
        
    }



    SubCookieUtil.setAll("data",{
        "age": 29,
        "sex": "male"
    })

    SubCookieUtil.set("data", "name", "Nicholas");
    SubCookieUtil.set("data", "book", "JS");

    SubCookieUtil.unset("data", "age");
    SubCookieUtil.unsetAll("data");
}