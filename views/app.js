
//Ajax call to Get all the post on the Welcome page
$(() => {
    let $posts = $('#posts');

    //get the id of the body and title from the create post page
    $body = $('#body');
    $title = $('#title');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/posts',
        success: (post) => {
            $.each(post, (i, post) => {
                $posts.append(` <div class="col-md-8 mr-auto">

                <div class="card border-light mb-3">
                  <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}.</p>
                  </div>
                </div>
              </div>
                `);
            })
        }
    });

    //Adds a post to the database
    $('#add-post').on('click', () => {
      let post = {
        title: $title.val(),
        body: $body.val()
      };

      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/posts',
        data: post,
        success: (newPost) => {
          $posts.append(` <div class="col-md-8 mr-auto">
              <div class="card border-light mb-3">
                <div class="card-body">
                  <h4 class="card-title">${newPost.title}</h4>
                  <p class="card-text">${newPost.body}.</p>
                </div>
              </div>
            </div>
          `);
        }

      })
    });

});