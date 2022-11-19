import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState } from "react"
import { Button } from "src/components/Button"
import { PostForm } from "src/components/PostForm"
import { useBlog } from "src/context/Blog"
import { useHistory } from 'react-router-dom'
import blogimg from "src/assets/logo.png"

export const Dashboard = () => {
  const history = useHistory()
  const [connecting, setConnecting] = useState(false)
  const { connected, select } = useWallet()
  const { user, posts, initialized, initUser, createPost, showModal, setShowModal, } = useBlog()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")

  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (user) {
      setConnecting(false)
    }
  }, [user])

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14">
        <div className="flex justify-between items-center h-full container">
          <div className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 text-yellow-300 flex justify-center items-center text-3xl">
              <img src = {blogimg} alt = "" className="w-14 h-14"></img>
              <div>Blogdec</div>
            </div>
          </div>
          {connected ? (
            <div className="flex items-center">
              <p className=" font-bold text-sm ml-2 capitalize underlinepink text-yellow-300">
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink text-yellow-300">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize text-yellow-300">
                {user?.name}
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2 bg-yellow-300 text-gray-900 font-extrabold hover:bg-white"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2 bg-yellow-300 text-black"
                  onClick={() => {
                    initUser()
                  }}
                >
                  Initialize User
                </Button>
              )}

            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28 bg-yellow-300 text-black"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Blog</h1> */}
          <div className="row">

            <article className="best-post">
              <div
                className="best-post-image"
                style={{
                  backgroundImage: `url("https://c8.alamy.com/zooms/6/8ca3226ae95c469bb9443e9c952203c2/2aa8yt5.jpg")`,
                }}
              ></div>
              <div className="best-post-content">
                <div className="best-post-content-cat">19th Nov 2022<span className="dot"> </span>Blog</div>
                <div className="best-post-content-title">
                  Own your own blog and earn from it
                </div>
                <div className="best-post-content-sub">
                 Earn from your own blog while writing the content you want and owning it fully.
                 Take the benefit of decentralization and Web 3.0
                </div>
              </div>
            </article>

            <div className="all__posts">
              {posts.map((item) => {
                return (
                  <article className="post__card-2"
                    onClick={() => {
                      history.push(`/read-post/${item.publicKey.toString()}`)
                    }}
                    key={item.account.id}
                  >
                    <div className="post__card_-2">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: `url("https://i.pinimg.com/736x/c4/e2/00/c4e200d5b24ccec3356fa231ec63f440.jpg")`,
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat">19th Nov 2022<span className="dot"> </span>{item.account.title} </div>
                          <p className="post__card_alttitle-2 text-white">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content bg-yellow-300 rounded-lg">
            <span className="close-button bg-white rounded-md"
              onClick={() => setShowModal(false)}
            >×</span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postTitle, postContent)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
