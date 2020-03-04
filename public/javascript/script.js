
$('.input-edit-btn').click(function(){
  let item = $(this).attr('id').split('-')[1];
  toggleButtons(item);
});

$('.input-cancel-btn').click(function(){
  let item = $(this).attr('id').split('-')[1];
  toggleButtons(item);
});

$('.input-save-btn').click(function(){
  let item = $(this).attr('id').split('-')[1];
  let idField = $('#id-field');
  let data = {
    "id": idField.val()
  }
  data[item] = $('#' + item).val();
  if ( item === 'password' ){
    data.password2 = $('#password2').val();
  }
  $.ajax({
    type: "PUT",
    url: idField.attr('data-url'),
    data,
    dataType: "json"
  })
  .done((data)=>{
    console.log(data);
    $('#' + item).val(data.update[item]);
    toggleButtons(item);
    removeErrorAlert(item);
    if ( item === 'color' ){
      location.reload();
    }
  })
  .fail((err)=>{
    console.log(err);
    addErrorAlert('name', err.responseJSON.msg);
  });

});


function toggleButtons(item){
  $('#edit-' + item).toggleClass('btn-hide');
  $('#cancel-' + item).toggleClass('btn-hide');
  $('#save-' + item).toggleClass('btn-hide');
  if ( $('#' + item).prop("disabled") ){
    $('#' + item).prop( "disabled", false );
  } else {
    $('#' + item).prop( "disabled", true );
  }
  if (item === 'password'){
    if ( $('#password2').prop("disabled") ){
      $('#password2').prop( "disabled", false );
    } else {
      $('#password2').prop( "disabled", true );
    }
  }
}
function addErrorAlert(item, errMsg){
  removeErrorAlert(item);
  $('#' + item + '-group').before('<div class="alert alert-danger" role="alert" id="' + item + '-alert">' + errMsg + '</div>');
}
function removeErrorAlert(item){
  let alert = $('#' + item + '-alert');
  if (alert.length){
    alert.remove();
  }
}

const hasElem = function(selector){
  return document.querySelectorAll(selector).length > 0;
}

$('li.nav-item').each(function(){
  let item = $(this);
  if (document.URL.endsWith(item.attr('data-path') )){
    item.addClass('active');
    item.children('a').append(' <span class="sr-only">(current)</span>');
  }
});
