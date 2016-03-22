window.myWidget = {};
window.myWidget.render = [];
window.myWidget.init = [];
window.myWidget.bind_actions = [];
window.myWidget.settings = [];
window.myWidget.onSave = [];
window.myWidget.destroy = [];
window.myWidget.contacts = [];
window.myWidget.leads = [];
window.myWidget.tasks = [];
window.myWidget.execute = function(event, widget){
    var result = true;
    for (var i = 0; i<window.myWidget[event].length; i++){
        if (result){
            result = result && window.myWidget[event][i](widget);
        }
    }
    return result;
}

define(['jquery', 'lib/components/base/modal', '/upl/simych/widget/doit.js'], function($, Modal){
    var CustomWidget = function () {
    	var self = this;
        window.Modal = Modal;
        this.callbacks = {
            render: function(){
                return window.myWidget.execute('render', self);
            },
            init: function(){
                return window.myWidget.execute('init', self);
            },
            bind_actions: function(){
                return window.myWidget.execute('bind_actions', self);
            },
            settings: function(){
                return window.myWidget.execute('settings', self);
            },
            onSave: function(){
                return window.myWidget.execute('onSave', self);
            },
            destroy: function(){
                return window.myWidget.execute('destroy', self);
            },
            contacts: {
                selected: function(){
                    return window.myWidget.execute('contacts', self);
                }
            },
            leads: {
                selected: function(){
                    return window.myWidget.execute('leads', self);
                }
            },
            tasks: {
                selected: function(){
                    return window.myWidget.execute('tasks', self);
                }
            }
        };
        return this;
    };
    return CustomWidget;
});




/*                console.log('render');
                alert('рендер 190');
                var p = document.createElement('p'); // создаём параграф
                txt = document.createTextNode('МОЙ НОВЫЙ ПАРАГРАФ');
                p.appendChild(txt);
                document.body.appendChild(p);
                return true;

        },
        init: function(){
                console.log('init');
                alert('инит');
                return true;
        },
        bind_actions: function(){
                console.log('bind_actions');
                alert('бинд_экшенс');
                return true;

        },
        settings: function(){
                return true;
        },
        onSave: function(){
                alert('онсаве');
                return true;
        },
        destroy: function(){

        },
        contacts: {
                        //select contacts in list and clicked on widget name
                        selected: function(){
                                console.log('contacts');
                        }
                },
        leads: {
                        //select leads in list and clicked on widget name
                        selected: function(){
                                console.log('leads');
                        }
                },
        tasks: {
                        //select taks in list and clicked on widget name
                        selected: function(){
                                console.log('tasks');
                        }
                }
        };*/