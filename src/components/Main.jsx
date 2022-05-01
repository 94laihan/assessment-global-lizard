import React, {useEffect, useState} from "react";
import Posts from './Posts';
import Pagination from './Pagination';


export default function Main() {

   //Post and category list
   let [postsList, setPostsList] = useState([])
   let [filteredPostList, setFilteredPostList] = useState([])
   let [categoriesList, setCategoriesList] = useState([])
   let [checkedState, setCheckedState] = useState([])
 
   //Pagination
   const [loading, setLoading] = useState(false)
   const [curPage, setCurPage] = useState(1);
   const [postsPerPage] = useState(4);
 
   //#1. Get a list from json to store post, use as original list (postList)
   //#2. Get a list copy from postList, use as filter list (filteredPostList)
   //#3. Construct a list based on category (categoriesList)
   //#4. Construct a boolean list to record selected category (checkedState)
   useEffect(() =>{
     fetch('api/posts')
       .then((res) => res.json())
       .then((data)=>{
         setLoading(true)
         setPostsList(data.posts)
         setFilteredPostList(data.posts)
         setLoading(false)
 
         return data.posts
       })
       .then((data)=>{
         let newCategoriesList = []
         data.forEach((post)=>{
           post.categories.forEach((category) => {
             if(!newCategoriesList.includes(category.name))
               newCategoriesList.push(category.name)
           })
         })
 
         let newCheckedStateList = new Array(newCategoriesList.length).fill(false)
         setCheckedState(newCheckedStateList)
         setCategoriesList(newCategoriesList)
       })
       .catch(err => console.log(err))
   }, [])
 
   //Filter - By categories
   const handleOnChange = (index)=>{
 
     //Update check state list
     const updatedCheckedStateList = checkedState.map((ele, position) => 
       (position === index) ? !ele : ele)
     setCheckedState(updatedCheckedStateList)
 
     //Get the selected category with "True" only into the filtered list
     let filteredCategoryList = []
     updatedCheckedStateList.forEach((ele, index) => {
       if(ele)
         filteredCategoryList.push(categoriesList[index]) 
     })
 
     //Statements:
     //#1. If no any category choosed OR all category choosed, display all related posts
     //#2. Else, display posts which involved in filter only
     if(filteredCategoryList.length === 0 || filteredCategoryList.length === checkedState.length)
     {
       setFilteredPostList(postsList)
     }
     else
     {
       //Start filter post list
       let updatedPostList = []
       postsList.forEach((post) =>{
         for(let i = 0; i < post.categories.length; i++)
         {
           if(filteredCategoryList.includes(post.categories[i].name))
           {
             updatedPostList.push(post)
             break
           }
         }
       })
       setFilteredPostList(updatedPostList)
       setCurPage(1) // Reset curPage to 1
     }
 
   }
 
   //Pagination - Get current posts
   const indexOfLastPost = curPage * postsPerPage
   const indexOfFirstPost = indexOfLastPost - postsPerPage
   const curPosts = filteredPostList.slice(indexOfFirstPost, indexOfLastPost)
 
   const paginate = (pageNum) => setCurPage(pageNum)
 
   return(
     <div>
       <h1 className="text-primary text-center mb-3">My Posts</h1>
       <div className="container2">
         <div className="categorySection">
           <ul className="categories-list">
             {
               categoriesList.map((categories, index) =>(
                 <li key={index}>
                   <input id={index} type="checkbox" onChange={()=> handleOnChange(index)}/>
                   <label htmlFor={index}>{categories}</label>
                 </li>
               ))
             }
           </ul>
         </div>
         <div className="postsSection">
           <Posts posts={curPosts} loading={loading} />
           <Pagination postsPerPage={postsPerPage} totalPosts={filteredPostList.length} paginate={paginate}/>
         </div>
       </div>
     </div>
   )
}
