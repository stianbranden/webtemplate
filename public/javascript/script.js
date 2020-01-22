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


$('#edit-password').click(()=>{
  toggleButtons('password')
});

$('#cancel-password').click(()=>{
  toggleButtons('password')
});

$('#save-password').click(()=>{
  $.ajax({
    type: "PUT",
    url: "/api/users/",
    data: {
      "id": $('#id-field').val(),
      "password": $('#password').val(),
      "password2": $('#password2').val()
    },
    dataType: "json"
  })
  .done((data)=>{
    console.log(data);
    $('#password').val(data.updatedUser.name);
    toggleButtons('password');
    removeErrorAlert('password');
  })
  .fail((err)=>{
    console.log(err);
    addErrorAlert('password', err.responseJSON.msg);
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
//End script to update users
