function showDialog(templateData) {
  $("#ItemName").val(templateData.name)
  $("#TemplateCode").val(templateData.code)
  $.ligerDialog.open({
    target: $("#dialog"),
    title: "添加控件"+ templateData.type,
    width: 750,
    height: 480,
    isResize: true,
    modal: true,
    buttons: [
      { text: '取消', onclick: function (item, dialog) { dialog.hide(); } }
    ]
  });
  $(function () {
    $.metadata.setType("attr", "validate");
    var v = $("#form1").validate({
      debug: true,
      errorPlacement: function (lable, element) {
        if (element.hasClass("l-textarea")) {
          element.ligerTip({content: lable.html(), target: element[0]});
        } else if (element.hasClass("l-text-field")) {
          element.parent().ligerTip({content: lable.html(), target: element[0]});
        } else {
          lable.appendTo(element.parents("td:first").next("td"));
        }
      },
      success: function (lable) {
        lable.ligerHideTip();
        lable.remove();
      },
      submitHandler: function (e) {
        // document.form1.submit()
        flash($("#ItemName").val(),$("#TemplateCode").val(),templateData)
        // dialog.hide()
        $.ligerDialog.hide()
      }
    });
    $("#form1").ligerForm();
    $(".l-button-test").click(function () {
      alert(v.element($("#txtName")));
    });
  });
}
function  flash(newItemName, newTemplateCode, oldTemplateData) {
  var model = myDiagram.model;
  //所有模型更改都应该在事务模型中进行
  model.startTransaction("flash");
  var data = model.nodeDataArray.filter( x => {
    return x.key === oldTemplateData.key
  })[0]
  model.setDataProperty(oldTemplateData, "name", newItemName); // 修改属性
  model.setDataProperty(oldTemplateData, "code", newTemplateCode); // 修改属性
  model.commitTransaction("flash");
}

// var upflag = {{.errormsg}};

// if (upflag != "") {
//   if (upflag == "保存成功") {
//     parent.window.loadtree();
//     $(".l-bar-button.l-bar-btnload", window.parent.document).click();
//     parent.$.ligerDialog.close();
//     parent.$(".l-dialog,.l-window-mask").remove();

//   } else {
//     alert(upflag);
//   }
// }