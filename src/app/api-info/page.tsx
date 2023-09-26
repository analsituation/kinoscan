import Container from '@/components/Container'

const page = async () => {
  return (
    <Container className='text-lg mt-10'>
      Если Вас перекинуло на данную страницу, это значит что сегодня лимит в 200 запросов к серверу был полностью
      исчерпан. Администрация сайта приносит свои извинения.
    </Container>
  )
}
export default page
