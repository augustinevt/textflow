import { GraphQLClient, request } from 'graphql-request'

// const client = new GraphQLClient('https://graphqlzero.almansi.me/api')



const variables = {"options": { "paginate": {"page": 1,"limit": 5 }}}

const query = `
query (
$options: PageQueryOptions
) {
posts(options: $options) {
  data {
    id
    title
  }
  meta {
    totalCount
  }
}
}
`

const fetchArticles = async () => {
  const articles = await request('https://graphqlzero.almansi.me/api', query,variables )
  console.log(" api articles => ", articles)
  return articles
}

export default {
  fetchArticles
}