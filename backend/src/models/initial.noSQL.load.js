import { mongodb } from '../models/index.js'

const BlogPost = mongodb.blogPost;

function insertPosts() {
  BlogPost.create({
    "userid": null,
    "title": "Lorem ipsum dolor",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
  })

  BlogPost.create({
    "userid": 3,
    "title": "Lorem ipsum dolor sit",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
  })

  BlogPost.create({
    "userid": 4,
    "title": "Lorem ipsum",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  })

  BlogPost.create({
    "userid": 6,
    "title": "Lorem ipsum dolor sit amet, consetetur",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
  })

  BlogPost.create({
    "userid": 1,
    "title": "Lorem ipsum dolor sit",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
  })

  BlogPost.create({
    "userid": null,
    "title": "Lorem ipsum dolor",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
  })

  BlogPost.create({
    "userid": 3,
    "title": "Lorem ipsum dolor sit",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
  })

  BlogPost.create({
    "userid": 4,
    "title": "Lorem ipsum",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  })

  BlogPost.create({
    "userid": 6,
    "title": "Lorem ipsum dolor sit amet, consetetur",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
  })

  BlogPost.create({
    "userid": 1,
    "title": "Lorem ipsum dolor sit",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
  })

  BlogPost.create({
    "userid": null,
    "title": "Lorem ipsum dolor",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
  })

  BlogPost.create({
    "userid": 3,
    "title": "Lorem ipsum dolor sit",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
  })

  BlogPost.create({
    "userid": 4,
    "title": "Lorem ipsum",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  })

  BlogPost.create({
    "userid": 6,
    "title": "Lorem ipsum dolor sit amet, consetetur",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
  })

  BlogPost.create({
    "userid": 1,
    "title": "Lorem ipsum dolor sit",
    "body": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
  })
}



const initialNoSQLLoad = {
  insertPosts 
}

export { initialNoSQLLoad }