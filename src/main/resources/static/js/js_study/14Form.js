window.onload = function (ev) {
    var form = document.getElementById("myForm");
    var field = form.elements[0];

    field.addEventListener('focus', function (e) {
        if (e.target.style.backgroundColor != 'red') {
            e.target.style.backgroundColor = 'yellow';
            // 选择文本
            // e.target.select();
        }
    }, false);

    field.addEventListener('blur', function (e) {
        if (/[^\d]/.test(e.target.value)) {
            e.target.style.backgroundColor = 'red';
        } else {
            e.target.style.backgroundColor = '';
        }
    }, false);

    field.addEventListener('change', function (e) {
        if (/[^\d]/.test(e.target.value)) {
            e.target.style.backgroundColor = 'red';
        } else {
            e.target.style.backgroundColor = '';
        }
    }, false);

    // 选择事件
    // field.addEventListener('select', function (e) {
    //     console.log('选择了'+e.target.value)
    // }, false);

    // 取得选择文本
    // field.addEventListener('select', function (e) {
    //     console.log('选择了' + e.target.value.substring(e.target.selectionStart, e.target.selectionEnd));
    // }, false);

    // 选择部分文本
    field.addEventListener('select', function (e) {
        console.log('选择了' + e.target.setSelectionRange(0, 5));
    }, false);

    field.addEventListener('keypress', function (e) {
        // 阻止事件默认行为
        // if (/[\d]/.test(e)) {
        //     e.preventDefault();
        // }
    });

    (function () {
        function autofocus(e) {
            var form = e.target.form;
            var textLength = e.target.value.length;

            if (textLength==e.target.maxLength){
                for (var i = 0,len=form.length; i <len ; i++) {
                    if (form[i] == e.target) {
                        if (form.elements[i + 1]) {
                            form.elements[i + 1].focus();
                        }
                    }
                }
            }
        }

        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var password2 = document.getElementById('password2');

        username.addEventListener('keyup', autofocus, false);
        password.addEventListener('keyup', autofocus, false);
        password2.addEventListener('keyup', autofocus, false);
    })();
}