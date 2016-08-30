var modWidg1 = {};
var modArr = {};

modWidg1.renderWidget = function(widget, widgetClass)
{
    widget.render_template({
        caption: { class_name: 'customWidget_1' + widget.get_settings().widget_code },
        body: '',
        render: '<div class="ac-form">' +
                '    <div id = "js-ac-sub-lists-container"></div>' +
                '    <div id = "js-ac-sub-subs-container"></div>' +
                '    <div class = "widget_container">' + 
                '        <div class="sendMail">' +
                '            <a href = "#" data-check="{{300}}">Отравить письмо</a><br>' +                
                '        </div>' +
                '        <div class="editTemplate">' +
                '            <a href = "#" data-check="{{300}}">Редактировать шаблоны</a><br>' +
                '        </div>' +
                '    </div>' +
                '</div>'
        
    },{
        w_code:widget.get_settings().widget_code,
        widget_class: widgetClass
    });
}

modWidg1.query = function(widget, modalClass) {
    widget.crm_post(
        'https://fishdayprod.ru/widgets/roskrepeg_version_2/amoModal.php',
        {
            'user_login' : widget.system().amouser,
            'user_hash' : widget.system().amohash,
            'subdomain' : widget.system().subdomain,
            'currentContact': AMOCRM.data.current_card.id
        },
        function(data){
            modArr.output = data;
            modWidg1.loadModalTemplate(widget, modalClass, modArr.output, function(){
                modWidg1.modalSend(modalClass, widget);
            });
            
        },
        'json',
        function(error)
        {
        }
    );
}

modWidg1.answerQuery = function(widget, fd) {
    $.ajax({
        type : 'POST',
        url : 'https://fishdayprod.ru/widgets/roskrepeg_version_2/mailSend.php',
        data : fd,
        processData: false,
        contentType: false
    })
    .done(function(data){
       alert(data);
    });
}

modWidg1.addButton = function (widget){
    var modalClass = 'modalwindow';  
    $('.sendMail').on('click', function(e){
        modWidg1.openModal(modalClass, function(){
            modWidg1.query(widget, modalClass);
            
        });
    });
    
}

modWidg1.loadModalTemplate = function(widget, modalClass, contactData, callback) {
    var params = {
        'contactData' : contactData,
        'user_login' : widget.system().amouser,
        'user_hash' : widget.system().amohash,
        'subdomain' : widget.system().subdomain,
        'currentContact': AMOCRM.data.current_card.id,
        'login': widget.get_accounts_current().account.widget.login,
        'password': widget.get_accounts_current().account.widget.password,
        'widget_code': widget.get_accounts_current().account.widget.widget_code

    };
    widget.render({
        href:'/0ByLnB0fp6SpwT2UtZ0k2OFVMZzg',
        base_path: 'https://googledrive.com/host',
        load: function(template){
            $('.' + modalClass).html(template.render(params));
            modWidg1.centrifyModal();
            callback(modalClass, widget);
        }
    }, params);
}

modWidg1.openModal = function(contentClass, callback) {
    new Modal ({
        class_name: 'modal-window',
        init: function ($modal_body) {
            $modal_body
                    .trigger ('modal:loaded')
                    .html ('<div class="'+contentClass+'"><div style="text-align: center;"> Идет загрузка..</div></div>')
                    .trigger('modal:centrify')
                    .append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span');
            callback();
            modWidg1.centrifyModal=function(){
                $modal_body.trigger('modal:centrify');
            }
       },
       destroy: function(){}
    });
}


modWidg1.modalSend = function(modalClass, widget)
{
    var mainarray = [];
    var inputFile = [];
    $('.' + modalClass + ' form').on('submit', function(e){
        e.preventDefault();
        CKEDITOR.instances['ckeditorArea'].updateElement();
        var fd = new FormData($('.mymodal')[0]);
        modWidg1.answerQuery(widget, fd);
    });
}


modWidg1.openModalTemplate = function(contentClass, callback) {
    new Modal ({
        class_name: 'modal-window',
        init: function ($modal_body) {
            $modal_body
                    .trigger ('modal:loaded')
                    .html ('<div class="'+contentClass+'"><div style="text-align: center;"> Идет загрузка..</div></div>')
                    .trigger('modal:centrify')
                    .append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span');
            callback();
            modWidg1.centrifyModal=function(){
                $modal_body.trigger('modal:centrify');
            }
       },
       destroy: function(){}
    });
}

modWidg1.loadModalEditTemplate = function(widget, modalClass, filesList, callback) {
    var params = {
        'filesList' : filesList,
        'user_login' : widget.system().amouser,
        'user_hash' : widget.system().amohash,
        'subdomain' : widget.system().subdomain,
        'currentContact': AMOCRM.data.current_card.id,
        'login': widget.get_accounts_current().account.widget.login,
        'password': widget.get_accounts_current().account.widget.password,
        'widget': widget,
    };
    widget.render({
        href:'/0ByLnB0fp6SpwekR1Q1MwRDRWUXc',
        base_path: 'https://googledrive.com/host',
        load: function(template){
            $('.' + modalClass).html(template.render(params));
            modWidg1.centrifyModal();
            callback(modalClass, widget);
        }
    }, params);
}

modWidg1.editTemplate = function(widget)
{
    $('.editTemplate').on('click', function(e){
        e.preventDefault();
        modalClass = 'editTemplateModal';
        modWidg1.openModalTemplate(modalClass, function(){
            modWidg1.loadModalEditTemplate(widget, modalClass, 0, function(){
                //modWidg1.modalSend(modalClass, widget);
            });

        });
    });

}

modWidg1.getFilesList = function(){
    $.ajax({
        type : 'POST',
        url : 'https://fishdayprod.ru/widgets/roskrepeg_version_2/filesList.php',
    })
    .done(function(data){
        console.log(data);
        modWidg1.filesList = data;

    });

}

window.mailwidgetroskrepeg.render.push(function(widget){
    var widgetClass = 'customWidget_1' + widget.get_settings().widget_code;
    modWidg1.renderWidget(widget, widgetClass);
    return true;
});

window.mailwidgetroskrepeg.init.push(function(widget){
    console.log('vers. 2.0');
    modWidg1.editTemplate(widget);
    return true;
});
window.mailwidgetroskrepeg.bind_actions.push(function(widget){
    var widgetClass = 'customWidget_1' + widget.get_settings().widget_code;
    modWidg1.addButton(widget);
    var modalClass = 'modalwindow';
    return true;
});
window.mailwidgetroskrepeg.settings.push(function(){
    return true;
});
window.mailwidgetroskrepeg.onSave.push(function(){
    return true;
});
window.mailwidgetroskrepeg.destroy.push(function(){
    return true;
});
window.mailwidgetroskrepeg.contacts.push(function(){
    return true;
});
window.mailwidgetroskrepeg.leads.push(function(){
    return true;
});
window.mailwidgetroskrepeg.tasks.push(function(){
    return true;
});

