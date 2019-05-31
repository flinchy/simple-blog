
$(document).ready(function() {

  //hides the update form div
  $('#updateForm').hide();
  //cancell button
  $('#cancel').on('click', function(){
    $('#updateForm').trigger('reset');
    $('#updateForm').hide();
    $('#newPostBtn').show('reset');
  });

  getPosts();
  $('#newPostBtn').on('click', function(e) {
    $('#newForm').toggle();
  })
  //This function gets all the post from the database and renders it on the index.html
  function getPosts() {
    $.ajax({
      url: 'http://localhost:3000/posts',
      method: 'GET',
      dataType: 'json',
      // data: {
      //   test: 'test data'
      // },
      success: function(data) {
        $(data).each(function(i, post) {
          $('#postsBody').append($('<tr>')
            .append($('<td>').append(post.id))
            .append($('<td>').append(post.title))
            .append($('<td>').append(post.body))
            .append($('<td>').append(post.author))
            .append($("<td style='width:200px;'>").append(`
              <button class="btn btn-outline-success btn-sm"><i class="far fa-edit editPost" data-pid="`+post.id+`">Edit</i></button> 
              <button class="btn btn-outline-primary btn-sm"><i class="fas fa-trash deletePost" data-pid="`+post.id+`">Delete</i></button>
            `)));
        });
        //calling the loadButton function after the page loads
        loadButtons();
      }
    });
  }


  //for our update function we need to get only one post hence the getOnePost function
  function getOnePost(id) {
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      method: 'GET',
      datatype: 'json',
      success: function(data) {
        $($('#updateForm')[0].singlePostID).val(data.id);
        $($('#updateForm')[0].updateTitle).val(data.title);
        $($('#updateForm')[0].updateAuthor).val(data.author);
        $($('#updateForm')[0].updateBody).val(data.body);
        $('#updateForm').show();
        
      }
    });
  }


  //This function creates a new post in the database
  function createPost(data) {
    $.ajax({
      url: 'http://localhost:3000/posts',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        console.log(data);
        window.location.href = '../welcome.html';
        getPosts();    
      }
    });
  }


  //events that if fired when you click the create post button
  $('#submitPost').on('click', function(e) {
    let data = {
      title: $($('#newForm')[0].title).val(),
      body: $($('#newForm')[0].body).val(),
      author: $($('#newForm')[0].author).val()
    }

    if(data.title === '' && data.body === '') {
      alert('You must Enter all fields');

    } else {

    createPost(data);
    $('#newForm').trigger('reset');//resets the form field after you submit post
    
    }

  });

  //loads the edit/delete button on the page
  function loadButtons() {
    $('.editPost').click(function(e) {
      getOnePost($($(this)[0]).data('pid'));
      $('#newPostBtn').hide();
      e.preventDefault();
    });

    $('.deletePost').click(function(e) {
      deletePost($($(this)[0]).data('pid'));
      e.preventDefault();
    })
  }

  //This function updates the post
  function putPost(id, data) {
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      method: 'PUT',
      dataType: 'json',
      data: data,
      success: function(data) {
        console.log(data);
        getPosts();
      }
    });
  }

  $('#submitUpdate').on('click', function(e) {
    let data = {
      title: $($('#updateForm')[0].updateTitle).val(),
      body: $($('#updateForm')[0].updateBody).val(),
      author: $($('#updateForm')[0].updateAuthor).val()
    }

    putPost($($('#updateForm')[0].singlePostID).val(), data);
    $('#updateForm').trigger('reset');//resets the form field after you submit post
    $('#updateForm').toggle(); // toggles the form back after it resets
    e.preventDefault();
  });
  

  //Deletes A post
  function deletePost(id) {
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      method: 'DELETE',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        getPosts();
      }
    });
  }
  
});















