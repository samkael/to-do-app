import { NextPage } from 'next'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from '../app/hooks'
import Todos from '../features/todos/Todos'

const IndexPage: NextPage = () => {
  const tasks = useAppSelector((state) => state.todos.tasks)

  return (
    <>
      <Head>
        <title>To-dos App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="prose container max-w-4xl mx-auto p-4">
        {/* In a larger app, the toast container may be its own component */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
        />
        <h1>To-dos App</h1>
        <Todos />
      </main>
    </>
  )
}

export default IndexPage
