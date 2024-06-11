const post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>'
};

$(function() {
  // 1
  const postTemplate = Handlebars.compile($('#posts').html());
  // 3
  post.tags = ['latin', 'placeholder'];

  // 4
  Handlebars.registerPartial('tagTemplate', $('#tagTemplate').html());

  // 5
  const posts = [post, { title: 'Post 2', published: 'June 10, 2024', body: 'example text' }];


  $('body').append(postTemplate({ posts: posts }));
});