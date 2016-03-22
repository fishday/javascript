window.myWidget.render.push(function(widget){
    var smsc_login = 'amolearning@shotmail.ru';
    var smsc_password = 'amolearning@shotmail.ru';
    var message = 'ну норм'
    var phones = (function(){
        var result = [];
        $('.js-cf-actions-item[data-type=phone]').each(function(){
            $this = $(this);
            try{
                var temp = $this.parent().prev().val();
                if (temp.toString().length>4){
                    result[result.length] = temp;
                }
            }
            catch (e){
            }
        })
        return result;
    })();
    widget.render_template({
        caption: { class_name: 'customWidget_' + widget.get_settings().widget_code },
        body: '',
        render: '<div class="ac-form">' +
                '    <div id = "js-ac-sub-lists-container"></div>' +
                '    <div id = "js-ac-sub-subs-container"></div>' +
                '    <div class = "widget_container">' + 
                '        {% for phone in phones %}<a href = "#" data-phone"{{phone}}">Отправить СМС {{phone}}</a><br>{% endfor %}' +
                '    </div>' +
                '</div>' +
                '<div class="ac-already-subs"></div>' +
                '<style>' + 
                '   .customWidget_{{w_code}}{background-color: #fbd351; }' +
                '   .customWidget_{{w_code}} + div{background-color: #fff; padding: 10px 5px;}' +
                '<style>'
    },{
        phones: phones,
        w_code:widget.get_settings().widget_code,
    });
    
    $('.' + widgetClass + '+div a[data-phone]').on('click', function(e){
        e.preventDefault();
        var phone = $(this).data('phone');
        widget.crm_post(
            'https://smsc.ru/sys/send.php',
            {
                'login' : smsc_login,
                'psw' : smsc_password,
                'phones' : phone,
                'mes' : message,
                'charset' : 'utf-8'
            },
            function(){
                $('.' + widgetClass + '+div .widget_container').html('Отправлено уведомление на номер ' + phone);
            }
        );
    });
    return true;
});
/*window.myWidget.render.push(function(){
    console.log('render 191');
    return true;
});*/
window.myWidget.init.push(function(){
    console.log('init');
    return true;
});
window.myWidget.bind_actions.push(function(){
    console.log('bind_actions');
    return true;
});
window.myWidget.settings.push(function(){
    console.log('settings');
    return true;
});
window.myWidget.onSave.push(function(){
    console.log('onSave');
    return true;
});
window.myWidget.destroy.push(function(){
    console.log('destroy');
    return true;
});
window.myWidget.contacts.push(function(){
    console.log('contacts');
    return true;
});
window.myWidget.leads.push(function(){
    console.log('leads');
    return true;
});
window.myWidget.tasks.push(function(){
    console.log('tasks');
    return true;
});




/*    widget.render_template({
            caption: { class_name: ''},
            body: '',
            render: '\
                    <div class="ac-form">\
                        <div id = "js-ac-sub-lists-container"></div>\
                        <div id = "js-ac-sub-subs-container"></div>\
                        <div class = "solohin_container" style="padding: 15px 5px;">Виджет загружается...</div></div>\
                    <div class="ac-already-subs"></div>\
                    <style>\
                    .card-widgets_widget_caption[data-code={{w_code}}]{background-color: #fbd351;}\
                    </style>\
                    '
        },{
            w_code:widget.get_settings().widget_code,
        });
        return true;
*/