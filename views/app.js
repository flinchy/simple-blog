
//Ajax call to Get all the post on the Welcome page
$(function () {
    let $posts = $('#posts');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/posts',
        success: function(post) {
            $.each(post, function(i, post) {
                $posts.append(` <div class="col-md-8 mr-auto">

                <div class="card border-light mb-3">
                  <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">Some quick example text to build on the card title
                       and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
                `);
            })
        }
    });
});