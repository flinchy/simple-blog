//How to target the buttons (edit/delete buttons) in the post table
//since javascript works from top to botttom, we need to find a way
//to load the buttons before any of the methods we defined below will actually load
//so we created load buttons

$(document).ready(function() {

  //hides the update form div
  $('#updateForm').hide();

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
            .append($("<td>").append(`
              <i class="far fa-edit editPost" data-pid="`+post.id+`"></i> 
              <i class="fas fa-trash deletePost" data-pid="`+post.id+`"></i>
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

  //events that if fired when you click the create post button
  $('#submitPost').on('click', function(e) {
    let data = {
      title: $($('#newForm')[0].title).val(),
      body: $($('#newForm')[0].body).val(),
      author: $($('#newForm')[0].author).val()
    }

    createPost(data);
    $('#newForm').trigger('reset');//resets the form field after you submit post
    $('#newForm').toggle(); // toggles the form back after it resets
    e.preventDefault();
  });


  //This function creates a new post in the database
  function createPost(data) {
    $.ajax({
      url: 'http://localhost:3000/posts',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        console.log(data);
        getPosts();    
      }
    });
  }

  //loads the edit/delete button on the page
  function loadButtons() {
    $('.editPost').click(function(e) {
      getOnePost($($(this)[0]).data('pid'));
      $('#newForm').hide();
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

















// $(document).ready(function(){
    
//   getTutorials();
  
//   $("#newPostBtn").on("click", function(e){
//       $("#newForm").toggle();
//   });
  
//   function getTutorials(){
//       $('#tutorialsBody').html('');
//       $.ajax({
//           url: 'http://localhost:3000/api/tutorials',
//           method: 'get',
//           dataType: 'json',
//           data: {
//               test: 'test data'
//           },
//           success: function(data) {
//               $(data).each(function(i, tutorial){
//                   $('#tutorialsBody').append($("<tr>")
//                                           .append($("<td>").append(tutorial.tutorialNumber))
//                                           .append($("<td>").append(tutorial.title))
//                                           .append($("<td>").append(tutorial.author))
//                                           .append($("<td>").append(tutorial.type))
//                                           .append($("<td>").append(tutorial._id))
//                                           .append($("<td>").append(`
//                                               <i class="far fa-edit editTut" data-tutid="`+tutorial._id+`"></i> 
//                                               <i class="fas fa-trash deleteTut" data-tutid="`+tutorial._id+`"></i>
//                                           `)));
//                   });
//               loadButtons();
//               }
//       });
//   }
  
//   function getOneTutorial(id){
//       $.ajax({
//           url: 'http://localhost:3000/api/tutorials/' + id,
//           method: 'get',
//           dataType: 'json',
//           success: function(data) {
//               $($("#updateForm")[0].tutId).val(data._id);
//               $($("#updateForm")[0].updateNum).val(data.tutorialNumber);
//               $($("#updateForm")[0].updateTitle).val(data.title);
//               $($("#updateForm")[0].updateAuthor).val(data.author);
//               $($("#updateForm")[0].updateType).val(data.type);
//               $("#updateForm").show();
//           }
//       });
//   }
  
//   $("#submitTutorial").on("click", function(e) {
//      let data = {
//          tutorialNumber: $($("#newForm")[0].tutNum).val(),
//          title: $($("#newForm")[0].title).val(),
//          author: $($("#newForm")[0].author).val(),
//          type: $($("#newForm")[0].type).val()
//      } 
     
//       postTutorial(data);
//       $("#newForm").trigger("reset");
//       $("#newForm").toggle();
//       e.preventDefault();
     
//   });
  
  
//   function postTutorial(data) {
//       $.ajax({
//           url: 'http://localhost:3000/api/tutorials',
//           method: 'POST',
//           dataType: 'json',
//           data: data,
//           success: function(data) {
//               console.log(data);
//               getTutorials();
//           }
//       });
//   }
  
//   function loadButtons() {
//       $(".editTut").click(function(e){
//           getOneTutorial($($(this)[0]).data("tutid"));
//           e.preventDefault();
//       });
      
//       $(".deleteTut").click(function(e){
//           deleteTutorial($($(this)[0]).data("tutid"));
//           e.preventDefault();
//       })
//   }
  
//   function putTutorial(id, data){
//       $.ajax({
//           url: 'http://localhost:3000/api/tutorials/' + id,
//           method: 'PUT',
//           dataType: 'json',
//           data: data,
//           success: function(data) {
//               console.log(data);
//               getTutorials();
//           }
//       });
//   }
  
//   $("#updateTutorial").on("click", function(e) {
//      let data = {
//          tutorialNumber: $($("#updateForm")[0].updateNum).val(),
//          title: $($("#updateForm")[0].updateTitle).val(),
//          author: $($("#updateForm")[0].updateAuthor).val(),
//          type: $($("#updateForm")[0].updateType).val()
//      } 
     
//       putTutorial($($("#updateForm")[0].tutId).val(), data);
//       $("#updateForm").trigger("reset");
//       $("#updateForm").toggle();
//       e.preventDefault();
     
//   });
  

  
//   function deleteTutorial(id){
//       $.ajax({
//           url: 'http://localhost:3000/api/tutorials/' + id,
//           method: 'DELETE',
//           dataType: 'json',
//           success: function(data) {
//               console.log(data);
//               getTutorials();
//           }
//       });
//   }
  
// });




