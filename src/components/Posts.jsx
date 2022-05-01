import React from 'react'
// import {Link} from 'react-router-dom'

export default function Posts({posts, loading}) {
    if(loading)
    {
        return <h2>Loading...</h2>
    }
  return (
      <div>
          <div className="container">
              <table className="checkoutTable">
                  <tbody>
                      {
                           posts.map(post => 
                           (
                            <tr key = {post.id}>
                                <td>
                                        <p>ID: {post.id}</p>
                                        <p>Title: {post.title}</p>
                                        <p>Author: {post.author.name}</p>
                                        <p>Publish Date: {post.publishDate}</p>
                                </td>
                                <td>
                                    {/* <Link to={'/post/'+post.id}>
                                        <span>Details</span>
                                    </Link>             */}
                                </td>
                            </tr>  
                           ))
                      }
                  </tbody>
              </table>
          </div>
      </div>

  )
}
