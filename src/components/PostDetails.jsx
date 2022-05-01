import React from 'react'
import {useParams} from 'react-router-dom'

export default function PostDetails() {

    let params = useParams()

    return (
        <div>    
            {params.pId}
        </div>
    )

    // useEffect(
    //     ()=>{
    //     fetch('api/posts2')
    //     .then((res) => res.json())
    //     .then((data)=>{
    //        let postInfo = data.find((ele)=> ele.id === pId)
    //        setPostDetails(postInfo)
    //    })
    // }, [])


    // return (
    //     <div>
    //         {
    //             postDetails &&
    //             <div>
    //                 <h1>Details of {postDetails.title}</h1>
    //             </div>
    //         }

    //         <Link to={'/'}>
    //             <div>
    //                 Back to main page
    //             </div>
    //         </Link>
    //     </div>
    // )
}
