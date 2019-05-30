
// $(document).ready(() => {

//   //Ajax call to Get all the post on the Welcome page
  
//   let $posts = $('#posts');

//   //get the id of the body and title from the create post page
//   $body = $('#body');
//   $title = $('#title');


//   $.ajax({
//       type: 'GET',
//       url: 'http://localhost:3000/posts',
//       success: (post) => {
//           $.each(post, (i, post) => {
//               $posts.append(` <div class="col-md-8 mr-auto">

//               <div class="card border-light mb-3">
//                 <div class="card-body">
//                   <h4 class="card-title">${post.title}</h4>
//                   <p class="card-text">${post.body}.</p>
//                 </div>
//                 <hr>
//                 <div>
//                 <a href="#" class="btn btn-outline-success" id="myBtn">Read More</a>
//                 </div>
              
//               </div>
//             </div>
//               `);
             
//             $('#myBtn').on('click',function() {  
//               console.log( 'hello' );
//             });    
              
//           })
//       }
//   });
  
 
//   //Adds a post to the database
//   $('#add-post').on('click', () => {
//     let post = {
//       title: $title.val(),
//       body: $body.val()
//     };

//     $.ajax({
//       type: 'POST',
//       url: 'http://localhost:3000/posts',
//       data: post,
//       success: (newPost) => {
    
//         $posts.append(` <div class="col-md-8 mr-auto">
//             <div class="card border-light mb-3">
//               <div class="card-body">
//                 <h4 class="card-title">${newPost.title}</h4>
//                 <p class="card-text">${newPost.body}.</p>
//               </div>
//             </div>
//           </div>
//         `);
//       }

//     })
//   });

// });


$(document).ready(function() {

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
      data: {
        test: 'test data'
      },
      success: function(data) {
        $(data).each(function(i, post) {
          $('#postsBody').append($('<tr>')
            .append($('<td>').append(post.id))
            .append($('<td>').append(post.title))
            .append($('<td>').append(post.body))
            .append($('<td>').append(post.author))
            .append($("<td>").append(`
              <i class="far fa-edit editPost" data-tutid="`+post.id+`"></i> 
              <i class="fas fa-trash deletePost" data-tutid="`+post.id+`"></i>
            `)));
        })
      }
    });
  }

  $('#submitPost').on('click', function(e) {
    let data = {
      title: $($('#newForm')[0].title).val(),
      body: $($('#newForm')[0].body).val(),
      author: $($('#newForm')[0].author).val()
    }

    savePost(data);
    $('#newForm').trigger('reset');
    e.preventDefault();
  });

  function savePost(data) {
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




