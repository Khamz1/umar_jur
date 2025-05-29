import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { getPostById } from "./services/routes";
import { useParams } from "react-router-dom";
import { QRCodeGenerator } from "../QRCodeGenerator";

export const FullPost = () => {
  const [post, setPost] = useState({})
  const { id } = useParams()
  const fetchPost = async () => {
    try {
      const data = await getPostById(id);
      setPost(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [setPost])

  console.log(post);

  return (
    <>
      <Post
        id={1}
        title={post.title}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullName: "Keff",
        }}
        createdAt={"12 июня 2022 г."}
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
        tags={["react", "fun", "typescript"]}
        isFullPost
      >
        <div>
          {post.text && post.text.split("\n").map((text) => <p>{text}</p>)}
        </div>
        <div className="qr" >
          <QRCodeGenerator value={'https://fparf.ru/upload/medialibrary/9cc/hs6k4sqzljz4ri9e8k5sm8za3l0eqgjz/Kas.opredelenie.pdf'}/>
        </div>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
