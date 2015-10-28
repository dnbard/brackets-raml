define(function(require, exports, module){
    var StatusBar = brackets.getModule('widgets/StatusBar'),
        Dialogs = brackets.getModule('widgets/Dialogs'),
        isVisible = true,
        indicatorId = 'indicator-dnbard.raml',
        modulePath = brackets.getModule("utils/ExtensionUtils").getModulePath(module),
        indicatorDOM = $('<div>RAML</div>');

    StatusBar.addIndicator(indicatorId, indicatorDOM, isVisible);

    indicatorDOM.click(function(){
        Dialogs.showModalDialog('dialog-dnbard.raml', '<iframe src="' + modulePath + 'api-console/index.html?raml=https://raw.githubusercontent.com/mulesoft/api-console/master/dist/examples/box.raml"></iframe>', "", [], true);
    });
});
