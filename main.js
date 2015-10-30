define(function(require, exports, module){
    var StatusBar = brackets.getModule('widgets/StatusBar'),
        MainViewManager = brackets.getModule('view/MainViewManager'),
        Dialogs = brackets.getModule('widgets/Dialogs'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        isVisible = true,
        indicatorId = 'indicator-dnbard-raml',
        dialogId = 'dialog-dnbard-raml',
        modulePath = ExtensionUtils.getModulePath(module),
        indicatorDOM = $('<div>RAML</div>'),
        ramlRegex = /\.raml$/i,
        currentFile = null;

    ExtensionUtils.loadStyleSheet(module, 'styles.css');

    StatusBar.addIndicator(indicatorId, indicatorDOM, isVisible);

    indicatorDOM.click(function(){
        if (currentFile === null){
            return console.error('File entity are null');
        }

        Dialogs.showModalDialog(dialogId, 'RAML', '<iframe src="' + modulePath + 'api-console/index.html"></iframe>', "", [], true);

        window.addEventListener("message", function(event){
            if (event.data === "RAMLReady"){
                var ramlIframe = $('.dialog-dnbard-raml iframe')[0].contentWindow;
                currentFile.read(function(err, fileData){
                    ramlIframe.postMessage(fileData, '*');
                });
            }
        });
    });

    function toggleIndicator(isVisibleState){
        StatusBar.updateIndicator(indicatorId, isVisibleState);
    }

    MainViewManager.on('currentFileChange', function(event, file){
        toggleIndicator(!!ramlRegex.test(file._path));
        currentFile = file;
    });
});
