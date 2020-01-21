//Start script to update users

$('#edit-name').click(()=>{
  toggleButtons('name')
});

$('#cancel-name').click(()=>{
  toggleButtons('name')
});

$('#save-name').click(()=>{
  $.ajax({
    type: "PUT",
    url: "/api/users/",
    data: {
      "id": $('#id-field').val(),
      "name": $('#name').val()
    },
    dataType: "json"
  })
  .done((data)=>{
    console.log(data);
    $('#name').val(data.updatedUser.name);
    toggleButtons('name');
    removeErrorAlert('name');
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
}
function addErrorAlert(item, errMsg){
  $('#' + item + '-group').before('<div class="alert alert-danger" role="alert" id="' + item + '-alert">' + errMsg + '</div>');
}
function removeErrorAlert(item){
  let alert = $('#' + item + '-alert');
  if (alert.length){
    alert.remove();
  }
}
//End script to update users
