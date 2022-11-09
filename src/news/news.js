import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

const MyNews =()=>{
    const CATEGORIES =["general",
    "entertainment",
   "health",
  
  "science",
  "business",
  "sports",
  "technology"]

    const [articles,setArticles]=useState([])
    const[pageNumber, setpageNumber]=useState(1)
    const [totalRecords, setTotalRecords]=useState(0)
    const[category, setCategory]=useState('general')


    const GetNews =(pageNo)=>{
        axios({
            url:"https://newsapi.org/v2/top-headlines",
            method:"GET",
            params:{
                country:"in",
                apiKey:"5c0e7a5ef57445ab8c2ab80202bb460c",
                page : pageNo,
               category: category,

            }
        }).then((response)=>{
            console.log(articles.data);
            setArticles([...articles, ...response.data.articles])
            setTotalRecords(response.data.totalResults)
            setpageNumber(pageNo)
        }).catch((error)=>{
            console.log(error);
        })

         }



         useEffect(()=>{
            GetNews(pageNumber)
         },[])
         useEffect(()=>{
            GetNews(1);
         },[category])
         const fetchMore=()=>{
            GetNews(pageNumber+1)
         }

         const handleCategoryClick =(clickedcategory)=>{
            setArticles([])
            setpageNumber(1)
            setTotalRecords(0)
            setCategory(clickedcategory)

         }


         return(
            <>
            <h1 style={{color:"black", backgroundColor:"red", fontStyle:"italic"}}> Today's India News</h1>
          
           
            {
                CATEGORIES.map((catg,index)=>{
                    return(
                      <>
                        <button
                        key={index} className={ category == catg ? "btn btn-danger" : "btn btn-primary"}
                        style={{margin:20}}
                        onClick={()=>{handleCategoryClick(catg)}}>
                            {catg.toUpperCase()}</button>
                            
                            </>
                    )
                    
                }
            )
            }
            <div style={{ display:"flex",flexDirection:"row-reverse",position:"-webkit-sticky", position:"sticky", top:0, padding:2}}>
<a href="#" className="btn btn-danger" ><span style={{color:"white", }}><big>&#8593;</big></span></a>
</div>  
   

           

            <InfiniteScroll
  dataLength={articles.length} //This is important field to render the next data
  next={fetchMore}
  hasMore={totalRecords!=articles.length}
  style={{ display:'flex', flexWrap:'wrap', justifyContent:"space-evenly",backgroundColor:"black"}}
  
  
>
{
articles.map((article,index)=>{
               
    return(
       <>
      <div key={index} className="card" style={{width:300 , height:"100%", margin:30}}>
      <img src={article.urlToImage}  className="card-img-top"style={{height:200, width:300, backgroundColor:"grey"}}></img>
      
   <div className="card-body">
      
     <h5 className="card-title"><h3 style={{color:"red"}}>Title</h3>{article.title}</h5>
     <p ><h5 style={{color:"greenyellow"}}>Description</h5> {article.description}</p>
      
      
       </div>
         </div>
      
       </>
       
    )
  })


  }
</InfiniteScroll>

            </>
         )
}

export default MyNews
