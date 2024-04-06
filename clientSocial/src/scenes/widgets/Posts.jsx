import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import Post from "../widgets/Post";
import { BACKEND_URL } from "../../config";

const Posts = ({userId, isProfile = false}) => {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts)
    const token = useSelector(state => state.token);

   

    const getPosts = async () => {
        console.log("hi from posts get")
        const response = await fetch(`${BACKEND_URL}/posts`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            console.log(data)

            dispatch(setPosts({posts: data}))
         }

         
    const getUserPost = async () => {

        console.log('hi from getUserPost')
        const response = await fetch(`${BACKEND_URL}/posts/${userId}/posts`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            console.log(data)

            dispatch(setPosts({posts: data}))
         }


         useEffect(() => {
            if(isProfile){
                getUserPost();
            }
            else {
                getPosts()
            }
         },[]) // eslint-disable-line react-hooks/exhaustive-deps
            console.log(posts)

            console.log(isProfile)
           if(!posts) return null;
           if(posts.ErrorMessage) return <h1>Hi from DataBase</h1>

         return (
            <>
                {posts.map(({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <Post  
                     key={_id}
                     postId={_id}
                     postUserId={userId}
                     name={`${firstName}${lastName}`}
                     description={description}
                     location={location}
                     picturePath={picturePath}
                     userPicturePath={userPicturePath}
                     likes={likes}
                     comments={comments}
                    />
                ))}
            </>
         )


}

export default Posts;